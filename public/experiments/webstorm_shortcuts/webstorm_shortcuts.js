
//create an instance of the express library by loading it with require method (p.s. express library has already
// or can be installed by using command 'npm install express')
var express = require('express');

//then create an instance of that web server; The app object conventionally denotes the Express application,
//create it by calling the top-level express() function
var app = express();

//the server will listen to get http request and response accordingly
//app.get('/', function(req, res){
//    res.send('Hello World');
//});
//app.get('/getSomeJson', function(req, res){
//   res.send({message: 'this is a Json object'});
//});

//CRUD
// url has to be "/rest/course", not "rest/course"
app.get("/rest/course", function(req, res){

    var courses = [
        {title: "Java 101", seats: 23, start: new Date()},
        {title: "C# 101", seats: 34, start: new Date()},
        {title: "Node.js 101", seats: 45, start: new Date()}
    ];
    res.send(courses);
});

//Serve static content for the app from the “public2” directory in the application directory:
app.use(express.static(__dirname + '/public2'));

app.listen(3000);/**
 * Created by ningluo on 2/29/16.
 */
