const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const Schema = mongoose.Schema;

const postModel = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "categorie"
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    createAt: {
        type: String
    }
},{versionKey: false})

module.exports = mongoose.model("post", postModel);