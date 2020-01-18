const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  Mobileno: String,
  Password: String
});

const regModel = mongoose.model('Regusers', regSchema);

module.exports = regModel;