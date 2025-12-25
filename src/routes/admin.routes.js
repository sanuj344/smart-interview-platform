const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/analytics",
  authMiddleware(["ADMIN"]),
  getAnalytics
);
router.get(
  "/feedback",
  authMiddleware(["ADMIN"]),
  async (req, res) => {
    const feedback = await require("../prismaClient").feedback.findMany({
      include: {
        interview: {
          include: {
            candidate: { select: { name: true } },
            interviewer: { select: { name: true } },
          },
        },
      },
      orderBy: { id: "desc" },
      take: 10,
    });

    res.json(feedback);
  }
);

module.exports = router;
