// import 3 feature collections called geometry, geometry2, geometry3
// script here
// https://code.earthengine.google.com/57104652bbf6906e8ffd5391093782fa

// or you could convert to a feature collection?
//var geometry_f = ee.FeatureCollection(geometry)
//var geometry_f2 = ee.FeatureCollection(geometry2)
//var geometry_f2 = ee.FeatureCollection(geometry3)


Map.centerObject(geometry, 11)

// merge your features
var merge = geometry.merge(geometry2).merge(geometry3);

// function to calculate area
var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area().divide(100 * 100)});
};


// Map the area getting function over the FeatureCollection.
var areaAdded = merge.map(addArea);



print (areaAdded)
