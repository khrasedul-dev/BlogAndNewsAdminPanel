const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const catModel = new Schema({
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{versionKey: false})

module.exports = mongoose.model("categorie", catModel);