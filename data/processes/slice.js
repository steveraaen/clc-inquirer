// url for shapefile of all no parking signs in nyc
"http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/Parking_Regulation_Shapefile.zip"

//shp to ndjson, exluding unwanted properties. Only keeping boro, text and coords
shp2json -n ./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp | ndjson-map '{"type": "Feature", "properties": {"SG_KEY_BOR": d.properties.SG_KEY_BOR, "SIGNDESC1": d.properties.SIGNDESC1}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' | ndjson-filter 'd.properties.SG_KEY_BOR === "K"' |ndjson-filter 'd.properties.SIGNDESC1 != null' | ndjson-filter 'd.properties.SIGNDESC1.includes("BROOM")' > bkbrooms.ndjson



// ndjson to geojson
ndjson-reduce \
  < bkbrooms.ndjson \
  | ndjson-map '{type: "FeatureCollection", features: d}' \
  > bkbrooms.json

mongoimport -h ds143362.mlab.com:43362 -d signs -c bkpksigns -u steve -p felisa --file bkbrooms.json 
  // include geoprojection
  geoproject 'd3.geoConicEqualArea().parallels([-73.93, 40.73]).rotate([120, 0]).fitSize([960, 960], d)' < bkbrooms.json > bkbrooms-albers.json

// generate svg
  geo2svg -w 960 -h 960 < sweepsigns-albers.json > sweepsigns-albers.svg

// generate topojson
geo2topo -n tracts=sweepsigns.json > sweepsigns-topo.json

// shrink topo
toposimplify -p 1 -f < sweepsigns-topo.json > sweepsigns-simple-topo.json

// quantize to shrink further
topoquantize 1e5 < sweepsigns-simple-topo.json  > sweepsigns-quantized-topo.json






