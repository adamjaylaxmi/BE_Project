var express = require('express'); 
var app = express(); 
  
// Set EJS as templating engine 
app.set('view engine', 'ejs'); 

app.get('/', (req, res)=>{ 
  
    // The render method takes the name of the HTML 
    // page to be rendered as input 
    // This page should be in the views folder 
    // in the root directory. 
    res.render('home', {name:'Akashdeep'}); 
  
}); 
  
var server = app.listen(4000, function(){ 
    console.log('listining to port 4000') 
}); 