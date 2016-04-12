var express       = require('express');
var app           = express();                                         // app is an instance of express library
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
//install and require the mongoose library
var mongoose      = require('mongoose');

//create a connection String to local database, cs5610 is the database name, 127.0.0.1:27071 == localhost
var connectionString = 'mongodb://localhost/cs5610';
//create a connection String to Openshift, the mongoDB instance that runs on Openshif has its own IP address, port number,
//user name and password and so on.
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {   //to check am I running locally? If this PASSWORD exists, then I'm running remotely
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;   // the name of the database, default value is the same as application name
}
//* all of those sensitive info above are made available to node.js instance through envrionment variables which are saved locally

//connect to the database
var db = mongoose.connect(connectionString);

//test database connection, get notified if we connect successfully or if a connection error occurs
mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, 'connection error:'));
mongodb.once("open", function () {
    console.log("we are connected to the database!");
});

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

//configure session support
app.use(session({ secret: process.env.SESSION_SECRET}));

//confiture cookieParser, needed for oauth
app.use(cookieParser());

//initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

require("./public/assignment/server/app.js")(app, db);
require("./public/project/server/app.js")(app, db);

app.listen(port, ipaddress);

