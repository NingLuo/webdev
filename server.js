var express       = require('express');
var app           = express();                                         // app is an instance of express library
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
//Factual API
var Factual = require('factual-api');
var factual = new Factual('ksAE1xJeGZBoRvvJ6obQDWIDoxYZZ5fmDr6ImOhG', '4yVQ5f1KWMsc6l7EzjlzK7pj3JmE5vmtTzAuc5kc');

//Yelp API
//var Yelp = require('yelp');
//var yelp = new Yelp({
//    consumer_key: 'zYF3wNNT1BNWX8888RURMw',
//    consumer_secret: 'KR9ocr3VE84rvz3CrJmAQcuF_1g',
//    token: 'mA_P-dp13eKzjLYbWGnWyDqGQxpUgIu7',
//    token_secret: 'fMxkgwKzTbx5Kc2OFxAA5_rCwBc'
//});

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: "mySecret" }));
app.use(cookieParser());

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
require("./public/project/server/app.js")(app, factual);

app.listen(port, ipaddress);

