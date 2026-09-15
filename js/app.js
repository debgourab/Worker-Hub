document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("[data-nav-links]");

  // Toggle the mobile navigation and keep its accessibility state in sync.
  if (toggle && links) {
    links.id = "primary-links";
    toggle.setAttribute("aria-controls", links.id);
    const closeMenu = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    };
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && links.classList.contains("open")) { closeMenu(); toggle.focus(); }
    });
    window.matchMedia("(max-width: 960px)").addEventListener("change", closeMenu);
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    // Close the mobile menu after selecting a navigation item.
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close the menu when the user taps outside the navigation area.
    document.addEventListener("click", (event) => {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
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
