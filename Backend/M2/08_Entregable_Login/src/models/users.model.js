const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;