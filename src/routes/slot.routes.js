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

module.exports = router;
