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
    let users = await User.find({is_deleted : false, status : "active"});
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

app.get("/user", async(req, res) => {
  try {
    let userEmail = req.body.email;
    if (!userEmail) {
      return res.status(422).send(errorMessages.user.missingEmail);
    }

    let users = await User.findOne({});
    if (!users || users.length == 0) {
      console.error("Users are not available");
      return res.status(422).send(errorMessages.user.noUser);
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.individualUser);
  }
});

app.get("/getUserById", async (req, res) => {
  try {
    let userId = req.body.userId;

    let userData = await User.findById(userId);
    if (!userData) {
      return res.status(200).send("User does not exist");
    }
    return res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.individualUser);
  }
});

app.delete("/delete-user", async (req, res) => {
  try {
    let userId = req.body.userId;
    let response = await User.updateOne(
      {_id : userId},
      {
        $set : {
          is_deleted : true,
          status : "inactive",
          deleted_at : new Date()
        }
      }
    );
    if (!response) {
      return res.status(422).send(errorMessages.user.deleteUser);
    }
    return res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.deleteUser);
  }
});

// update the user. 

app.patch("/user", async (req, res) => {
  try {
    let {userId, ...updateFields} = req.body;
    // let result = await User.findByIdAndUpdate(userId, {age : age});
    // the above one can also be done using : 
    let result = await User.updateOne(
      {_id : userId}, 
      {$set : {...updateFields}},
      {runValidators : true}
    );
    if (!result) {
      return res.status(422).send(errorMessages.user.updateUser);
    }
    return res.status(200).send(successMessages.user.updateUser)
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.updateUser);
  }
});

connectDB().then(() => {
  console.log("DB connection is successful");
  // server listenes to the port which is mentioned here.
app.listen(3000, () => {
  console.log("Server is successfully running on the port 3000");
});

}).catch((err) => {
  console.error(err);
});


