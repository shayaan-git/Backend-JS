const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); // Parse body first then handle routes
/*
Rule of thumb: Always register middleware (express.json(), cors(), morgan(), etc.) at the top, before any routes.
*/
app.use(cookieParser());

app.use("/api/auth", authRouter); /*Prefix --> /api/auth */

module.exports = app;
