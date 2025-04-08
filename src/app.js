// Importing express in our application
const express = require("express");

// creation of the instance of the web application.

const app = express();

const {adminAuth} = require("./middlewares/auth");

// this is the request handler function.

// usage of middleware for all the routes. 
app.use("/test", adminAuth);

app.get("/test", (req, res) => {
  res.status(200).send("Data retrived");
});

// server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});
