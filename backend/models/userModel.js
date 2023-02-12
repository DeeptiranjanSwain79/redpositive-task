const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxlength: [50, "Name cannot exceed 50 characters"],
        minlength: [3, "Name should have more than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your E-mail ID"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid E-mail ID"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password should be minimum 8 characters"],
        select: false   //If anyone fetches the data it should not display the password of the user (even if the ADMIN)
    },
    role: {
        type: String,
        required: [true, "Please enter role of user"],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

//To encrypt the password
userSchema.pre("save", async function (next) {
    //We can't use "this" keyword with in arrow function
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10)
});

//JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, "secret", {
        expiresIn: "15d",
    })
}

//Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);      //compare() method compares entered password with the encrypted password 
}


module.exports = mongoose.model('user', userSchema);