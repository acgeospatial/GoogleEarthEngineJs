// simple unsupervised classification

// make sure you define an AOI!

// basic filtering
var collectionSentinel = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(AOI)
  .filterDate('2017-01-01', '2017-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));

var input = ee.Image(collectionSentinel.median());

var training = input.sample({
    region: AOI,
    scale: 30,
    numPixels: 5000})
var clusterer = ee.Clusterer.wekaKMeans(8).train(training)
var result = input.cluster(clusterer);



Map.addLayer(result.randomVisualizer())
