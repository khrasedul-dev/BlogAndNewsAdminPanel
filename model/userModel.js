const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
},{versionKey: false})

module.exports = mongoose.model("user", userModel);