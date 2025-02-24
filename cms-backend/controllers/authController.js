import User from "../models/User.js"; // Import the User model

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Find user in database
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
