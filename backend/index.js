const express = require("express");
const db = require("./config/firebaseAdmin"); // Ensure this is correctly imported

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Ensure this is correctly added

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
