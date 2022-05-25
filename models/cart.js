const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// post
const cartSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    pokeID: Number,
    price: Number,
    quantity: Number,
    checkout: { type: Boolean, default: false },
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);