var ksigns = require('../../models/GeoSigns.js')
var Sign = require("../../models/Signs.js");
var Code = require("../../models/Codes.js");
var Hood = require("../../models/hoods.js");
var xsigns = require("../../models/Xsigns.js");
var allsigns = require("../../models/Allsigns.js");
module.exports = function(app) {

// -------------- get 50 signs ------------------------
app.get("/ksigns/", function(req, res) {

    ksigns.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc)
            res.json(doc);
        }
    }).limit(5000);
});
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
                    coordinates: [-73.983907, 40.676645]
                },
                $maxDistance: 5000
            }
        }
    }, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc)
            res.json(doc);
        }
    }).limit(10000);
});
// ---------------------------------------------------
app.get("/allwithin", function(req, res) {
    allsigns.find({

        geometry: {
            $geoWithin: {
                $geometry: {
                    type: "Polygon",
                    coordinates: [flatbush.geometry]
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
app.get('/knear', function(req, res) {
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
                    coordinates: [-73.891449, 40.862163]
                },
                $maxDistance: 200
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

// ------------------ get 10 neighborhoods ----------------------
app.get("/hoods/", function(req, res) {
    Hood.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc)
            res.json(doc);
        }
    });
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

// ----------------------------------------------------
app.get("/ksigns/:day", function(req, res) {
    ksigns.find({ "properties.T": /MON/i }, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc)
            res.json(doc);
        }
    }).limit(50);
});
}
