// Importing express in our application
const express = require("express");

// creation of the instance of the web application.

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

// this is the request handler function.

// usage of middleware for all the routes. 
app.use("/test", adminAuth);
app.use("/user", userAuth);

app.get("/test", (req, res) => {
  try {
    throw new Error("Someting went wrong");
    res.send("Hello Test");
  } catch (err) {
    res.status(422).send(err.message);
  }
  
});

app.get("/user", (req, res) => {
  res.status(200).send("Hello User");
});

// error handling 
app.use("/", (err, req, res,next) => {
  if (err) {
    res.status(422).send("Something went wrong");
  }
})

// server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});
