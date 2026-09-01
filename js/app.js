document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("[data-nav-links]");

  // Toggle the mobile navigation and keep its accessibility state in sync.
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after selecting a navigation item.
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close the menu when the user taps outside the navigation area.
    document.addEventListener("click", (event) => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const homeSearch = document.querySelector("#home-search");
  if (homeSearch) {
    homeSearch.addEventListener("click", () => {
      const service = document.querySelector("#home-service").value;
      const location = document.querySelector("#home-location").value.trim();
      const params = new URLSearchParams();
      if (service) params.set("service", service);
      if (location) params.set("location", location);
      window.location.href = `workers.html?${params.toString()}`;
    });
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      contactForm.querySelector(".form-message").textContent = "Message sent. Our team will reply soon.";
      contactForm.reset();
    });
  }
});
