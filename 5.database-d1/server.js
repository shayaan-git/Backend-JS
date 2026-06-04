const app = require("./src/app.js");

const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://Shayaan:wVnKs0KLgeqtqx88@cluster0.qrz3sy2.mongodb.net/day-6",
    )
    .then(() => {
      console.log("Connected to Database");
    });
}
connectToDb();

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
