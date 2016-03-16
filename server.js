var express = require('express');
var app = express();                                         // app is an instance of express library
var bodyParser    = require('body-parser');
var multer        = require('multer');

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');
//app.use(session({ secret: "mysecret" }));
//app.use(cookieParser());

//set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


//The get() method allows you to map a url to an executable
app.get('/say/hello', function(req, res){
    res.send('hello world');
});
app.get('/api/users', function(req, res){
    var users = [
        {username: "Ergou", first: "Ning", last: "Luo"},
        {username: "Scarlet", first: "Yuan", last: "Fang"},
        {username: "Kii", first: "Beyond", last: "Xu"}
    ];
    res.json(users);
});

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);

