document.getElementById("pollutionForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const type = document.getElementById("type").value;
    const quantity = document.getElementById("quantity").value;
    const size = document.getElementById("size").value;
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    const report = `
OCEAN POLLUTION OBSERVATION REPORT

Location: ${location}
Date: ${date}
Pollution Type: ${type}
Quantity: ${quantity}
Debris Size: ${size}

OBSERVATIONS
${notes || "No additional observations provided."}

ENVIRONMENTAL IMPACT
AI analysis will appear here after connecting an AI API.

RECOMMENDATIONS
AI-generated recommendations will appear here.
`;

    document.getElementById("report").textContent = report;
    document.getElementById("result").hidden = false;
  });
