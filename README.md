# Car Parking Locator - LanoPark

## Overview

**LanoPark** is a single-page web application (SPA) designed to help users locate parking spaces around Nairobi quickly and efficiently. It offers a responsive interface built with **HTML, CSS, and JavaScript**, and fetches parking data from a mock API using `json-server`.

## Features

**Display Parking Spots**

* Lists parking spots in styled cards.
* Each card shows location, parking type, price/hour, and availability.

**Search by Location**

* Real-time filtering using a search bar.
* Case-insensitive match by location name.

**Filter by Type**

* Dropdown filter for Public, Private, and Disabled spots.
* Filters work with search input.

**Responsive Design**

* Layout adapts using **CSS Grid** and **media queries**.

**Data Fetching**

* Uses `fetch` and `async/await` to get data from:
  `http://localhost:3000/parkingSpots`

**Reusable Functions**

* `getSpots()` – fetches data
* `showSpots()` – renders cards
* `showFilteredSpots()` – handles search + filter logic

**Array Methods**

* `.forEach()` – render data
* `.filter()` – apply filters

**Error Handling**

* Displays fallback message if data fetch fails.

## Setup Instructions

1. **Clone the Repository**

```bash
git clone git@github.com:CodexOmire/Car-Parking-Locator-Project.git
cd Car-Parking-Locator-Project
```

2. **Install JSON Server**

```bash
npm install -g json-server
```

3. **Start the JSON Server**

```bash
json-server --watch db.json
```

4. **Open the App**
   Use VSCode Live Server or open `index.html` manually in your browser.

## File Structure

```
Car-Parking-Locator-Project/
├── db.json
├── index.html
├── styles.css
├── script.js
├── README.md
```

## Author

**Ezekiel Omire**
GitHub: [github.com/CodexOmire](https://github.com/CodexOmire)

## License

Open-source for learning and demo use.
