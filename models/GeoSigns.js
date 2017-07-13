var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ksignSchema = new Schema({});




ksignSchema.index({geometry: "2dsphere"});
var ksign = mongoose.model("ksign", ksignSchema);

module.exports = ksign;
