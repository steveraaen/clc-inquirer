var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var pwds = require("./app/passwds");
var Sign = require("./models/Signs.js");
var bkbrooms = require("./data/bkbrooms.json");

var app = express();
var PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));



mongoose.connect(pwds.mong);
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");

/*    app.get("/signs", function(req, res) {
        Sign.find().distinct("features.properties.T", function(error, doc) {
            if (error) {
                console.log(error);
            }
            else {
            	console.log(doc)
                res.send(doc);
            }
        });
    });*/

    /*    app.get("/api", function(req, res) {
            console.log(bkbrooms.features[0].geometry);
            for (let i = 0; i < bkbrooms.features.length; i++) {
                var bkpksign = new Sign({ properties: bkbrooms.features[i].properties, geometry: bkbrooms.features[i].geometry });

                bkpksign.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('meow');
                    }
                });
            }
        })*/

});

app.listen(PORT, function(err) {
    if (err) throw err
    console.log('connected on  ' + PORT)
})
