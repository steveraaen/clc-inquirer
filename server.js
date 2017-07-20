var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GeoJSON = require('mongoose-geojson-schema');

var pwds = require("./app/passwds");
var Sign = require("./models/Signs.js");

var Code = require("./models/Codes.js");
var Hood = require("./models/hoods.js");
var xsigns = require("./models/Xsigns.js");
var allsigns = require("./models/Allsigns.js");
var flatbush = require("./flatbush.json");
console.log(flatbush)
var app = express();
require("./app/routing/onload-routes")(app);
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
    // ---------------------------------------------------
    app.get("/allsigns", function(req, res) {
        allsigns.find({
           geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.891449,40.862163]
                    },
                    $maxDistance: 20
                }
            }}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(100);
    });
    // ---------------------------------------------------
    app.get("/allwithin", function(req, res) {
        allsigns.find({

   geometry: {
      $geoWithin: {
         $geometry: {
            type: "Polygon" ,
            coordinates: [ flatbush.geometry ]
         }
      }
   }
}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(100);
    });
// ---------------------------------------------------
    app.get('/ksigns/:near', function(req, res) {
        ksigns.find({
            type: "Feature",
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.97083, 40.61310]
                    },
                    $maxDistance: 200
                }
            }
        }).limit(50),
        function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }
});
// -------------- get 50 signs ------------------------
    app.get("/xsigns", function(req, res) {
        xsigns.find({
           geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.891449,40.862163]
                    },
                    $maxDistance: 200
                }
            }}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(100);
    });
// -------------- get 50 signs ------------------------
    app.get("/muts", function(req, res) {
        Sign.find({}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(500);
    });

// ------------------ get 10 neighborhoods ----------------------
    app.get("/hoods/", function(req, res) {
        Hood.find({ name: "Erasmus" }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(10);
    });
// -------------- get all MUTCD codes----------------------------
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
// ----------------------------------------------------
    app.get("/codes/:day", function(req, res) {
        GeoSign.find(
            { "T": /SAT/i }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(50);
    });



// ---------------------------------------------------
app.listen(PORT, function(err) {
    if (err) throw err
    console.log('connected on  ' + PORT)
})
