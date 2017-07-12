var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GeoJSON = require('mongoose-geojson-schema');

var pwds = require("./app/passwds");
var Sign = require("./models/Signs.js");
var GeoSign = require("./models/GeoSigns.js");
var Code = require("./models/Codes.js");
var Hood = require("./models/hoods.js");
var erasmus = require("./erasmus.json");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));

mongoose.connect(pwds.monggeo);
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function() {
    console.log("Mongoose connection successful.");

    app.get("/", function(req, res) {
        res.sendFile(__dirname + "/view/public/index.html");
    });
    app.get("/ksigns", function(req, res) {
        GeoSign.find({}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(50);
    });
    app.get("/hoods/:name", function(req, res) {
        Hood.find({name: "Erasmus"}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(10);
    });
    app.get("/codes", function(req, res) {
        Code.find({}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(50);
    });
})
app.get('/geoNear', function(req, res) {
    GeoSign.find({
        "Point": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [-73.9481, 40.6365]
                },
                $maxDistance: 50
            }
        }
    }), function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc)
            res.json(doc);
        }
    }
})
app.listen(PORT, function(err) {
    if (err) throw err
    console.log('connected on  ' + PORT)
})
