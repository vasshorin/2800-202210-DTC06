const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    age: String,
    province: String,
    city: String,
    password: String,
    admin: Boolean,
    time: String
})

module.exports = mongoose.model('users', userSchema);
