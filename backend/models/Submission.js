const db = require("../config/firebaseAdmin");

class Submission {
  static async submitChallenge(userId, challengeId, code, aiFeedback) {
    const submissionRef = db.collection("submissions").doc();
    await submissionRef.set({
      userId,
      challengeId,
      code,
      aiFeedback,
      submittedAt: new Date(),
    });
  }

  static async getUserSubmissions(userId) {
    const submissionsRef = db.collection("submissions").where("userId", "==", userId);
    const snapshot = await submissionsRef.get();
    return snapshot.docs.map(doc => doc.data());
  }
}

module.exports = Submission;
