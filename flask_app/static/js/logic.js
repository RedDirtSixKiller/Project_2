var map = L.map('map',{
}).setView([38.51, -121.55], 8);

//initialize the map
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);



var queryUrl = 'http://localhost:5000/data'

d3.json(queryUrl, function(data) {
    // Once we get a response, db need to be converted to geojson
    var jsonFeatures = [];
  
  data.forEach(function(point){
      var lat = point[12];
      var lon = point[13];
  
      var feature = {type: 'Feature',
          properties: point,
          geometry: {
              type: 'Point',
              coordinates: [lon,lat]
          }
      };

      jsonFeatures.push(feature);
  })


  var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
  console.log(geoJson)
  L.geoJson(geoJson).addTo(map);
});