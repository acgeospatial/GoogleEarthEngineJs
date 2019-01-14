// You will need to import a London Shapefile and call it London_shp for this script to work
Map.centerObject(London_shp)
Map.addLayer (London_shp)

print (London_shp)
print (London_shp.projection)

var london_geo = London_shp.geometry()

print (london_geo)

var london_buffer = london_geo.buffer(10)

print (london_buffer)

var london_shp_out = ee.FeatureCollection(london_buffer)