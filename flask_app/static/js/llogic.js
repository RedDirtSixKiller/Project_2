var points = [{
    "latitud": 43.526523590087891,
    "longitud": -5.6150951385498047
}, {
    "latitud": 43.511680603027344,
    "longitud": -5.6671133041381836
},
// 
// More Lat-Lng Points
// 
{
    "latitud": 43.526451110839844,
    "longitud": -5.6140098571777344
}];

for (var i in points) {
var latlng = L.latLng({ lat: points[i].latitud, lng: points[i].longitud });

L.marker( latlng ).addTo(map);
}