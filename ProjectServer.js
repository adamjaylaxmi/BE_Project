const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const app = express();
const flash = require("connect-flash");
const MongoClient = require("mongodb").MongoClient;
// const authRoutes = require("./routes/auth-routes");
// const profileRoutes = require("./routes/profile-routes");
const login_NormRoutes = require("./routes/loginNormRoutes");

const driverLogin_NormRoutes = require("./routes/driverLoginNormRoutes");

const customerRoutes = require("./routes/customerService");
// const fs = require('fs');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

// Passport Config
require("./config/driverPassport")(passport);

require("./config/passport")(passport)

// set view engine
app.set("view engine", "ejs");

// set up session cookies
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//when u want to give image path just use /aseets/images/imageName.jpg
//it will refer assets folder from /assets keyword...
app.use(express.static(__dirname + '/assets'));

//   connect to mongodb
//same like assets
app.use(express.static(__dirname + '/routes'));

// mongodb://myUserName:MyPassword@ElasticIP:27017/databaseName?authSource=admin

// const uri =
//   "mongodb+srv://adamjaylaxmi:passw@cluster0-tdtig.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//   if (err) {
//     console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
//   } else {
//     console.log("Connected...");
//   }

//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
console.log("string conn:" + keys.mongodb.dbURI);
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

app.use(flash());

// Global variables...
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// set up routes
// app.use("/auth", authRoutes);
// app.use("/profile", profileRoutes);

app.use("/loginNorm", login_NormRoutes);
app.use("/driverLoginNorm", driverLogin_NormRoutes);
app.use("/customer", customerRoutes);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// create home route
//app.get("/", (req, res) => res.render("login_n"));

//basic routes
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

app.get('/driverlogin', function (req, res) {
   console.log("Got a GET request for the Driver login");
   res.render('driverLogin'); 
})

const PORT = process.env.PORT || 8085;
app.listen(PORT, function() {
  console.log("Example app is listening on localhost port 8085...");
});

