const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json()); //json parse karava mate
app.use(
  cors({
    //cors ni error no ave etale
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGOURL);

app.get("/test", (req, res) => {
  res.json("Test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      res.json("password ok");
    } else {
      res.status(422).json("Password not ok");
    }
  } else {
    res.json("not found");
  }
});
app.listen(4000);
