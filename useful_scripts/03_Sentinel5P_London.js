// You will need to import a London Shapefile and call it London_shp for this script to work
// blog here http://www.acgeospatial.co.uk/gee-sentinel-5p-fusion-tables/
Map.centerObject(London_shp)
Map.addLayer (London_shp)

var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2018-07-01', '2018-12-31');


var london_geo = London_shp.geometry()

print(ui.Chart.image.series(collection, london_geo, ee.Reducer.mean(), 30));

var val_max = 0.0002;
var val_min = 0;
var band_viz = {
  min: val_min,
  max: val_max,
  opacity: 1.0,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};

var london_mean = collection.mean()
Map.addLayer(london_mean, band_viz, 'no2 all')
