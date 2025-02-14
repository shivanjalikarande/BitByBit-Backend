const express = require("express");
const db = require("./config/firebaseAdmin"); 
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Important to parse JSON request body
app.use(express.urlencoded({ extended: true }));  // For form data

// Test Route to Check Firestore Connection
app.get("/test", async (req, res) => {
  try {
    const docRef = db.collection("testCollection").doc("testDoc");
    await docRef.set({ message: "Firestore is connected!" });

    const doc = await docRef.get();
    res.json({ message: "Connected to Firestore!", data: doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Firestore connection failed!", details: error.message });
  }
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
