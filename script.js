
// OPIRG - Pollution Report Generator

const form = document.getElementById("pollutionForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const type = document.getElementById("type").value;
  const quantity = document.getElementById("quantity").value;
  const size = document.getElementById("size").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (!latitude || !longitude) {
    alert("Please select a location on the map.");
    return;
  }

  const report = {
    id: Date.now(),
    pollution_type: type,
    quantity: Number(quantity),
    debris_size: size,
    location_name: location,
    observed_on: date,
    description: notes,
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  // Generate observation report
  const reportText = `
OCEAN POLLUTION OBSERVATION REPORT

Location: ${location}
Date: ${date}

POLLUTION INFORMATION
Type: ${type}
Quantity: ${quantity}
Debris Size: ${size}

GPS COORDINATES
Latitude: ${latitude}
Longitude: ${longitude}

OBSERVATIONS
${notes || "No additional observations provided."}

ENVIRONMENTAL IMPACT
AI analysis will be added after connecting the AI service.

RECOMMENDATIONS
Research-supported recommendations will be added
in the next development stage.

REPORT STATUS
Demonstration report.
`;

  document.getElementById("report").textContent = reportText;
  document.getElementById("result").hidden = false;

  // Add marker to public map
  const marker = window.OPIRG.addPublicMarker(report);

  // Add report card
  const container = document.getElementById("publicReports");

  const emptyMessage = container.querySelector(".empty-message");
  if (emptyMessage) emptyMessage.remove();

  const card = document.createElement("article");
  card.className = "report-card";

  const title = document.createElement("h3");
  title.textContent = type;

  const locationText = document.createElement("p");
  locationText.textContent = "Location: " + location;

  const quantityText = document.createElement("p");
  quantityText.textContent = "Quantity: " + quantity;

  const dateText = document.createElement("p");
  dateText.textContent = "Date: " + date;

  const viewButton = document.createElement("button");
  viewButton.textContent = "View on Map";

  viewButton.onclick = function() {
    window.OPIRG.reportsMap.setView(
      [report.latitude, report.longitude], 12
    );
    marker.openPopup();
  };

  card.append(title, locationText, quantityText, dateText, viewButton);
  container.prepend(card);

  // Save in current browser session
  window.OPIRG.reports.push(report);

  // Clear form
  form.reset();

  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
  document.getElementById("selectedLocation").textContent =
    "No location selected yet.";

  alert("Your report has been generated successfully!");

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
});
