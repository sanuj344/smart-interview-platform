const prisma = require("../prismaClient");

// INTERVIEWER submits feedback
const submitFeedback = async (req, res) => {
  const interviewerId = req.user.id;
  const { interviewId, techScore, commScore, notes } = req.body;

  try {
    // 1️⃣ Check interview exists & belongs to interviewer
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.interviewerId !== interviewerId) {
      return res.status(403).json({ message: "Not authorized to give feedback" });
    }

    // 2️⃣ Prevent duplicate feedback
    const existingFeedback = await prisma.feedback.findUnique({
      where: { interviewId },
    });

    if (existingFeedback) {
      return res.status(400).json({ message: "Feedback already submitted" });
    }

    // 3️⃣ Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        interviewId,
        techScore,
        commScore,
        notes,
      },
    });

    // 4️⃣ Update interview status
    await prisma.interview.update({
      where: { id: interviewId },
      data: { status: "COMPLETED" },
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

module.exports = { submitFeedback };
