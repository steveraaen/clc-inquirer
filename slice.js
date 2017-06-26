var signs = require('./nycpk.json');




ditchData = function (element) {
	console.log(element)
  return element ;
}



var newArray = signs.map(ditchData);



module.exports = signs;