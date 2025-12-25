const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");
const { generateToken } = require("../utils/jwt");

// Allowed roles (safety)
const ALLOWED_ROLES = ["CANDIDATE", "INTERVIEWER", "ADMIN"];

// ---------------- SIGNUP ----------------
const signup = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // ---- Basic validation ----
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Normalize email
    email = email.toLowerCase().trim();

    // Role validation
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

// ---------------- LOGIN ----------------
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    email = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = { signup, login };
