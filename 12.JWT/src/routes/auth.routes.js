const express = require("express");
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const authRouter = express.Router();
/*
app.js ke alawa kahi aur routes banani hoti hai to uske liye express package ka express.Router ko use karte hain
*/

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({ message: "Email already registred! " });
  }

  const users = await userModel.create({
    name,
    email,
    password,
  });

  /*
  JWT Create: karte time hum 
  User ki ID Aur JWT_SECRET 
  dete hain.
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
  res.cookie('jwt_token', token)

  res
    .status(201)
    .json({ message: "User registered successfully", users, token });
});

module.exports = authRouter;
