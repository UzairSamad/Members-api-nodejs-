const express = require("express");
const path = require("path");
const logger = require("./Middleware/logger.js");
const app = express();

//Body parser MiddleWare for post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Member Api Routes
app.use("/api/members", require("./Routes/Api/members-api"));

const Port = process.env.Port || 5000;

app.listen(Port, () => console.log(`App Is Running on ${Port}`));
