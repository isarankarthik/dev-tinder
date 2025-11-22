import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
// function to connect to our databse dev tinder.
export default async function connectDB()
{
    let url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@newcluster0.4r1bx.mongodb.net/${process.env.DB_NAME}`;   
    await mongoose.connect(url);
}

