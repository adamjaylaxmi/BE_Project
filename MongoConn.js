var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var connString="mongodb+srv://adamjaylaxmi:Jayashri2*@cluster0-tdtig.mongodb.net/test";
MongoClient.connect(connString, {useNewUrlParser:true},{useUnifiedTopology:true},function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
      console.log("Connected");          
});