const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housingPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    userId: String,
    username: String,
    time: String
});


module.exports = mongoose.model('housingPosts', housingPostSchema);