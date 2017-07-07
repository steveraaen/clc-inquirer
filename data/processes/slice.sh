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
ndjson-reduce < signData.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > signData.json

ndjson-filter < justBrooms.ndjson 'd.properties.B == "S"' | ndjson-map  '{"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signDataS.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "M"' | ndjson-map  '{"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signDataM.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "B"' | ndjson-map  '{"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signDataX.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "K"' | ndjson-map  '{"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signDataK.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "Q"' | ndjson-map  '{"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signDataQ.ndjson


mongoimport -h ds143362.mlab.com:43362 -d signs -c qsigns -u ***** -p ***** --file signDataQ.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c ksigns -u ***** -p ***** --file signDataK.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c ssigns -u ***** -p ***** --file signDataS.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c xsigns -u ***** -p ***** --file signDataX.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c msigns -u ***** -p ***** --file signDataM.ndjson 

mongoimport -h ds143362.mlab.com:43362 -d signs -c allsigns -u steve -p felisa --file justBrooms.ndjson 





