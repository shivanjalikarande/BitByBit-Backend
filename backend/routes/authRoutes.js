const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/firebaseAdmin"); // Firestore setup
require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    let hashedPassword = "";

    try {
        console.log("Received password:", password);
        // Hash password
        try {
            // console.log("Hashing password now...");
            const saltRounds = 10;  // Define the salt rounds as a number
            // console.log("Salt rounds type:", typeof saltRounds); 
            hashedPassword = await bcrypt.hash(password, Number(saltRounds));
            console.log("Hashed password:", hashedPassword);
        } catch (error) {
            console.error("Error in hashing password:", error);
        }

        // Save user to Firestore
        const userRef = db.collection("users").doc(email);
        const userSnapshot = await userRef.get();

        const user = userSnapshot.data();
        // const password = user.password;
        // const isMatch = await bcrypt.compare(hashedPassword, password);
        // console.log("Password Match:", isMatch);

        if (userSnapshot.exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        await userRef.set({
            username,
            email,
            password: hashedPassword,
            xp: 0,
            completedChallenges: []
        });

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.log('Error : ', error);
        res.status(500).json({ message: "Error signing up", error });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRef = db.collection("users").doc(email);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = userSnapshot.data();
        console.log("User: ", user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Ismatch: ",isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate Token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

router.post("/google-login", async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();

        // Check if user exists in Firestore
        const userRef = db.collection("users").doc(email);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
            // If new user, create an account
            await userRef.set({ name, email, profilePic: picture });
        }

        // Generate JWT token
        const authToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Google Login Successful", token: authToken, user: { name, email, picture } });

    } catch (error) {
        res.status(500).json({ message: "Google Login Failed", error });
    }
});


module.exports = router;
