const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Created Successfully!");
});

const notes = [];

app.post("/notes", (req, res) => {
//   console.log(req.body);
//postman ke raw body mei Kya data hai? Jo client (postman as a frontend) data req kar raha Server ko (postman ke UI mei)

  res.send("notes created"); // res.send means client ko jo response milega post send karne pe (postman ke UI mei)

  notes.push(req.body);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log(`Server in running at http://localhost:3000`);
});
