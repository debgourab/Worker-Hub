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
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
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

    saveStoredBooking(booking);
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
