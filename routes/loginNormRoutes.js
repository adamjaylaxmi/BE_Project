const router = require("express").Router();
const bodyParser = require("body-parser");
const userSchema = require("../models/userSchema");
const regModel = require('../models/regModel');
// var   = regModel.regModel;
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
router.get("/register", (req, res) => res.render("Registration"));

//1.2f ************ UI - register/submit button after filling data *************
router.post("/register", (req, res) => {
  console.log("reqBody:" + JSON.stringify(req.body));
  const {
    mobileNo,
    OTP,
    psw,
    pswRepeat
  } = req.body;

  let errors = [];

  if (
    !mobileNo ||
    !OTP ||
    !psw ||
    !pswRepeat 
  ) {
    errors.push({ msg: "Please enter all fields" });
  }
 
    if(mobileNo.length > 10){
       errors.push({msg: "Number is invalid... "});
    }

  if (psw != pswRepeat) {
    errors.push({ msg: "psws do not match" });
  }

  if (psw.length < 6) {
    errors.push({ msg: "psw must be at least 6 characters" });
  }
  //if errors..
  if (errors.length > 0) {
    console.log("Errors");
    res.render("Registration", {
      errors,
      mobileNo,
      OTP,
      psw,
      pswRepeat
    });
  }
  //if all details are entered(if none of the field is empty)...
  else {
    regModel.find({ mobileNo : mobileNo }, function(err, result) {
      console.log("reswithor:" + JSON.stringify(result));
      if (err) {
        console.log(err);
      } else if (JSON.stringify(result) == "[]") {
        //Mobile Number is unique...
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(psw, salt, (err, hash) => {
            var enc_pass = hash;
  
              var regModel1  = new regModel({
                Mobileno : mobileNo,
                Password : enc_pass
              });
              
              regModel1.save(function(err) {
                if (err) throw err;
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/loginNorm/login");
               });               
          });        
        }); //#bcrypt

      } else {
            // if Mobile number is already exist...
            console.log("Errors");
            errors.push({
              msg: "mobileNumber already registered Please Try Another One.."
            });
            renderErrors();
          }
        });
      }
  function renderErrors() {
    res.render("Registration", {
      errors,
      mobileNo,
      OTP,
      psw,
      pswRepeat
    });
  }
});

//2.1 ********  UI - login button/failerredirect button i.e. if login fails then redirect to same page *********
router.get("/login", (req, res) => {
 console.log('loginPage');
 res.render("CustomerLogin");
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
