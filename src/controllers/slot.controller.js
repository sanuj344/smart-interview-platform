const prisma = require("../prismaClient");

const createSlot = async (req, res) => {
  try {
    const interviewerId = req.user.id;
    const { startTime, endTime } = req.body;

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    // 🔥 Check overlapping slots
    const overlappingSlot = await prisma.timeSlot.findFirst({
      where: {
        interviewerId,
        AND: [
          { startTime: { lt: new Date(endTime) } },
          { endTime: { gt: new Date(startTime) } },
        ],
      },
    });

    if (overlappingSlot) {
      return res.status(400).json({
        message: "Slot overlaps with existing slot",
      });
    }

    const slot = await prisma.timeSlot.create({
      data: {
        interviewerId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: "Failed to create slot" });
  }
};

module.exports = { createSlot };
