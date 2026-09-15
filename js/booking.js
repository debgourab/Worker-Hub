document.addEventListener("DOMContentLoaded", async () => {
  const workers = await getWorkers();
  const params = new URLSearchParams(window.location.search);
  const worker = workers.find((item) => item.id === Number(params.get("id")));
  const form = document.querySelector("#booking-form");

  if (!worker) {
    form.innerHTML = `<h2>Choose a worker first</h2><a class="btn" href="workers.html">Browse workers</a>`;
    return;
  }
  document.querySelector("#worker-id").value = worker.id;
  document.querySelector("#worker-name").value = worker.name;
  document.querySelector("#service-name").value = worker.service;

  const dateInput = document.querySelector("#job-date");
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector("#booking-message");
    const fields = ["customer-name", "customer-phone", "job-address", "job-details"];
    if (fields.some((id) => !document.getElementById(id).value.trim())) {
      message.textContent = "Please complete every field with more than spaces."; return;
    }
    const scheduled = new Date(`${dateInput.value}T${document.querySelector("#job-time").value}`);
    if (!Number.isFinite(scheduled.getTime()) || scheduled <= new Date()) {
      message.textContent = "Choose a future date and time."; return;
    }
    const phone = document.querySelector("#customer-phone").value.replace(/[\s()+-]/g, "");
    if (!/^\d{10,15}$/.test(phone)) { message.textContent = "Enter a phone number with 10 to 15 digits."; return; }
    const booking = {
      id: Date.now(),
      workerId: worker.id,
      workerName: worker.name,
      service: worker.service,
      customerName: document.querySelector("#customer-name").value,
      phone: document.querySelector("#customer-phone").value,
      address: document.querySelector("#job-address").value,
      date: document.querySelector("#job-date").value,
      time: document.querySelector("#job-time").value,
      details: document.querySelector("#job-details").value,
      status: "Pending confirmation"
    };

    if (!saveStoredBooking(booking)) {
      message.textContent = "Booking could not be saved. Enable browser storage or free some space and retry.";
      return;
    }
    document.querySelector("#booking-message").textContent = "Booking request saved. Check your customer dashboard for status.";
    form.reset();
    if (!worker) {
    form.innerHTML = `<h2>Choose a worker first</h2><a class="btn" href="workers.html">Browse workers</a>`;
    return;
  }
  document.querySelector("#worker-id").value = worker.id;
    document.querySelector("#worker-name").value = worker.name;
    document.querySelector("#service-name").value = worker.service;
  });
});
