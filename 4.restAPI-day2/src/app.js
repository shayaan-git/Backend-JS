const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running on Asus TUF system");
});

let notes = [];
app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("Successfully Created!");
});

app.get("/notes", (req, res) => {
  console.log(notes);
  res.send(notes);
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].content = req.body.content;
  res.send("notes patched successfully");
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];
  res.send("Deleted Successfully");
});

module.exports = app;
