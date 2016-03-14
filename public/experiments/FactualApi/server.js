
var express = require('express');

var app = express();
var Factual = require('factual-api');
var factual = new Factual('YksAE1xJeGZBoRvvJ6obQDWIDoxYZZ5fmDr6ImOhG', '4yVQ5f1KWMsc6l7EzjlzK7pj3JmE5vmtTzAuc5kc');

factual.get('/t/places-us/schema', function (error, res) {

});

app.get("/rest/course", function(req, res){

    var courses = [
        {title: "Java 101", seats: 23, start: new Date()},
        {title: "C# 101", seats: 34, start: new Date()},
        {title: "Node.js 101", seats: 45, start: new Date()}
    ];

    res.send(courses);
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);/**
 * Created by ningluo on 3/8/16.
 */
