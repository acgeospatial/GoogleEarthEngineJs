var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',25))
.select(['B3', 'B2', 'B1'])
.filterBounds(geometry)

var L7coll = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',25))
.select(['B3', 'B2', 'B1'])
.filterBounds(geometry)
.map(function(image){
  var filled1a = image.focal_mean(2, 'square', 'pixels', 1)
  return filled1a.blend(image);
})

var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',5))
.filterBounds(geometry)
.map(function(image){
  return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']);
})
.select(['B3', 'B2', 'B1']);

var collection_merge = ee.ImageCollection(L5coll.merge(L7coll.merge(L8coll)));
print (collection_merge)


var years = ee.List.sequence(1984, 2018)
//print (years)

var collectYear = ee.ImageCollection(years
  .map(function(y) {
    var start = ee.Date.fromYMD(y, 1, 1)
    var end = start.advance(12, 'month');
    return collection_merge.filterDate(start, end).reduce(ee.Reducer.median())
    
}))

//print (collectYear)

// count number of bands in each image, if 0 remove from image collection
var nullimages = collectYear
    .map(function(image) {
      return image.set('count', image.bandNames().length())
    })
    .filter(ee.Filter.eq('count', 3))
print(nullimages)


var finalCollection = nullimages.map(function(image){
  return image.visualize({bands: ['B3_median', 'B2_median', 'B1_median'], min: 300, max: 1800});

})

// Export (change dimensions or scale for higher quality).
Export.video.toDrive({
  collection: finalCollection,
  description: 'yearly',
  dimensions: 1080,
  framesPerSecond: 1,
  region: geometry
});

//var median_old = collection.first()
//Map.addLayer(median_old, {bands: ['B3', 'B2', 'B1'], min: 300, max: 1800}, 'first image');

var median_1987 = finalCollection.first()
Map.addLayer(median_1987, {bands: ['vis-red', 'vis-green', 'vis-blue']}, 'first image7');

// Visualization and animation parameters.
var params = {
  framesPerSecond: 8,
  region: geometry,
  dimensions: 512,
};

// Display the animation in the console.
print(ui.Thumbnail(finalCollection, params))
