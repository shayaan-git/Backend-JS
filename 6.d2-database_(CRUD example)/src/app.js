const express = require("express");
const noteModel = require("./models/notes.model.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running..");
});

/*
 -POST /notes
 - req.body => (title, description)
*/

app.post("/notes", async (req, res) => {
  //   const { title, description } = req.body;
  const title = req.body?.title;
  const description = req.body?.description;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Notes created successfully",
    note,
  });
});

/*
 -GET /notes
 - Fetch all the notes data
*/

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()    //find method always return data in array of objects format

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    })
});

module.exports = app;
