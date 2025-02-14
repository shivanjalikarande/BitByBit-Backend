const bcrypt = require("bcrypt");

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error in hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});
