const express = require("express");
const router = express.Router();
const { interviewerAnalytics } = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/analytics",
  authMiddleware(["ADMIN"]),
  interviewerAnalytics
);

module.exports = router;
