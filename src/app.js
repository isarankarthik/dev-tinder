// Importing express in our application
const express = require("express");

// creation of the instance of the web application.

const app = express();

// this is the request handler function.

app.use("/test", (req, res) => {
  res.send("Test handled");
});

app.use("/hello", (req, res) => {
  res.send("Hello handled");
});
app.use("/", (req, res) => {
  res.send("Global");
});

// server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});
