var signs = require('./Parking_Regulation_Shapefile/pksigns.json');

var sweep = "SANITATION BROOM SYMBOL";


for(let i =  signs.features.length - 1;i > -1; i--) {


 delete signs.features[i].properties.OBJECTID;
 delete signs.features[i].properties.SG_SEQNO_N;
 delete signs.features[i].properties.SG_MUTCD_C;
 delete signs.features[i].properties.SG_SIGN_FC;
 delete signs.features[i].properties.SG_ORDER_N;
 delete signs.features[i].properties.SR_DIST;
 delete signs.features[i].properties.SG_ARROW_D;
 delete signs.features[i].properties.x;
 delete signs.features[i].properties.y;

 console.log(signs.features[i].properties)
	
}
console.log(signs)


module.exports = signs;