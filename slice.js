var signs = require('./Parking_Regulation_Shapefile/pksigns.json');



console.log(typeof(signs.features[0].properties))
console.log(Array.isArray(signs.features))

module.exports = signs;