// Importing express in our application
const express = require("express");
const connectDB = require("./config/databse");

const User = require("./models/user");

// creation of the instance of the web application.

const app = express();

app.post("/signup", async(req, res) => {
  try {
  const userObject = {
    firstName : "Kane",
    lastName : "Willamson",
    username : "kane_s_w",
    password : "kanekiwi",
    email : "kanekiwi@nz.com",
    age : 35,
    gender : "Male"
  }

  // creation of new instance of the user model. 
  const user = new User(userObject);

  await user.save();
  res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(422).send("Failed to create user.");
  }
})

connectDB().then(() => {
  console.log("DB connection is successful");
  // server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});

}).catch(() => {
  console.error("an error occurred while connecting to database.");
});


