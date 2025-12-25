const prisma = require("../prismaClient");

const getAnalytics = async (req, res) => {
  try {
    const totalInterviews = await prisma.interview.count();

    const completedInterviews = await prisma.interview.count({
      where: { status: "COMPLETED" },
    });

    const scheduledInterviews = await prisma.interview.count({
      where: { status: "SCHEDULED" },
    });

    const avgScores = await prisma.feedback.aggregate({
      _avg: {
        techScore: true,
        commScore: true,
      },
    });

    res.json({
      total: totalInterviews,
      completed: completedInterviews,
      scheduled: scheduledInterviews,
      avgTech: avgScores._avg.techScore || 0,
      avgComm: avgScores._avg.commScore || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load analytics" });
  }
};

module.exports = { getAnalytics };
