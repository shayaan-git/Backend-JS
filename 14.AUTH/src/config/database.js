const mongoose = require("mongoose");

function connectToDb() {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Something went wrong with Database connection", error);
  }
}

module.exports = connectToDb;
