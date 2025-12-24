const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedback.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Only INTERVIEWER can submit feedback
router.post(
  "/",
  authMiddleware(["INTERVIEWER"]),
  submitFeedback
);

module.exports = router;
