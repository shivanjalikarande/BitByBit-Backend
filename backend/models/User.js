const db = require("../config/firebaseAdmin");

class User {
  static async createUser(userId, email) {
    const userRef = db.collection("users").doc(userId);
    await userRef.set({
      email: email,
      xp: 0,
      completedChallenges: [],
      createdAt: new Date(),
    });
  }

  static async getUser(userId) {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();
    return doc.exists ? doc.data() : null;
  }
}

module.exports = User;
