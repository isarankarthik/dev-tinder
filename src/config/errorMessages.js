const errorMessages = {
    user : {
        missingEmail : "Email is missing.",
        invalidEmail : "Invalid email",
        createUser : "Failed to create user. Please try again.",
        feedUser : "Failed to get the users. Please try again.",
        individualUser : "Failed to get the user. Please try again",
        databaseConnection : "An error occurred while connecting to the database. Please check the logs.",
        noUser : "No user found. Please check the information.",
        deleteUser : "Failed to delete the user. Please try again.",
        updateUser : "Failed to update user information. Please try again.",
        moreSkills: "Number of skills cannot be more than 10",
        firstName : "First Name cannot be empty",
        emptyPassword : "Password cannot be empty"
    },
    
}

export default errorMessages;