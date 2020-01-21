const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ObjectId = require("mongodb").ObjectId;

const bcrypt = require("bcryptjs");
//var localStorage = require("localstorage");

//for login
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "Mobileno" }, (Mobileno, Password, done) => {
      localStrategy = true;

      const mongoose = require("mongoose");
      const userSchema = require("../models/regSchema");
      const user = mongoose.model("user", regSchema, "user");
      user.find({ $or: [{ Mobileno: Mobileno }] }, function(
        err,
        result
      ) {
        console.log("resultds:" + JSON.stringify(result));
        if (err) {              console.log(err); }
        else if (JSON.stringify(result) == "[]") {
          console.log("email or username is not valid/registred...");
          return done(null, false, {
            message: "Mobileno is not valid/registred..."
          });
        } else {
          console.log('controll is here'+JSON.stringify(user));

          //  Match password
          bcrypt.compare(Password, result[0].Password, (err, isMatch) => {
            console.log('user pass:',Password,'database password',result[0].Password);
            if (err) {
              console.log(err);
            }
            if (isMatch || JSON.stringify(Password) == JSON.stringify(result[0].Password)) {
              console.log("password matched...");
              console.log("resultid:" + result[0]._id);
              //set profileId for current user session
              return done(null, result);
            } else {
              console.log("password incorrect...");
              return done(null, false, { message: "Password incorrect" });
            }
          });
          //ser/deser
          passport.serializeUser((result, done) => {
            done(null, result);
          });

          passport.deserializeUser((id, done) => {
            user.find({ _id: id }, function(err, result) {
              if (err) {
                console.log("Error:" + err);
              }
              done(err, result[0]);
            });
          });
          // passport.serializeUser(function(result, done) {
          //   done(null, result);
          // });

          // passport.deserializeUser(function(result, done) {
          //   done(null, result);
          // });
        }
      });
    })
  );
};
