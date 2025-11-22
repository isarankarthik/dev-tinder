import mongoose from "mongoose";
import validator from "validator"

// the attributes are similar to the columns in the mysql which we have.
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 5
    },
    lastName : {
        type : String
    },
    // the unique true and the required true are the validations from the mongo db.
    username : {
        type : String,
        required : true,
        unique:true,
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true,
        lowercase : true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid");
            }
        }
    },
    photoUrl : {
        type: String
    },
    about : {
        type: String,
        default : "I am a developer"
    },
    skills : {
        type : [String],
        validate(value) {
            const isValid = value.every((key) => typeof key === 'string' && key.length > 0);
            if (!isValid) {
                throw new Error("Invalid skills");
            }
            if (value.length > 10) {
                throw new Error ("Number of skills cannot be more than 10");
            }
        }
    },
    status : {
        type : String, 
        enum : ["active", "inactive"],
        default : "active"
    },
    is_deleted : {
        type : Boolean,
        default : false
    },
    deleted_at : {
        type : Date,
        default : null
    }
}, {
    timestamps:true
});

// model is something which is used to connect with the database.
const User = mongoose.model("User", userSchema);

export default User;
