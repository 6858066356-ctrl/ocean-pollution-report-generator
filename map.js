
// OPIRG - Interactive Pollution Maps

window.OPIRG = {
  selectedCoordinates: null
};

// Map for selecting pollution locations
const selectMap = L.map("selectMap").setView([13.7563, 100.5018], 6);

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(selectMap);

let selectedMarker = null;

// Allow users to click the map to select a location
selectMap.on("click", function(event) {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  window.OPIRG.selectedCoordinates = { lat, lng };

  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lng;

  document.getElementById("selectedLocation").textContent =
    `Selected coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;

  if (selectedMarker) {
    selectMap.removeLayer(selectedMarker);
  }

  selectedMarker = L.marker([lat, lng]).addTo(selectMap);
  selectedMarker.bindPopup("Selected pollution location").openPopup();
});

// Public map for approved pollution reports
const reportsMap = L.map("reportsMap").setView([13.7563, 100.5018], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(reportsMap);

// Expose the map so we can add database reports later
window.OPIRG.reportsMap = reportsMap;

window.OPIRG.addPublicMarker = function(report) {
  const marker = L.marker([
    report.latitude,
    report.longitude
  ]).addTo(reportsMap);

  marker.bindPopup(`
    <strong>${report.pollution_type}</strong><br>
    ${report.location_name}<br>
    Quantity: ${report.quantity}<br>
    <a href="#report-${report.id}">View report</a>
  `);
};
