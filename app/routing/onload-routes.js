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
                    $maxDistance: 1000
                }
            }
        }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(5000);
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

    app.get("/hoodnames", function(req, res) {
        Hood.distinct('name', function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        });
    });





    // ------------------ get neighborhoods ----------------------
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
    // -------------- 
    app.get("/mon", function(req, res) {
        allsigns.find({
            "properties.T": /MON/i,
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.983907, 40.676645]
                    },
                    $maxDistance: 1000
                }
            }
        }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(500);
    });
    // ----------------------------------------------------
    app.get("tue", function(req, res) {
        allsigns.find({
            "properties.T": /TUE/i,
            geometry: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [-73.983907, 40.676645]
                    },
                    $maxDistance: 1000
                }
            }
        }, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log(doc)
                res.json(doc);
            }
        }).limit(500);
    });
}