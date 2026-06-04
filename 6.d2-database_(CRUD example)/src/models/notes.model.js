const mongoose = require("mongoose");

// To define the 'Format' of our Database, we need Schema

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Now to perform any 'CRUD Operations' we need Models
// Collection name is 'notes' and the data format is stored in the noteSchema

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
