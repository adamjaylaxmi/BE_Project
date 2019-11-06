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

router.get('/getCustomerByName',(req,res)=>{
 //ur backend logic  or processed data
 //for ex. u want to send data arrays object
 var dataArray = [];
 var data={'firstname':'','lastname':'','address':''};

 var data1={'firstname':'','lastname':'','address':''};


 data.firstname='abc';
 data.lastname='xyz';
 data.address = 'address';

 dataArray.push(data);

 data1.firstname='abc2';
 data1.lastname='xyz2';
 data1.address = 'address2';
 //need to fetch this data from database only ex. purpose i am taking
  dataArray.push(data1);
  console.log('data:'+JSON.stringify(dataArray));
  //
    res.render('newview',{mydataArray:dataArray});
});

module.exports = router;