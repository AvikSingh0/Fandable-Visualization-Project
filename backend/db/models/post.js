const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// New schema for Reddit post
const postSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {type: String, unique: true},
  source: String,
});

const PostModel = mongoose.model("MediaPost", postSchema);

module.exports = PostModel;
