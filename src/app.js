// Importing express in our application
import express from "express"
import connectDB from "./config/databse.js"
import errorMessages from "./config/errorMessages.js"
import successMessages from "./config/successMessages.js"
import emailRegex from "./constants/regex.js"
import User from "./models/user.js"
import validator from "validator"
// creation of the instance of the web application.

const app = express();
// usage of json middleware. JSON middleware converts the data from JSON to javascript object.
app.use(express.json());
// create new user to the application.
app.post("/signup", async(req, res) => {
  try {
  // creation of new instance of the user model. 
  // destructing the req.body 
  let {...userInput} = req.body;
  let trimmedName = userInput?.firstName.trim();
  if (!trimmedName ||trimmedName.length == 0) {
    return res.status(422).send(errorMessages.user.firstName);
  }
  
  // check whether the email is a valid one. 
  if (!userInput?.email || !validator.isEmail(userInput?.email)) {
    return res.status(422).send(errorMessages.user.invalidEmail);
  }

  let trimmedPassword = userInput?.password.trim();
  if (!trimmedPassword || trimmedPassword.length == 0) {
    return res.status(422).send(errorMessages.user.emptyPassword);
  }

  // check if the number of skills is more than 10 or not.
  if (userInput?.skills.length > 10) {
    return res.status(422).send(errorMessages.user.moreSkills);
  }

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
      return res.status(422).send("No users available.");
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(422).send(errorMessages.user.feedUser);
  }
});

// getting the user by the email.
app.get("/user", async(req, res) => {
  try {
    let userEmail = req.body.email;
    if (!userEmail) {
      return res.status(422).send(errorMessages.user.missingEmail);
    }

    let users = await User.findOne({'email' : userEmail});
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
    const ALLOWED_UPDATES = [
      "about", "skills", "age", "gender","userId"
    ];

    const isUpdateAllowed = Object.keys(req.body).every((key) => {
      return ALLOWED_UPDATES.includes(key)
    });

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    if (updateFields?.skills.length > 10) {
      return res.status(422).send(errorMessages.user.moreSkills);
    }

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
    return res.status(422).send("Update failed" + err.message);
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


