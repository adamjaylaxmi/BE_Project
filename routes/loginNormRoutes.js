const router = require("express").Router();
const bodyParser = require("body-parser");
const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
// var multer  = require('multer');
// var path = require('path');
// var localStorage =  require('localstorage');
var mongoose = require("mongoose");
// var mkdirp = require('mkdirp');
// let fs = require('fs-extra');
// const ObjectId = require('mongodb').ObjectID;
// var async = require('async');
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const user = mongoose.model("user", userSchema, "user");

const { ensureAuthenticated } = require("../config/auth");
router.use(bodyParser.json());

// 1.1 ********** UI - register button register page **************
router.get("/register", (req, res) => res.render("register"));

//1.2f ************ UI - register/submit button after filling data *************
router.post("/register", (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  const {
    firstname,
    lastname,
    email,
    username,
    password,
    password2
  } = req.body;

  let errors = [];

  if (
    !firstname ||
    !lastname ||
    !email ||
    !username ||
    !password ||
    !password2
  ) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  //if errors..
  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstname,
      lastname,
      email,
      username,
      password,
      password2
    });
  }
  //if all details are entered(if none of the field is empty)...
  else {
    user.find({ email: email }, function(err, result) {
      console.log("reswithor:" + JSON.stringify(result));
      if (err) {
        console.log(err);
      } else if (JSON.stringify(result) == "[]") {
        //email is unique...
        user.find({ username: username }, function(err, result) {
          if (JSON.stringify(result) == "[]") {
            //username && email is unique...
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                var enc_pass = hash;
                //insert all user data to db
                console.log("firstname:" + firstname);
                var user1 = new user({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  username: username,
                  password: enc_pass
                });
                // Save the new model instance, passing a callback
                user1.save(function(err) {
                  if (err) throw err;
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/loginNorm/login");
                });
              });
            });
          } else {
            // if username is already exist...
            errors.push({
              msg: "username already Exist Please Try Another One.."
            });
            renderErrors();
          }
        });
      } else {
        //if email already exist
        errors.push({ msg: "That email is already Exist..." });
        renderErrors();
      }
    });
  }
  function renderErrors() {
    res.render("register", {
      errors,
      firstname,
      lastname,
      email,
      username,
      password,
      password2
    });
  }
});

//2.1 ********  UI - login button/failerredirect button i.e. if login fails then redirect to same page *********
router.get("/login", (req, res) => {
 console.log('loginPage');
 res.render("login_n");
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/loginNorm/login");
});
//2.2 ******* UI - login/submit after filling data ie. check if user registred or not...
router.post("/login", (req, res, next) => {

  console.log('data:'+JSON.stringify(req.body));
  passport.authenticate("local", {
    successRedirect: "/loginNorm/loginSuccess", //redirecting to dashboard if user is instructor...
    failureRedirect: "/loginNorm/login",
    failureFlash: true
  })(req, res, next);
});

//2.3 **** if login successull
router.get("/loginSuccess", function(req, res) {
  console.log('loginSuccess');
  res.render("Home");
});

module.exports = router;
