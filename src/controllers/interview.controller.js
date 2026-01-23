const prisma = require("../prismaClient");
const { sendEmail } = require("../utils/emailService");
const { getInterviewBookedTemplate } = require("../utils/emailTemplates");

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

    // Fetch full interview data for emails
    const fullInterview = await prisma.interview.findUnique({
      where: { id: result.id },
      include: {
        candidate: true,
        interviewer: true,
        slot: true,
      },
    });

    // Send emails asynchronously (don't wait)
    const candidateTemplate = getInterviewBookedTemplate(
      fullInterview.candidate.name,
      fullInterview.interviewer.name,
      fullInterview.slot.startTime,
      fullInterview.roundType
    );
    sendEmail(fullInterview.candidate.email, candidateTemplate.subject, candidateTemplate.html);

    const interviewerTemplate = getInterviewBookedTemplate(
      fullInterview.interviewer.name,
      fullInterview.interviewer.name, // Self notification
      fullInterview.slot.startTime,
      fullInterview.roundType
    );
    sendEmail(fullInterview.interviewer.email, interviewerTemplate.subject, interviewerTemplate.html);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { bookInterview };
