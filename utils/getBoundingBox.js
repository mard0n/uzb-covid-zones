function getBoundingBox(geometry) {
  var bounds = {},
    coordinates,
    point,
    latitude,
    longitude;
  // Loop through each "feature"
  // for (let i = 0; i < data.length; i++) {
  coordinates = geometry.coordinates;
  if (coordinates.length === 1) {
    // It's only a single Polygon
    // For each individual coordinate in this feature's coordinates...
    for (var j = 0; j < coordinates[0].length; j++) {
      longitude = coordinates[0][j][0];
      latitude = coordinates[0][j][1];

      // Update the bounds recursively by comparing the current xMin/maxLng and minLat/maxLat with the current coordinate
      bounds.minLng = bounds.minLng < longitude ? bounds.minLng : longitude;
      bounds.maxLng = bounds.maxLng > longitude ? bounds.maxLng : longitude;
      bounds.minLat = bounds.minLat < latitude ? bounds.minLat : latitude;
      bounds.maxLat = bounds.maxLat > latitude ? bounds.maxLat : latitude;
    }
  } else {
    // It's a MultiPolygon
    // Loop through each coordinate set
    for (var j = 0; j < coordinates.length; j++) {
      // For each individual coordinate in this coordinate set...
      for (var k = 0; k < coordinates[j].length; k++) {
        longitude = coordinates[j][k][0];
        latitude = coordinates[j][k][1];

        // Update the bounds recursively by comparing the current minLng/maxLng and minLat/maxLat with the current coordinate
        bounds.minLng = bounds.minLng < longitude ? bounds.minLng : longitude;
        bounds.maxLng = bounds.maxLng > longitude ? bounds.maxLng : longitude;
        bounds.minLat = bounds.minLat < latitude ? bounds.minLat : latitude;
        bounds.maxLat = bounds.maxLat > latitude ? bounds.maxLat : latitude;
      }
    }
  }

  // Returns an object that contains the bounds of this GeoJSON data.
  // The keys describe a box formed by the northwest (minLng, minLat) and southeast (maxLng, maxLat) coordinates.
  // [[minlat,minlng],[maxlat,maxlng]]
  return [bounds.minLat, bounds.maxLat, bounds.minLng, bounds.maxLng];
}

module.exports = getBoundingBox;
