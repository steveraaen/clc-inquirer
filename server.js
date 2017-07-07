var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GeoJSON = require('mongoose-geojson-schema');

var pwds = require("./app/passwds");
var Sign = require("./models/Signs.js");
var GeoSign = require("./models/GeoSigns.js");
var Code = require("./models/Codes.js");
var sd = require("../../../../parking/signData.json");

var app = express();
var PORT = 3001;

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
        res.sendFile(__dirname + "/view/reactapp/public/index.html");
    });

    app.get('/bor', function(req, res) {

        GeoSign.find({}, 'ID MUT geometry nearField', function(err, doc) {
            if (err) throw err;
            console.log(doc);
            res.send(doc)
        })

    });

})

app.listen(PORT, function(err) {
    if (err) throw err
    console.log('connected on  ' + PORT)
})
