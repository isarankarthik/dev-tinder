// Importing express in our application
const express = require("express");
const connectDB = require("./config/databse");
const errorMessages = require("./config/errorMessages");
const successMessages = require("./config/successMessages");

const User = require("./models/user");

// creation of the instance of the web application.

const app = express();
// usage of json middleware. JSON middleware converts the data from JSON to javascript object.
app.use(express.json());
// create new user to the application.
app.post("/signup", async(req, res) => {
  try {
  // creation of new instance of the user model. 
  const user = new User(req.body);
  await user.save();
  res.status(200).send(successMessages.user.createUser);
  } catch (err) {
    console.error(err);
    res.status(422).send(errorMessages.user.createUser);
  }
});

// feed api -> this lists all the users in the application.
app.get("/feed", async(req, res) => {
  try {
    let users = await User.find({});
    if (!users || users.length == 0) {
      console.error("No users available");
      return res.status(422).send("Failed to get the users");
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.feedUser);
  }
});

app.get("/user/:email", async(req, res) => {
  try {
    // let userEmail = req.query.email;
    let userEmail = req.params?.email;
    if (!userEmail) {
      return res.status(422).send(errorMessages.user.missingEmail);
    }

    let users = await User.find({email : userEmail});
    if (!users || users.length == 0) {
      console.error("Users are not available");
      return res.status(422).send(errorMessages.user.individualUser);
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.individualUser);
  }
})

connectDB().then(() => {
  console.log("DB connection is successful");
  // server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});

}).catch((err) => {
  console.error(err);
});


