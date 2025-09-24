const authMiddleware = require("../midddielware/authMiddleware"); // import middleware
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modals/User");



router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Registration request body:", req.body); // Debugging line
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/login", async (req, res) => {
    console.log("Login request body:", req.body); // Debugging line
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store JWT in HTTP-only cookie
       // Store JWT in HTTP-only cookie
res.cookie("authToken", token, {
  httpOnly: true,
  secure: true,      // Must be true for HTTPS
  sameSite: "none",  // Required if frontend is on a different domain
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

        // Send success response
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        // Log the error and return generic message
        console.error("Login error:", error);

        // Optional: provide more specific error messages
        if (error.name === "MongoNetworkError") {
            return res.status(503).json({ message: "Database connection error" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;