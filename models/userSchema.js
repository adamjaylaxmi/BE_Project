const mongoose = require("mongoose");

//const userSchema = new Schema({
//    username: String,
//    googleId: String,
//    thumbnail: String
//});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String
});

userSchema.virtual("id").get(function() {
  return this._id;
});

module.exports = userSchema;
