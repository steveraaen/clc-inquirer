var mongoose = require('mongoose');
var Sign = require('./Signs');

var Schema = mongoose.Schema;

var CodeSchema = new Schema({
	T: String,
	MUT: String
});

var Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
