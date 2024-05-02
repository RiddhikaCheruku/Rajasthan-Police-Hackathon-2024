const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const hashModel = require("./models/Hash");
const hashFile = require("./hash")
const app = express();

const {spawn} = require('child_process');


app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dfssdfgsdfgewrgfdsg";
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  try {
    const payLoadValue = req.body;

    const user = new UserModel({
      email: payLoadValue.email,
      name: payLoadValue.name,
      password: bcrypt.hashSync(payLoadValue.password, bcryptSalt),
    });
    await user.save();
    res.json({ user });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const payLoadValue = req.body;
    const user = await UserModel.findOne({ email: payLoadValue.email });
    if (user) {
      const pass = bcrypt.compareSync(payLoadValue.password, user.password);
      if (pass) {
        jwt.sign(
          {
            email: user.email,
            id: user._id,
            name: user.name,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("pass not okay");
      }
    } else {
      res.json("not found");
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  }
});
// pass of abhi@gmail.com is abhi

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/hash", async (req, res) => {
  try {
    const payLoadValue = req.body;

    const hash = new hashModel({
      value: payLoadValue.value,
    });
    await hash.save();
    const pythonScript = 'script1.py';
    exec(`python ${pythonScript}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }});
    res.json({ hash });
  } catch (e) { 
    res.status(422).json(e);
  }
});

app.listen(4000);
