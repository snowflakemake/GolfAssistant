let map = L.map('map').setView([0, 0], 18);
let userMarker, targetMarker;
let userLatLng;

L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, {
  tileSize: 512,
  zoomOffset: -1,
  attribution: '© Mapbox © OpenStreetMap'
}).addTo(map);


// Show user location
navigator.geolocation.getCurrentPosition(
position => {
    const { latitude, longitude } = position.coords;
    userLatLng = L.latLng(latitude, longitude);
    userMarker = L.marker(userLatLng).addTo(map).bindPopup("You are here").openPopup();
    map.setView(userLatLng, 18);
},
() => {
    alert("Could not get your location.");
}
);

// Handle map click
map.on('click', function (e) {
  const targetLatLng = e.latlng;

  // Create or move the target pin
  if (targetMarker) {
    targetMarker.setLatLng(targetLatLng);
  } else {
    targetMarker = L.marker(targetLatLng, { draggable: true }).addTo(map);
  }

  // Calculate and display distance
  if (userLatLng) {
    const distance = userLatLng.distanceTo(targetLatLng); // meters
    const distanceYards = distance * 1.09361;

    document.getElementById("distance-box").innerText =
      `Distance: ${Math.round(distance)} meters (${Math.round(distanceYards)} yards)`;
  } else {
    document.getElementById("distance-box").innerText =
      "Waiting for GPS...";
  }
});

targetMarker.on('dragend', function () {
  const targetLatLng = targetMarker.getLatLng();
  if (userLatLng) {
    const distance = userLatLng.distanceTo(targetLatLng);
    const distanceYards = distance * 1.09361;

    document.getElementById("distance-box").innerText =
      `Distance: ${Math.round(distance)} meters (${Math.round(distanceYards)} yards)`;
  }
});
