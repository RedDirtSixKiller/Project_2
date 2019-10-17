// Initialize all of the LayerGroups we'll be using
var layers = {
  mm30_Day: new L.LayerGroup(),
  mm65_Day_E: new L.LayerGroup(),
  mm65_Day_G: new L.LayerGroup(),
  mm7_Day: new L.LayerGroup(),
  Broken_Lock: new L.LayerGroup(),
  Case_Reads: new L.LayerGroup(),
  Chng_Party_Read_Verify: new L.LayerGroup(),
  CTI_PT_Install: new L.LayerGroup(),
  CTM_DA_Inspection: new L.LayerGroup(),
  E_Start_Stop: new L.LayerGroup(),
  I_Test_8220: new L.LayerGroup(),
  I_Test_8750: new L.LayerGroup(),
  Meter_Connector: new L.LayerGroup(),
  New_Business: new L.LayerGroup(),
  Opt_Out: new L.LayerGroup(),
  Other: new L.LayerGroup(),
  Other_ERM2SM: new L.LayerGroup(),
  R_Test: new L.LayerGroup(),
  SM_Deployment: new L.LayerGroup(),
  SONP: new L.LayerGroup(),
  UG_Inspection: new L.LayerGroup()
};

var map = L.map("map", {
  center: [38.73, -121.0059],
  zoom: 8,
  layers: [
    layers.mm30_Day,
    layers.mm65_Day_E,
    layers.mm65_Day_G,
    layers.mm7_Day,
    layers.Broken_Lock,
    layers.Case_Reads,
    layers.Chng_Party_Read_Verify,
    layers.CTI_PT_Install,
    layers.CTM_DA_Inspection,
    layers.E_Start_Stop,
    layers.I_Test_8220,
    layers.I_Test_8750,
    layers.Meter_Connector,
    layers.New_Business,
    layers.Opt_Out,
    layers.Other,
    layers.Other_ERM2SM,
    layers.R_Test,
    layers.SM_Deployment,
    layers.SONP,
    layers.UG_Inspection
  ]
})

var overlays = {
  "mm30_Day": layers.mm30_Day,
  "mm65_Day_E": layers.mm65_Day_E,
  "mm65_Day_G": layers.mm65_Day_G,
  "mm7_Day": layers.mm7_Day,
  "Broken_Lock": layers.Broken_Lock,
  "Case_Reads":   layers.Case_Reads,
  "Chng_Party_Read_Verify": layers.Chng_Party_Read_Verify,
  "CTI_PT_Install": layers.CTI_PT_Install,
  "CTM_DA_Inspection": layers.CTM_DA_Inspection,
  "E_Start_Stop": layers.E_Start_Stop,
  "I_Test_8220": layers.I_Test_8220,
  "I_Test_8750": layers.I_Test_8750,
  "Meter_Connector": layers.Meter_Connector,
  "New_Business": layers.New_Business,
  "Opt_Out": layers.Opt_Out,
  "Other": layers.Other,
  "Other_ERM2SM": layers.Other_ERM2SM,
  "R_Test": layers.R_Test,
  "SM_Deployment": layers.SM_Deployment,
  "SONP": layers.SONP,
  "UG_Inspection": layers.UG_Inspection
  };

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
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





var queryUrl = 'http://localhost:5000/data'

d3.json(queryUrl, function (data) {
  // Once we get a response, db need to be converted to geojson
  var jsonFeatures = [];

  data.forEach(function (point) {
    var lat = point[12];
    var lon = point[13];

    var feature = {
      type: 'Feature',
      properties: point,
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      }
    };

    jsonFeatures.push(feature);
  })


  var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
  console.log(geoJson)
  L.geoJson(geoJson).addTo(map);
});