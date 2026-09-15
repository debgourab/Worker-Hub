# Worker Hub

A responsive local-services marketplace frontend built with **HTML5, CSS3 and JavaScript ES6+**. Users can discover workers, compare profiles and save sample booking requests in their browser.

**Author:** [Deb Gourab Biswas](https://github.com/debgourab)  
**Repository:** [debgourab/Worker-Hub](https://github.com/debgourab/Worker-Hub)

## Features

- Search by service, location and availability; filter by rating and hourly rate.
- Sort workers by rating, price or experience and inspect skills and reviews.
- Validate booking details and future date/time before saving to localStorage.
- View saved requests in the customer dashboard and explore a sample worker dashboard.
- Responsive layouts, keyboard navigation, skip links and reduced-motion support.
- Local JSON data with fallback profiles when the data request fails.
- Automated syntax, data, image-path and internal-link checks in GitHub Actions.

## Run locally

```bash
git clone https://github.com/debgourab/Worker-Hub.git
cd Worker-Hub
code .
```

In VS Code, install **Live Server**, then right-click `index.html` and choose **Open with Live Server**. Serve the repository root so JSON requests and relative assets resolve correctly. No npm install or build step is required.

Alternatively, with Python installed:

```bash
python -m http.server 5500
```

Open [localhost:5500](http://localhost:5500).

## Demo walkthrough

1. Select a service and availability on the home page and search.
2. Adjust filters, compare rates in ₹, and open a worker profile.
3. Choose **Book Now** and enter sample details with a future date and time.
4. Open **Customer Dashboard** to see the request; reload to confirm persistence.
5. Explore the worker dashboard, contact and account screens as UI demonstrations.

## Project structure

```text
Worker-Hub/
├── index.html                 # Landing page and search
├── workers.html               # Filtering and sorting
├── worker-details.html        # Selected worker profile
├── booking.html               # Booking form
├── customer-dashboard.html    # Saved requests
├── worker-dashboard.html      # Sample worker workspace
├── login.html / register.html # Demo account screens
├── about.html / contact.html  # Information and demo contact form
├── css/                       # Shared, worker, dashboard and responsive styles
├── js/                        # UI, data, booking and escaping helpers
├── data/workers.json          # Primary sample worker dataset
├── assets/                    # Local images and icons
├── scripts/check.mjs          # Dependency-free validation
└── .github/workflows/check.yml
```

## Implementation highlights

The project demonstrates DOM events, async/await, Fetch, URLSearchParams, array filtering/sorting, form validation, CSS Grid/Flexbox and browser persistence. Booking text is escaped before dashboard HTML rendering, and failed storage writes show a retry message without clearing the form.

Edit `data/workers.json` for profiles and keep the fallback dataset in `js/data.js` aligned. Global colors and typography are in `css/style.css`; breakpoint rules are in `css/responsive.css`.

## Validation

With Node.js 22 or newer:

```bash
node scripts/check.mjs
```

Manually check mobile navigation with Escape, keyboard-only form submission, empty search results, invalid worker IDs, past booking times and persistence after reload. Automated checks cover static correctness; they do not replace browser or accessibility testing.

## Scope and limitations

This is a **frontend portfolio demo**, not an operational hiring platform. Profiles, reviews, verification labels and dashboard metrics are sample content. Login and registration do not authenticate users or create accounts; contact submissions do not send messages. Worker action buttons are illustrative. Bookings remain in this browser and are not sent to workers. Use fictional details; all local bookings share the same browser storage, with no user isolation. Clearing site data removes saved requests.

## Deployment

Publish the repository root using a static host. There is no build command or generated output directory. Keep the HTML pages, `css`, `js`, `data` and `assets` together. No live deployment URL is claimed here.

## Future improvements

- Server-side authentication and role-based authorization.
- Database-backed booking lifecycle and worker acceptance.
- Real contact delivery, messaging and notification services.
- Worker verification and automated browser tests.
