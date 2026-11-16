
// ========================================
// OPIRG - MAP RESTORATION
// ========================================

window.OPIRG = window.OPIRG || {};

window.OPIRG.reports = [];
window.OPIRG.markers = [];

// Check Leaflet
if (typeof L === "undefined") {
  console.error("Leaflet library is not loaded!");
  alert("Map library failed to load. Please check your internet connection.");
} else {

  // ========================================
  // 1. LOCATION SELECTION MAP
  // ========================================

  const selectMap = L.map("selectMap").setView(
    [13.7563, 100.5018],
    6
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }
  ).addTo(selectMap);

  let selectedMarker = null;

  selectMap.on("click", function(event) {

    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    window.OPIRG.selectedCoordinates = { lat, lng };

    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;

    document.getElementById("selectedLocation").textContent =
      "Selected coordinates: " +
      lat.toFixed(5) + ", " +
      lng.toFixed(5);

    if (selectedMarker) {
      selectMap.removeLayer(selectedMarker);
    }

    selectedMarker = L.marker([lat, lng])
      .addTo(selectMap)
      .bindPopup("Selected pollution location")
      .openPopup();

  });

  // ========================================
  // 2. PUBLIC POLLUTION MAP
  // ========================================

  const reportsMap = L.map("reportsMap").setView(
    [13.7563, 100.5018],
    6
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19
    }
  ).addTo(reportsMap);

  window.OPIRG.reportsMap = reportsMap;

  // ========================================
  // 3. ADD POLLUTION MARKERS
  // ========================================

  window.OPIRG.addPublicMarker = function(report) {

    const marker = L.marker([
      Number(report.latitude),
      Number(report.longitude)
    ]).addTo(reportsMap);

    const popup = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = report.pollution_type;

    const location = document.createElement("p");
    location.textContent = "Location: " + report.location_name;

    const quantity = document.createElement("p");
    quantity.textContent = "Quantity: " + report.quantity;

    popup.append(title, location, quantity);

    marker.bindPopup(popup);

    window.OPIRG.markers.push(marker);

    reportsMap.setView(
      [report.latitude, report.longitude],
      10
    );

    marker.openPopup();

    return marker;
  };

  // ========================================
  // 4. REFRESH MAP DISPLAY
  // ========================================

  window.addEventListener("load", function() {

    setTimeout(function() {
      selectMap.invalidateSize();
      reportsMap.invalidateSize();
    }, 500);

  });

  console.log("OPIRG maps successfully initialized!");

}
