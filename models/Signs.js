var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SignSchema = new Schema({
	B: String,
	OID: Number,
	MUT: String,
	geometry: {
		type: String,
		coordinates: Array
	}
});

var Sign = mongoose.model("Sign", SignSchema);

module.exports = Sign;
