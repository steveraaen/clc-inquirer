#!/bin/bash

rm -rvf us
mkdir -p build us

if [ ! -f build/cb_2015_us_county_5m.shp ]; then
  curl -o build/cb_2015_us_county_5m.zip 'https://www2.census.gov/geo/tiger/GENZ2015/shp/cb_2015_us_county_5m.zip'
  unzip -od build build/cb_2015_us_county_5m.zip cb_2015_us_county_5m.shp cb_2015_us_county_5m.dbf
  chmod a-x build/cb_2015_us_county_5m.*
fi

geo2topo -q 1e5 -n counties=<( \
    shp2json -n build/cb_2015_us_county_5m.shp \
      | ndjson-filter '!/000$/.test(d.properties.GEOID)' \
      | ndjson-map '(d.id = d.properties.GEOID, delete d.properties, d)' \
      | geoproject -n 'd3.geoAlbersUsa().scale(1280).translate([480, 300])') \
  | toposimplify -f -p 0.25 \
  | topomerge states=counties -k 'd.id.slice(0, 2)' \
  | topomerge nation=states \
  > us/10m.json