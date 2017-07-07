var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GeoSignSchema = new Schema({},

{ collection: 'qsigns'});

var GeoSign = mongoose.model("GeoSign", GeoSignSchema);

module.exports = GeoSign;