/* GSO Executive Overview - Interactive Demo */

// Sample data for testing only.

// These numbers are NOT actual GSO performance data.
const demoData = [
  { date: "Oct 1", visitors: 1250, clicks: 320, tickets: 175, opens: 410, sent: 1000, campaign: "fall", webpage: "home", trafficSource: "social", email: "newsletter" },
  { date: "Oct 2", visitors: 1480, clicks: 390, tickets: 210, opens: 450, sent: 1000, campaign: "fall", webpage: "events", trafficSource: "search", email: "promotion" },
  { date: "Oct 3", visitors: 1620, clicks: 420, tickets: 245, opens: 430, sent: 1000, campaign: "holiday", webpage: "tickets", trafficSource: "email", email: "reminder" },
  { date: "Oct 4", visitors: 1390, clicks: 350, tickets: 195, opens: 390, sent: 1000, campaign: "community", webpage: "home", trafficSource: "direct", email: "newsletter" },
  { date: "Oct 5", visitors: 1780, clicks: 470, tickets: 280, opens: 480, sent: 1000, campaign: "fall", webpage: "events", trafficSource: "social", email: "promotion" },
  { date: "Oct 6", visitors: 1510, clicks: 410, tickets: 230, opens: 440, sent: 1000, campaign: "holiday", webpage: "tickets", trafficSource: "search", email: "reminder" },
  { date: "Oct 7", visitors: 1920, clicks: 520, tickets: 315, opens: 510, sent: 1000, campaign: "community", webpage: "home", trafficSource: "email", email: "newsletter" }
];
let visitorChart;
function updateDashboard() {
  const campaign = document.getElementById("campaign").value;
  const webpage = document.getElementById("webpage").value;
  const traffic = document.getElementById("trafficSource").value;
  const email = document.getElementById("email").value;
  const dateRange = document.getElementById("dateRange").value;
  let filtered = demoData.filter(row =>
    (campaign === "all" || row.campaign === campaign) &&
    (webpage === "all" || row.webpage === webpage) &&
    (traffic === "all" || row.trafficSource === traffic) &&
    (email === "all" || row.email === email)
  );
  // The demo currently contains seven reporting days.
  if (dateRange !== "all") {
    filtered = filtered.slice(-Number(dateRange));
  }
  const total = key =>
    filtered.reduce((sum, row) => sum + row[key], 0);
  const visitors = total("visitors");
  const clicks = total("clicks");
  const tickets = total("tickets");
  const sent = total("sent");
  const opens = total("opens");
  const openRate = sent ? (opens / sent) * 100 : 0;
  document.getElementById("visitors").textContent =
    visitors.toLocaleString();
  document.getElementById("emailRate").textContent =
    openRate.toFixed(1) + "%";
  document.getElementById("ticketClicks").textContent =
    clicks.toLocaleString();
  document.getElementById("ticketsSold").textContent =
    tickets.toLocaleString();
  visitorChart.data.labels = filtered.map(row => row.date);
  visitorChart.data.datasets[0].data =
    filtered.map(row => row.visitors);
  visitorChart.update();
  const takeaways = document.querySelector(".takeaways p");
  if (filtered.length === 0) {
    takeaways.textContent =
      "No sample records match these filters. Try another selection.";
  } else {
    takeaways.textContent =
      `During the selected reporting period, the website received ${visitors.toLocaleString()} visitors, generated ${clicks.toLocaleString()} ticket-page clicks, and recorded ${tickets.toLocaleString()} tickets sold. The email open rate was ${openRate.toFixed(1)}%. All figures are demonstration data.`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("visitorChart");
  if (typeof Chart === "undefined") {
    document.querySelector(".chart-container").insertAdjacentText(
      "beforeend",
      "Chart library unavailable. Check your internet connection."
    );
    return;
  }
  visitorChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: demoData.map(row => row.date),
      datasets: [{
        label: "Website Visitors",
        data: demoData.map(row => row.visitors),
        borderColor: "#38784c",
        backgroundColor: "rgba(56,120,76,0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointBackgroundColor: "#e9a05e"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  document.querySelectorAll(".filters select").forEach(select => {
    select.addEventListener("change", updateDashboard);
  });
  updateDashboard();
});
