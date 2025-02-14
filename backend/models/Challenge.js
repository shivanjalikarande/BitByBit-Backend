const db = require("../config/firebaseAdmin");

class Challenge {
  static async createChallenge(challengeId, title, description, solution, difficulty) {
    const challengeRef = db.collection("challenges").doc(challengeId);
    await challengeRef.set({
      title,
      description,
      solution,
      difficulty,
      createdAt: new Date(),
    });
  }

  static async getChallenges() {
    const challengesRef = db.collection("challenges");
    const snapshot = await challengesRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = Challenge;
