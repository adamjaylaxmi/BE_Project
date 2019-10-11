var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var router=require('router');
var methodOverride=require('method-override');
var mongoose = require('mongoose');

app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/company',{ useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connection successful');
var Schema=new mongoose.Schema(
    {
        _id:String,
        name:String,
        age:Number

    }
);

var user=mongoose.model('emp',Schema);

app.get('/', (req, res)=>{ 
  
    // The render method takes the name of the HTML 
    // page to be rendered as input 
    // This page should be in the views folder 
    // in the root directory. 
    res.render('EmpRec', {name:'Akashdeep'}); 
  
});

app.post('/new',function(req,res)
{
    new user(
        {
            _id:req.body.email,
            name:req.body.name,
            age:req.body.age
        }

    ).save(function(err,doc)
    {
        if(err)res.json(err);
        else res.send("Successfully inserted");
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })