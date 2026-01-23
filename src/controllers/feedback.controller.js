const prisma = require("../prismaClient");
const { sendEmail } = require("../utils/emailService");
const { getFeedbackSubmittedTemplate } = require("../utils/emailTemplates");

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

    // Fetch full interview data for emails
    const fullInterview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        candidate: true,
        interviewer: true,
      },
    });

    // Send email to candidate asynchronously
    const template = getFeedbackSubmittedTemplate(
      fullInterview.candidate.name,
      fullInterview.interviewer.name,
      fullInterview.roundType
    );
    sendEmail(fullInterview.candidate.email, template.subject, template.html);

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

module.exports = { submitFeedback };
