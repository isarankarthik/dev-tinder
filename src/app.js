// Importing express in our application
const express = require("express");
const connectDB = require("./config/databse");

const User = require("./models/user");

// creation of the instance of the web application.

const app = express();
// usage of json middleware. JSON middleware converts the data from JSON to javascript object.
app.use(express.json());
app.post("/signup", async(req, res) => {
  try {
  // creation of new instance of the user model. 
  const user = new User(req.body);
  await user.save();
  res.status(200).send("User Created Successfully");
  } catch (err) {
    console.error(err);
    res.status(422).send("Failed to create user.");
  }
});

connectDB().then(() => {
  console.log("DB connection is successful");
  // server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});

}).catch(() => {
  console.error("an error occurred while connecting to database.");
});


