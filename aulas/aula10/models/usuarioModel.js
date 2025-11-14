const mongoose = require("mongoose");

const schema = new mongoose.schema({
    username: String,
    password: String
});

module.exports = mongoose.model('usuario', schema);