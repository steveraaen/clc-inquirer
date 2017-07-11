var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hoodsSchema = new Schema({});

var hoods = mongoose.model("hoods", hoodsSchema);

module.exports = hoods;
