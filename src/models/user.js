const mongoose = require("mongoose");

// the attributes are similar to the columns in the mysql which we have.
const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;