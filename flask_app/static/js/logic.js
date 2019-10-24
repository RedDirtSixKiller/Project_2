// Initialize all of the LayerGroups we'll be using
var layers = {
  MMP: new L.LayerGroup(),
  MST: new L.LayerGroup(),
};

var map = L.map("map", {
  center: [38.73, -121.0059],
  zoom: 8,
  layers: [
    layers.MMP,
    layers.MST
  ]
})

var overlays = {
  "MMP": layers.MMP,
  "MST": layers.MST
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function () {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);


var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

//Set the url for the local json file
var queryUrl = 'http://localhost:5000/data'

//Get the data from the URL (i.e. localhost data)
d3.json(queryUrl, function (data) {
  // Once we get a response, db need to be converted to geojson
  var jsonFeatures = [];

  data.forEach(function (point) {
    var lat = point[12];
    var lon = point[13];

    var feature = {//cycle through the local dataset into a geoJson format
      type: 'Feature',
      properties: point,
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      }
    };

    jsonFeatures.push(feature);

  })


  //this puts the marker on the map from the geoJson formatted object
  var geoJson = { type: 'FeatureCollection', features: jsonFeatures };

  //console.log(geoJson.features)
  //console.log(geoJson.features[0].properties[0])


  //marker.bindpopup(geoJson.features[0].properties[0])
  //L.geoJson(geoJson).addTo(map);
  var icons = {
    MMP: L.icon({
      iconUrl: 'static/img/MMP2.png',
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
      popupAnchor: [5, 5] // point from which the popup should open relative to the iconAnchor
    }),
    MST: L.icon({
      iconUrl: 'static/img/MST2.png',
      iconSize: [10, 10], // size of the icon
      iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
      popupAnchor: [5, 5] // point from which the popup should open relative to the iconAnchor
    })
  }
  var markers = L.markerClusterGroup()

  var layerGroup = L.geoJSON(geoJson, {
    onEachFeature: function (feature, layer) {
      if (layer instanceof L.Marker) {
        layer.setIcon(icons[feature.properties[20]])
      }

      layer.bindPopup(
        '<p>FO_ID: ' + feature.properties[0] + '</p>' +
        '<p>Div: ' + feature.properties[10] + '</p>' +
        '<p>Work Type: ' + feature.properties[22] + '</p>' +
        '<p>Resource: ' + feature.properties[20] + '</p>'
      );
    }
    
  })//.addTo(map);
  markers.addLayer(layerGroup);
  map.addLayer(markers);
  map.fitBounds(markers.getBounds())
});


//Time for some charts
// Trace1 for skill break down
var trace_MMP = {
  x: ['Ele', 'Gas'],
  y: [9968, 13332],
  text: ['MMP'],
  name: "MMP",
  type: "bar"
};
var trace_MST = {
  x: ['Ele','Gas'],
  y: [3691, 0],
  text: ['MST'],
  name: "MST",
  type: "bar"
};
var data = [trace_MMP, trace_MST]
var layout = {
  title: "Count of Orders by Skill",
  barmode: "stack"

};
Plotly.newPlot("charts", data, layout);

