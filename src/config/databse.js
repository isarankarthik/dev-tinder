const mongoose = require("mongoose");
// function to connect to our databse dev tinder.
async function connectDB()
{
    await mongoose.connect("mongodb+srv://sarankarthik2510:xz397cxdff@newcluster0.4r1bx.mongodb.net/devTinder");
}

module.exports = connectDB;