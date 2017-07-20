var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var allsignSchema = new Schema({});

var allsign = mongoose.model("allsign", allsignSchema);

module.exports = allsign;