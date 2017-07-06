var mongoose = require('mongoose');
var Sign = require('./Signs');

var Schema = mongoose.Schema;

var CodeSchema = new Schema({
	T: String,
	MUT: String,
	SIGNS:[{type: Schema.Types.String, ref: Sign}]
});

var Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
