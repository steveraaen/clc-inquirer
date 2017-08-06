var allsigns = require("../../models/Allsigns.js");

module.exports = function(app) {
// ---------- Monday
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
// ---------- Tuesday
        app.get("/tue", function(req, res) {
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
// ---------- Wednesday
            app.get("/wed", function(req, res) {
        allsigns.find({
            "properties.T": /WED/i,
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
// ----------- Thursday
             app.get("/thu", function(req, res) {
        allsigns.find({
            "properties.T": /THU/i,
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
// ---------- Friday
    app.get("/fri", function(req, res) {
        allsigns.find({
            "properties.T": /FRI/i,
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
// ---------- Saturday
    app.get("/sat", function(req, res) {
        allsigns.find({
            "properties.T": /SAT/i,
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