var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SignSchema = new Schema({
	properties: {},
	geometry: {}
});

var Sign = mongoose.model("Sign", SignSchema);

module.exports = Sign;
