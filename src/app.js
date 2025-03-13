// Importing express in our application
const express = require("express");

// creation of the instance of the web application.

const app = express();

// this is the request handler function.

app.use(
  "/test",[
  (req, res) => {
    res.send("Hello from route handler 1");
  },
  (req, res) => {
    res.send("From route handler 2");
  }],
  (req, res, next) => {
    res.send("From route handler3");
  }
);

// server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});
