const express = require("express");
const router = express.Router();
const { bookInterview } = require("../controllers/interview.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Only CANDIDATE can book interviews
router.post(
  "/book",
  authMiddleware(["CANDIDATE"]),
  bookInterview
);

router.get(
  "/mine",
  authMiddleware(["INTERVIEWER"]),
  async (req, res) => {
    const interviews = await require("../prismaClient").interview.findMany({
      where: { interviewerId: req.user.id },
      include: {
        slot: true,
        candidate: { select: { name: true, email: true } },
      },
      orderBy: { id: "desc" },
    });

    res.json(interviews);
  }
);





module.exports = router;
