var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var GeoJSON = require('mongoose-geojson-schema');

var pwds = require("./app/passwds");
var app = express();
require("./app/routing/onload-routes")(app);
require("./app/routing/day-routes")(app);


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
// ---------------------------------------------------

app.listen(PORT, function(err) {
    if (err) throw err
    console.log('connected on  ' + PORT)
})
})