
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://adamjaylaxmi:20729190@cluster0-tdtig.mongodb.net/test?retryWrites=true&w=majority/FirstDb';
mongoose.connect(mongoDB, { useUndefinedTopology:true,useNewUrlParser: true  });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('Connection Established Successfully');

var Schema = mongoose.Schema;
var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
  });
  
  // Compile model from schema
  var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

db.close();

