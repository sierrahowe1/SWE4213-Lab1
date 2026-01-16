// Create the following endpoints:
// - POST /auth/login
// - POST /auth/register
// - GET /auth/status

const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt
const router = express.Router();
const authcheck = require("../middleware/authcheck");

const SECRET_KEY = "unb_marketplace_secret_key";
const SALT_ROUNDS = 10; // Standard for security vs performance

const users = [
    {
        id: 1,
        email: "test@unb.ca",
        password: bcrypt.hashSync("123456789", SALT_ROUNDS) 
    }
]; 

router.post("/auth/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username.toLowerCase().endsWith("@unb.ca")) {
        return res.status(403).json({
            message: "Registration is only available for UNB students (@unb.ca)."
        });
    }

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: "User already exists" });
    }

    try {
        // Generate salt and hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword // Save the HASH, never the plain text
        };

        users.push(newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (user) {
        // Use bcrypt.compare to check if the password matches the hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({
                message: "Login successful",
                token: token,
                user: { id: user.id, email: user.email }
            });
        }
    }

    // Use generic "Invalid credentials" to prevent account enumeration
    res.status(401).json({ message: "Invalid credentials" });
});

router.get("/auth/status", authcheck, (req, res) => {
    const user = users.find(u => u.id === req.user.userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "User is logged in.",
        user: { id: user.id, username: user.username }
    });
});

module.exports = router;