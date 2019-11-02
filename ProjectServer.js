var express = require('express');
var app = express();

const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const flash = require("connect-flash");
const MongoClient = require("mongodb").MongoClient;

const login_NormRoutes = require("./routes/loginNormRoutes");

const urlencodedParser = bodyParser.urlencoded({
   extended: true
 });
 
 // Passport Config
 require("./config/passport")(passport);

 app.use(
   session({
     secret: "secret",
     resave: true,
     saveUninitialized: true
   })
 );
 

app.set('view engine', 'ejs');



// This responds with "Hello World" on the homepage
/*app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('homepage'); 
 })*/
 
 app.use(express.static(__dirname + '/assets'));

 app.use(flash());

app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.render('Home'); 
})

app.get('/home', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.render('Home'); 
})

app.get('/tour', function (req, res) {
   console.log("Got a GET request for the tour");
   res.render('tour'); 
})

app.get('/destination', function (req, res) {
   console.log("Got a GET request for the destination");
   res.render('destination'); 
})

app.get('/T1', function (req, res) {
   console.log("Got a GET request for the T1");
   res.render('T1'); 
})

app.get('/T2', function (req, res) {
   console.log("Got a GET request for the T2");
   res.render('T2'); 
})

app.get('/T3', function (req, res) {
   console.log("Got a GET request for the T3");
   res.render('T3'); 
})

app.get('/T4', function (req, res) {
   console.log("Got a GET request for the T4");
   res.render('T4'); 
})

app.get('/T5', function (req, res) {
   console.log("Got a GET request for the T5");
   res.render('T5'); 
})

app.get('/T6', function (req, res) {
   console.log("Got a GET request for the T6");
   res.render('T6'); 
})

app.get('/login', function (req, res) {
   console.log("Got a GET request for the travel agent request");
   res.render('login_n'); 
})

app.get('/login', function (req, res) {
   console.log("Got a GET request for the driver");
   res.render('login_n'); 
})

app.use(passport.initialize());
app.use(passport.session());

app.use("/routes", express.static("routes"));

app.use(function(req, res, next) {
   res.locals.success_msg = req.flash("success_msg");
   res.locals.error_msg = req.flash("error_msg");
   res.locals.error = req.flash("error");
   next();
 });

 app.use(
   bodyParser.urlencoded({
     extended: true
   })
 );
 
var server = app.listen(8085, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})