const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("✅ Connected to MongoDB");
    });
  } catch (error) {
    console.error("Something wet wrong with db connection string", error);
  }
}

module.exports = connectToDb;
