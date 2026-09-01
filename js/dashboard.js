document.addEventListener("DOMContentLoaded", async () => {
  if (document.querySelector("#customer-bookings")) renderCustomerDashboard(await getWorkers());
  if (document.querySelector("#worker-jobs")) renderWorkerDashboard();

  const availability = document.querySelector("#availability-toggle");
  if (availability) {
    availability.addEventListener("click", () => {
      availability.textContent = availability.textContent.includes("Available") ? "Unavailable Today" : "Available Today";
      availability.classList.toggle("btn-secondary");
    });
  }
});

function renderCustomerDashboard(workers) {
  const stored = getStoredBookings();
  const demoBookings = [
    { workerName: "Joy Baidya", service: "Electrician", date: "2026-06-20", time: "10:30", status: "Confirmed" },
    { workerName: "Dhabali Mondal", service: "Cleaner", date: "2026-06-22", time: "09:00", status: "Pending confirmation" }
  ];
  const bookings = stored.length ? stored : demoBookings;

  document.querySelector("#customer-bookings").innerHTML = `<div class="job-list">${bookings.map((booking) => `
    <article class="job-card">
      <span class="status">${booking.status}</span>
      <strong>${booking.service} with ${booking.workerName}</strong>
      <span class="muted">${booking.date} at ${booking.time}</span>
    </article>
  `).join("")}</div>`;

  document.querySelector("#recommended-workers").innerHTML = workers.slice(0, 3).map((worker) => `
    <a class="mini-worker" href="worker-details.html?id=${worker.id}">
      <img src="${worker.image}" alt="${worker.name}">
      <span><strong>${worker.name}</strong><br><span class="muted">${worker.service} • ${worker.rating}</span></span>
    </a>
  `).join("");
}

function renderWorkerDashboard() {
  const jobs = [
    { customer: "Deep Das ", service: "Switchboard repair", area: "Deganga", status: "New request" },
    { customer: "Rakesh Sarkar", service: "Fan installation", area: "Barasat", status: "Scheduled" },
    { customer: "Ajay Baidya", service: "Lighting check", area: "Rajarhat", status: "Awaiting details" }
  ];

  document.querySelector("#worker-jobs").innerHTML = `<div class="job-list">${jobs.map((job) => `
    <article class="job-card">
      <span class="status">${job.status}</span>
      <strong>${job.service}</strong>
      <span class="muted">${job.customer} • ${job.area}</span>
      <div class="card-actions">
        <button class="btn btn-small" type="button">Accept</button>
        <button class="btn btn-small btn-secondary" type="button">Message</button>
      </div>
    </article>
  `).join("")}</div>`;
}
