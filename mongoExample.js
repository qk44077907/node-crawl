var MongoClient = require('mongodb').MongoClient

//var mongodb = require('mongodb');
// Connection URL
var url = 'mongodb:localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
    console.log(err);
    console.log("Connected successfully to server");
    console.log(db);
});
/*var response = {
    first_name:'',
    last_name:''
};

var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});

var db = new mongodb.Db('mydbs',server,{safe:true});
db.open(function(err,db){
    if(!err)
    {
        db.collection('mydbs',{safe:true},function(err,collection){
            collection.insert(response,{safe:true},function(err,result){
                console.log(result);
            });
        });
    }else{
        console.log(err);
    }
    console.log(response);
});*/
