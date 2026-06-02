/*

- server CREATE karna
- server ko config karna

*/

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey World");
});

let notes = [];

/* CREATE */
app.post("/notes", (req, res) => {
  console.log(req.body); //client ki req body jo wo request kar rha. Ye Frontend mei hoga

  notes.push(req.body); // server ne notes array mei req.body ko push kar diya

  res.send("Bann gya bhai notes object"); //fir server response send karega
});

/* READ */
app.get("/notes", (req, res) => {
  res.send(notes);
  console.log(notes);
});

/* UPDATE */
/* req.body = {description :- 'sample modified description} */
app.patch("/notes/:id", (req, res) => {

  const {id} = req.params
  const {content} = req.body

  notes[id].content = content;

  /*
  It's using :id as an array index (0, 1, 2...), not a database

  The left content → is the property name on the notes object (what field you're updating)
  The right content → is the variable you destructured from req.body

  They just happen to have the same name because the field in your notes array is called content AND the data sent in the request body is also called content.
  */ 

  res.send("Notes updated successfully");
});

/* DELETE */
/* req.params */
app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];
  res.send("note deteled successfully");
});

module.exports = app;
