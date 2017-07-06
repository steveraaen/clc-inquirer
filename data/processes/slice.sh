
  # include geoprojection
  geoproject 'd3.geoConicEqualArea().parallels([-73.93, 40.73]).rotate([120, 0]).fitSize([960, 960], d)' < bkbrooms.json > bkbrooms-albers.json

# generate svg
  geo2svg -w 960 -h 960 < bkbrooms-albers.json > bkbrooms-albers.svg

# generate topojson
geo2topo -n tracts=bkbrooms.ndjson > bkbrooms-topo.json

# shrink topo
toposimplify -p 1 -f < bkbrooms-topo.json > bkbrooms-simple-topo.json

# quantize to shrink further
topoquantize 1e5 < bkbrooms-simple-topo.json  > bkbrooms-quantized-topo.json

# Step 1: convert to ndjson and filter out all non street sweeping signs
# ----Initial reduction includes boro, objectid, order no, MUTCD code, sign text and location (375,408 lines | 84.72mb)
shp2json -n ./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp | ndjson-map '{"type": "Feature", "properties": {"B": d.properties.SG_KEY_BOR, "ID": d.properties.OBJECTID, "O": d.properties.SG_ORDER_N, "MUT": d.properties.SG_MUTCD_C, "T": d.properties.SIGNDESC1}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}'   > allSigns.ndjson
# ----Since nulls interfere with matching Broom strings, get rid of sign text === nulls (374,584 lines | 84.58mb)
ndjson-filter < allSigns.ndjson 'd.properties.T != null' > allSignsNoNull.ndjson
# ----Filter out signs that don't have the word "BROOM" in the sign's text (193,188 lines | 45.75mb)
ndjson-filter < allSignsNoNull.ndjson 'd.properties.T.includes("BROOM")' > justBrooms.ndjson

# Step 2: find and trim text of each distinct MUTCD code, and load to mongo
# --------------Prepare table of MUTCD (sign definition codes) to sign text
ndjson-map < justBrooms.ndjson '{"T": d.properties.T, "MUT": d.properties.MUT}' > signCode.ndjson
# --------------Dedupe sign code/text file
gawk < signCode.ndjson '!seen[$0]++' > signSet.ndjson
# --------------Trim down some un-needed text (810 lines | .07mb)
gawk < signSet.ndjson '{gsub("SANITATION BROOM SYMBOL", "");print}' > setTr1.ndjson
gawk < setTr1.ndjson '{gsub("NO PARKING", "");print}' > setTr2.ndjson
gawk < setTr2.ndjson '{gsub("NIGHT REGULATION", "");print}' > setTr3.ndjson
# mongo cli import
mongoimport -h ds143362.mlab.com:43362 -d signs -c codes -u ***** -p ***** --file setTr3.ndjson 

# Step 3: Create new file with all signs borough, OBJECTID, MUTCD and geometry (193,188 lines | 23.53mb)
ndjson-map < justBrooms.ndjson '{"B": d.properties.B, "OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signData.ndjson
mongoimport -h ds143362.mlab.com:43362 -d signs -c signs -u ***** -p ***** --file signData.ndjson 





