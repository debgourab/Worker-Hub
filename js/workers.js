let allWorkers = [];

document.addEventListener("DOMContentLoaded", async () => {
  allWorkers = await getWorkers();
  if (document.querySelector("#worker-list")) setupWorkerListing();
  if (document.querySelector("#worker-detail")) renderWorkerDetail();
});

function setupWorkerListing() {
  const serviceFilter = document.querySelector("#service-filter");
  const locationFilter = document.querySelector("#location-filter");
  const params = new URLSearchParams(window.location.search);

  fillSelect(serviceFilter, uniqueValues("service"));
  fillSelect(locationFilter, uniqueValues("location"));

  if (params.get("service")) serviceFilter.value = params.get("service");
  if (params.get("location")) locationFilter.value = params.get("location");

  ["search-input", "service-filter", "location-filter", "rating-filter", "rate-filter", "sort-select"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("input", renderWorkerList);
  });

  document.querySelector("#clear-filters").addEventListener("click", () => {
    document.querySelector("#search-input").value = "";
    serviceFilter.value = "";
    locationFilter.value = "";
    document.querySelector("#rating-filter").value = "0";
    document.querySelector("#rate-filter").value = "1200";
    renderWorkerList();
  });

  renderWorkerList();
}

function uniqueValues(key) {
  return [...new Set(allWorkers.map((worker) => worker[key]))].sort();
}

function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function renderWorkerList() {
  const list = document.querySelector("#worker-list");
  const search = document.querySelector("#search-input").value.toLowerCase();
  const service = document.querySelector("#service-filter").value;
  const location = document.querySelector("#location-filter").value;
  const minRating = Number(document.querySelector("#rating-filter").value);
  const maxRate = Number(document.querySelector("#rate-filter").value);
  const sort = document.querySelector("#sort-select").value;

  document.querySelector("#rating-value").textContent = `${minRating}+`;
  document.querySelector("#rate-value").textContent = `₹${maxRate}`;

  const filtered = allWorkers
    .filter((worker) => {
      const haystack = `${worker.name} ${worker.service} ${worker.location}`.toLowerCase();
      return haystack.includes(search)
        && (!service || worker.service === service)
        && (!location || worker.location === location)
        && worker.rating >= minRating
        && worker.rate <= maxRate;
    })
    .sort((a, b) => {
      if (sort === "rate") return a.rate - b.rate;
      if (sort === "experience") return b.experience - a.experience;
      return b.rating - a.rating;
    });

  document.querySelector("#result-count").textContent = `${filtered.length} worker${filtered.length === 1 ? "" : "s"} found`;

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">No workers match these filters. Try widening the rate or rating range.</div>`;
    return;
  }

  list.innerHTML = filtered.map(workerCard).join("");
}

function workerCard(worker) {
  return `
    <article class="worker-card">
      <div class="worker-top">
        <img class="avatar" src="${worker.image}" alt="${worker.name}">
        <div>
          <h2>${worker.name}</h2>
          <p class="muted">${worker.service} in ${worker.location}</p>
          <div class="tag-row">
            <span class="tag">${worker.availability}</span>
            <span class="tag">Verified</span>
          </div>
        </div>
      </div>
      <div class="worker-meta">
        <div><span>Rating</span><strong>${worker.rating}</strong></div>
        <div><span>Rate</span><strong>₹${worker.rate}/hr</strong></div>
        <div><span>Experience</span><strong>${worker.experience} yrs</strong></div>
      </div>
      <div class="card-actions">
        <a class="btn btn-secondary" href="worker-details.html?id=${worker.id}">View Profile</a>
        <a class="btn" href="booking.html?id=${worker.id}">Book Now</a>
      </div>
    </article>
  `;
}

function renderWorkerDetail() {
  const root = document.querySelector("#worker-detail");
  const id = Number(new URLSearchParams(window.location.search).get("id") || "1");
  const worker = allWorkers.find((item) => item.id === id) || allWorkers[0];

  root.innerHTML = `
    <aside class="profile-panel">
      <img class="avatar" src="${worker.image}" alt="${worker.name}">
      <h2>${worker.name}</h2>
      <p class="muted">${worker.service} • ${worker.location}</p>
      <div class="worker-meta">
        <div><span>Rating</span><strong>${worker.rating}</strong></div>
        <div><span>Rate</span><strong>₹${worker.rate}/hr</strong></div>
        <div><span>Exp.</span><strong>${worker.experience} yrs</strong></div>
      </div>
      <a class="btn" href="booking.html?id=${worker.id}">Book ${worker.name.split(" ")[0]}</a>
    </aside>
    <section class="profile-content">
      <p class="eyebrow">Verified ${worker.service}</p>
      <h1>${worker.name}</h1>
      <p>${worker.bio}</p>
      <h2>Skills</h2>
      <div class="skill-list tag-row">${worker.skills.map((skill) => `<span class="tag">${skill}</span>`).join("")}</div>
      <h2>Recent reviews</h2>
      <div class="review-list">${worker.reviews.map((review) => `<blockquote>${review}</blockquote>`).join("")}</div>
    </section>
  `;
}
