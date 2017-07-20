var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var xsignSchema = new Schema({});

var xsign = mongoose.model("xsign", xsignSchema);

module.exports = xsign;