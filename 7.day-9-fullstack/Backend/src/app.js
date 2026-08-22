const express = require("express");
const cors = require("cors");
const noteModel = require("./models/note.model.js");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("/public")); 
/*
 express.static middleware is used to make all files of (a given folder) Here -> ./public folder available on frontend
*/

// Routes
// Create
app.post("/api/notes", async (req, res) => {
  const title = req.body?.title;
  const { description } = req.body || {};

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

// Patch
app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description, title } = req.body;

  const notes = await noteModel.findByIdAndUpdate(id, { title, description }); //MongoDB update function ko object chahiye hota hai
  /*
  { title, description } object mei isliye likha hai kyunki MongoDB update function ko object chahiye hota hai. Single value nahi chalegi. Database ko batana padta hai kaunsi field update karni hai — isliye { description: value } format me bhejna padta hai.
  */

  res.status(200).json({
    message: "Patch Successful",
  });
});

// Read
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find(); // find() gives array of objects

  res.status(200).json({
    message: "notes fetched successfully",
    notes,
  });
});

// Delete
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  const notes = await noteModel.findByIdAndDelete(id);
  /* **Mongoose automatically** tumhara plain `id` string ko `{ _id: id }` mein convert kar deta hai! */

  res.status(200).json({
    message: "This note is deleted successfully",
    notes,
  });
});

// console.log(__dirname);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
  // res.send('This is wild card')
});

module.exports = app; 
