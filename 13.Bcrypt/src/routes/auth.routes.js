const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const authRouter = express.Router();
/*
app.js ke alawa kahi aur routes banani hoti hai to uske liye express package ka express.Router ko use karte hain
*/

/*/api/auth/register */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({ message: "Email already registred! " });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const users = await userModel.create({
    name,
    email,
    password: hash,
  });

  /*
  JWT Create: karte time hum do chize pass karenge:
  User ki ID {data object mein} Aur dusra
  JWT_SECRET dete hain.
  */
  const token = jwt.sign(
    {
      id: users._id,
      email: users.email,
    },
    process.env.JWT_SECRET,
  );

  /*
  Ab Token ko Server khud send kar dega client-side mein (browser) storage ke ander.
  Ab server cookie mei Data rakh bhi sakta hai aur Data padh bhi sakta hai
  */
  res.cookie("jwt_token", token);

  res
    .status(201)
    .json({ message: "User registered successfully", users, token });
});

/*/api/auth/protected */
authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({ message: "This is a protected route" });
});

// Controller
/*/api/auth/login */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await userModel.findOne({ email });

  if (!users) {
    return res
      .status(404)
      .json({ message: "User not found with this email address" });
  }

  const isPasswordMatched =
    users.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid User email or Password",
    });
  }

  const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "user logged in",
    users,
  });
});

module.exports = authRouter;
