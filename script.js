
// OPIRG - Pollution Report Form

const form = document.getElementById("pollutionForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const type = document.getElementById("type").value;
  const quantity = document.getElementById("quantity").value;
  const size = document.getElementById("size").value;
  const location = document.getElementById("location").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  // Get coordinates selected on the map
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (!latitude || !longitude) {
    alert("Please select the pollution location on the map first.");
    return;
  }

  // Create an observation summary
  const report = `
OCEAN POLLUTION OBSERVATION REPORT

Location: ${location}
Date: ${date}
Pollution Type: ${type}
Quantity: ${quantity}
Debris Size: ${size}

GPS COORDINATES
Latitude: ${latitude}
Longitude: ${longitude}

OBSERVATIONS
${notes || "No additional observations provided."}

ENVIRONMENTAL IMPACT
Your pollution observation has been recorded for reporting.

AI analysis will be added in the next development stage.

RECOMMENDATIONS
Environmental recommendations will be generated
after connecting the AI service.
`;

  document.getElementById("report").textContent = report;
  document.getElementById("result").hidden = false;

  document.getElementById("result").scrollIntoView({
    behavior: "smooth"
  });
});
