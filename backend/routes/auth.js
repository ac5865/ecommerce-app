const express = require("express");
const router = express.Router();
const USERS = require("../data/users");

// POST /api/auth/login - User login
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = USERS.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Login successful - return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userWithoutPassword,
        token: `mock-token-${user.userId}-${Date.now()}`, // Mock token
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// GET /api/auth/user/:userId - Get user by ID
router.get("/user/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = USERS.find((u) => u.userId === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// POST /api/auth/update-profile - Update user profile
router.post("/update-profile", (req, res) => {
  try {
    const { userId, name, password, profileImage } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // Find user
    const userIndex = USERS.findIndex((u) => u.userId === parseInt(userId));

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only provided fields
    if (name) {
      USERS[userIndex].name = name;
    }

    if (password) {
      USERS[userIndex].password = password;
    }

    if (profileImage !== undefined) {
      // profileImage can be base64 string or null to remove image
      USERS[userIndex].profileImage = profileImage;
    }

    // Return updated user without password
    const { password: _, ...userWithoutPassword } = USERS[userIndex];

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
