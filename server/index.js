const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 8);
    const userExist = await User.findOne({
      email: req.body.email,
    });

    if (userExist) {
      // User already exists
      return res.json({ status: "error", error: "Email is already registered" });
    }

    // User does not exist, create a new user
    else{

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });
      
      // Send success response
      res.json({ status: "ok" });
    }
    } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ status: "error", error: error.message });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const hashedPass = await bcrypt.compare(req.body.password, user.password);
      if (hashedPass) {
        const token = jwt.sign(
          { name: user.name, email: user.email },
          "mySecretKey",
          { expiresIn: "1h" }
        );
        return res.json({ status: "ok", token: token });
      }
      console.log(user);
    } else {
      return res.json({ status: "error" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.json({ status: "error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("running");
});
