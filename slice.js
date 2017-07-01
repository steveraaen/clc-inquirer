
//shp to ndjson
shp2json -n ./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp | ndjson-map '{"type": "Feature", "properties": {"SG_KEY_BOR": d.properties.SG_KEY_BOR, "SIGNDESC1": d.properties.SIGNDESC1}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > reduced.json

// ndjson to geojson
ndjson-reduce \
  < sweepsigns.ndjson \
  | ndjson-map '{type: "FeatureCollection", features: d}' \
  > sweepsigns.json