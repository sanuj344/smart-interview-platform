const prisma = require("../prismaClient");

const bookInterview = async (req, res) => {
  const candidateId = req.user.id;
  const { slotId, roundType } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Fetch slot
      const slot = await tx.timeSlot.findUnique({
        where: { id: slotId },
      });

      if (!slot) {
        throw new Error("Slot not found");
      }

      if (slot.isBooked) {
        throw new Error("Slot already booked");
      }

      // 2️⃣ Create interview
      const interview = await tx.interview.create({
        data: {
          candidateId,
          interviewerId: slot.interviewerId,
          slotId: slot.id,
          roundType,
          status: "SCHEDULED",
        },
      });

      // 3️⃣ Mark slot as booked
      await tx.timeSlot.update({
        where: { id: slot.id },
        data: { isBooked: true },
      });

      return interview;
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { bookInterview };
