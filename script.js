
// ========================================
// OPIRG - OCEAN POLLUTION REPORT GENERATOR
// ========================================

const form = document.getElementById("pollutionForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form information
  const type = document.getElementById("type").value;
  const quantity = document.getElementById("quantity").value;
  const size = document.getElementById("size").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  const latitude = Number(document.getElementById("latitude").value);
  const longitude = Number(document.getElementById("longitude").value);

  // Check location
  if (!document.getElementById("latitude").value ||
      !document.getElementById("longitude").value) {
    alert("Please select a location on the map first!");
    return;
  }

  // Create report
  const report = {
    id: Date.now(),
    pollution_type: type,
    quantity: Number(quantity),
    debris_size: size,
    location_name: location,
    observed_on: date,
    description: notes,
    latitude: latitude,
    longitude: longitude
  };

  // Generate report text
  const reportText = `
OCEAN POLLUTION OBSERVATION REPORT

Location: ${location}
Date: ${date}

POLLUTION INFORMATION
Pollution Type: ${type}
Quantity: ${quantity}
Debris Size: ${size}

GPS COORDINATES
Latitude: ${latitude}
Longitude: ${longitude}

OBSERVATIONS
${notes || "No additional observations provided."}

ENVIRONMENTAL IMPACT
This observation records a potential marine pollution issue.
Further environmental analysis is required.

RECOMMENDATIONS
- Monitor the reported location.
- Document the pollution with photographs.
- Support appropriate cleanup activities.

REPORT STATUS
Successfully generated.
`;

  document.getElementById("report").textContent = reportText;
  document.getElementById("result").hidden = false;

  // ========================================
  // ADD MARKER TO PUBLIC MAP
  // ========================================

  if (!window.OPIRG || !window.OPIRG.reportsMap) {
    alert("Public map is not ready. Please refresh the website.");
    return;
  }

  const marker = L.marker([latitude, longitude])
    .addTo(window.OPIRG.reportsMap);

  marker.bindPopup(`
    <strong>${type}</strong><br>
    Location: ${location}<br>
    Quantity: ${quantity}<br>
    Date: ${date}
  `);

  // Move map to submitted location
  window.OPIRG.reportsMap.setView(
    [latitude, longitude],
    12
  );

  marker.openPopup();

  // ========================================
  // ADD REPORT CARD
  // ========================================

  const container = document.getElementById("publicReports");

  const emptyMessage = container.querySelector(".empty-message");

  if (emptyMessage) {
    emptyMessage.remove();
  }

  const card = document.createElement("article");
  card.className = "report-card";

  const heading = document.createElement("h3");
  heading.textContent = type;

  const locationInfo = document.createElement("p");
  locationInfo.textContent = "Location: " + location;

  const quantityInfo = document.createElement("p");
  quantityInfo.textContent = "Quantity: " + quantity;

  const dateInfo = document.createElement("p");
  dateInfo.textContent = "Date: " + date;

  const viewButton = document.createElement("button");
  viewButton.textContent = "View on Map";

  viewButton.addEventListener("click", function() {
    window.OPIRG.reportsMap.setView(
      [latitude, longitude],
      12
    );

    marker.openPopup();

    document.getElementById("public-map").scrollIntoView({
      behavior: "smooth"
    });
  });

  card.append(
    heading,
    locationInfo,
    quantityInfo,
    dateInfo,
    viewButton
  );

  container.prepend(card);

  // Save reports during the current page session
  if (!window.OPIRG.reports) {
    window.OPIRG.reports = [];
  }

  window.OPIRG.reports.push(report);

  // Show success message
  alert("Your pollution report has been added to the public map!");

  // Reset form
  form.reset();

  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";

  document.getElementById("selectedLocation").textContent =
    "No location selected yet.";

  window.OPIRG.selectedCoordinates = null;

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });

});
