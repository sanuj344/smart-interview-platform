const express = require("express");
const router = express.Router();
const { createSlot } = require("../controllers/slot.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Only INTERVIEWER can create slots
router.post(
  "/",
  authMiddleware(["INTERVIEWER"]),
  createSlot
);
// Candidate: get available slots
router.get(
  "/available",
  authMiddleware(["CANDIDATE"]),
  async (req, res) => {
    const slots = await require("../prismaClient").timeSlot.findMany({
      where: { isBooked: false },
      orderBy: { startTime: "asc" },
    });
    res.json(slots);
  }
);

router.get(
  "/mine",
  authMiddleware(["INTERVIEWER"]),
  async (req, res) => {
    const slots = await require("../prismaClient").timeSlot.findMany({
      where: { interviewerId: req.user.id },
      orderBy: { startTime: "asc" },
    });
    res.json(slots);
  }
);



module.exports = router;
