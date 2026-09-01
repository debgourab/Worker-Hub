# WorkerHub

WorkerHub is a responsive frontend marketplace for hiring verified local workers. It helps customers discover skilled workers, compare profiles, submit booking requests, and track activity through simple customer and worker dashboards.

## Project Overview

This project is built with plain HTML, CSS, and JavaScript. It does not require a framework, build tool, or package installation, which makes it easy to run, inspect, and customize for a frontend assignment or prototype.

## Features

- Homepage with service search and popular worker categories
- Worker listing page with filters for service, location, rating, rate, and sorting
- Worker profile details with skills, rates, reviews, and booking action
- Booking form that stores demo booking requests in browser local storage
- Customer dashboard with active bookings and recommended workers
- Worker dashboard with incoming job requests, availability toggle, and checklist
- Login and registration demo flows
- About and contact pages
- Responsive layout for desktop, tablet, and mobile screens
- Premium visual refresh with Manrope / Plus Jakarta Sans typography
- Modern glass-style navigation, rounded cards, soft gradients, hover states, and accessible focus states
- Improved mobile navigation with outside-click and link-close behavior
- Local JSON worker dataset

## Tech Stack

- HTML5
- CSS3
- JavaScript
- JSON
- SVG and image assets
- Browser localStorage for demo state

## Folder Structure

```text
WorkerHub/
├── index.html
├── workers.html
├── worker-details.html
├── booking.html
├── customer-dashboard.html
├── worker-dashboard.html
├── login.html
├── register.html
├── about.html
├── contact.html
├── css/
│   ├── style.css
│   ├── workers.css
│   ├── dashboard.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── workers.js
│   ├── booking.js
│   ├── dashboard.js
│   ├── auth.js
│   └── data.js
├── assets/
│   ├── images/
│   └── icons/
└── data/
    └── workers.json
```

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Main landing page with search and service categories |
| `workers.html` | Browse and filter workers |
| `worker-details.html` | View a selected worker profile |
| `booking.html` | Submit a booking request |
| `customer-dashboard.html` | Track customer bookings |
| `worker-dashboard.html` | Track worker jobs and profile status |
| `login.html` | Demo login page |
| `register.html` | Demo account registration page |
| `about.html` | Marketplace information |
| `contact.html` | Contact form |


## Running the Project in vs code

1. Install the Live Server extension in VS Code.
2. Open the project folder in VS Code.
3. Right-click on `index.html`.
4. Click **"Open with Live Server"**.

## Installation

Clone the repository:

```bash
git clone https://github.com/deb-gourab/WorkerHub.git
```

Move into the project directory:

```bash
cd WorkerHub
```

Open the project in VS Code:

```bash
code .
```

## Usage

Open `index.html` in your browser or run the project using the Live Server extension in VS Code.

A local server is recommended because the app loads worker data from `data/workers.json`.

## Demo Flow

1. Open `index.html`.
2. Search for a service or go to `workers.html`.
3. Filter workers by service, location, rating, and hourly rate.
4. Open a worker profile.
5. Submit a booking request.
6. View saved booking requests in `customer-dashboard.html`.

## Data Source

Worker profiles are stored in:

```text
data/workers.json
```

Each worker includes:

- Name
- Service category
- Location
- Rating
- Hourly rate
- Experience
- Availability
- Skills
- Bio
- Reviews
- Profile image path

## Customization Ideas

- Replace demo workers with real worker data
- Add backend authentication
- Store bookings in a database
- Add payment status and invoice screens
- Add worker verification document uploads
- Add search by city or pin code
- Add admin dashboard for approvals and disputes

## Notes

This is a frontend prototype. Login, registration, contact, and booking flows are simulated in the browser for demonstration purposes.
