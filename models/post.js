const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// post
const postSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" }, //authorID
    postID: Number,
    title: String,
    body: String,
    type: String,
    url: String
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("post", cartSchema);
