const prisma = require("../prismaClient");

// Average scores per interviewer
const interviewerAnalytics = async (req, res) => {
  try {
    const data = await prisma.feedback.groupBy({
      by: ["interviewId"],
      _avg: {
        techScore: true,
        commScore: true,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

module.exports = { interviewerAnalytics };
