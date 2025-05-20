const express = require("express");
const router = express.Router();
const { users } = require("../data/store");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  if (user.password !== password) {
    res.status(401).json({
      message: "Invalid password",
    });
  }
  res.status(200).json({
    message: "Login successful",
    user: user,
  });
});

module.exports = router;
