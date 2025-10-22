require('dotenv').config()
const mongoose = require("mongoose");
// function to connect to our databse dev tinder.
async function connectDB()
{
    let url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@newcluster0.4r1bx.mongodb.net/${process.env.DB_NAME}`;   
    await mongoose.connect(url);
}

module.exports = connectDB;