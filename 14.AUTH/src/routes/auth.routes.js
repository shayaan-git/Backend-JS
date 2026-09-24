/*
Authentication waale API yaani wo routes yahan Handle ho rahe honge
*/
const express = require("express");
const userModel = require("../models/user.modal");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/*
Now this authRouter will be use to create API routes
*/

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({ message: "Email already taken" });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token); // ye line client-side pe token set karti hai 'cookie ke ander' key-value pairs ke format mei

  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

authRouter.get("/get-me", async (req, res) => {
  const { token } = req.cookies;

  /* 
  verify karne ke liye ki, jo token create hua hai wo humare server ne kiya hai ya kisi aur server ne 
  */

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decode);
  const user = await userModel.findById(decode.id);
  res.json({
    name: user.name,
    email: user.email,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  //   console.log(hash);
  const isPasswordValid = hash === user.password;

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.json({
    message: "User logged in successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = authRouter;

/*
Ab ye authRouter to bana liya lekin humara jo express server hai usse integrate karne ke liye, app.js mei authRouter ko require karna padega.
Aur as a middleware use karna rahega (prefix laga ke).
*/
