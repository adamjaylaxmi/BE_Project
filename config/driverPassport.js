const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ObjectId = require("mongodb").ObjectId;

const bcrypt = require("bcryptjs");
//var localStorage = require("localstorage");

//for login
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      localStrategy = true;

      const mongoose = require("mongoose");
      const driverSchema = require("../models/driverSchema");
      const driver = mongoose.model("driver", driverSchema, "driver");
      driver.find({ $or: [{ email: email }, { username: email }] }, function(
        err,
        result
      ) {
        console.log("resultds:" + JSON.stringify(result));
        if (err) {              console.log(err); }
        else if (JSON.stringify(result) == "[]") {
          console.log("email or username is not valid/registred...");
          return done(null, false, {
            message: "email or username is not valid/registred..."
          });
        } else {
          console.log('controll is here'+JSON.stringify(user));

          //  Match password
          bcrypt.compare(password, result[0].password, (err, isMatch) => {
            console.log('user pass:',password,'database password',result[0].password);
            if (err) {
              console.log(err);
            }
            if (isMatch || JSON.stringify(password) == JSON.stringify(result[0].password)) {
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
            driver.find({ _id: id }, function(err, result) {
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
