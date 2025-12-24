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

module.exports = router;
