var express = require('express');
var app = express();

var path=require('path');

app.use(express.static('public'));


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/login.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "login.htm" );
})

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/layout', function (req, res) {
   res.render('layout');
 })

 app.get('/index', function (req, res) {
   res.render('index');
 })

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       Username:req.query.Username,
       Password:req.query.Password
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})