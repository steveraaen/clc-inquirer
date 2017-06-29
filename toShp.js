var shapefile = require("shapefile");
var fs = require("fs");

var trimArr = [];
shapefile.open("./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp")
    .then(source => source.read()
        .then(function log(result) {
            if (result.done && result.value.properties.OBJECTID.match(/SANITATION BROOM SYMBOL/g)) return;

            delete result.value.properties.OBJECTID;
            delete result.value.properties.SG_SEQNO_N;
            delete result.value.properties.SG_MUTCD_C;
            delete result.value.properties.SG_SIGN_FC;
            delete result.value.properties.SG_ORDER_N;
            delete result.value.properties.SR_DIST;
            delete result.value.properties.SG_ARROW_D;
            delete result.value.properties.x;
            delete result.value.properties.y;

            var trimProps = result.value.properties
            var trimGeo = result.value.geometry
            console.log(trimProps)
            return source.read().then(log);

        }))


.catch(error => console.error(error.stack));
