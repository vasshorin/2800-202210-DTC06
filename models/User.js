const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {  
          type: String,
          required: true,
          unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        admin: false,
        posts: [{
            title: String,
            body: String,
            type: String,
            url: String
        }]
    },
    {
      _id: true,
      id: true,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("User", userSchema);