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

// const fs = require('fs');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

// Passport Config
require("./config/passport")(passport);

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
app.use("/assets", express.static("assets"));

//   connect to mongodb
//same like assets
app.use("/routes", express.static("routes"));

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

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// create home route
app.get("/", (req, res) => res.render("login_n"));

const PORT = process.env.PORT || 8082;
app.listen(PORT, function() {
  console.log("Example app is listening on localhost port 8082...");
});

// var Schema = new mongoose.Schema({
//   _id: String,
//   name: String,
//   age: Number
// });

// var user = mongoose.model("emp", Schema);

// app.get("/", (req, res) => {
//   // The render method takes the name of the HTML
//   // page to be rendered as input
//   // This page should be in the views folder
//   // in the root directory.
//   res.render("EmpRec", { name: "Akashdeep" });
// });

// app.post("/new", function(req, res) {
//   new user({
//     _id: req.body.email,
//     name: req.body.name,
//     age: req.body.age
//   }).save(function(err, doc) {
//     if (err) res.json(err);
//     else res.send("Successfully inserted");
//   });
// });

// var http=require('http');
// var server=http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/plain'});
//     res.end('Hey rohini');
// });

// server.listen(3000,'127.0.0.1');
// console.log('yo,now listening port 3000');
