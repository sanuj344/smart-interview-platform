const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// Only logged-in users
router.get(
  "/me",
  authMiddleware(),
  (req, res) => {
    res.json({
      message: "Authenticated user",
      user: req.user,
    });
  }
);

// Only ADMIN
router.get(
  "/admin",
  authMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Only INTERVIEWER
router.get(
  "/interviewer",
  authMiddleware(["INTERVIEWER"]),
  (req, res) => {
    res.json({ message: "Welcome Interviewer" });
  }
);

module.exports = router;
