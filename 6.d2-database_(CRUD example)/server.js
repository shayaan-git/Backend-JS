require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
