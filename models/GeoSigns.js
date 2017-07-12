var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var ksignSchema = new Schema({});

var ksign = mongoose.model("ksign", ksignSchema);

module.exports = ksign;
