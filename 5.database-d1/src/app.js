const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Server is running on ASUS TUF System')
})

module.exports = app;
