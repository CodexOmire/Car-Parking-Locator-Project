// Confirms JavaScript is loaded
console.log("App is ready!");

// Fetches parking spots from server
async function getSpots() {
  try {
    const response = await fetch('http://localhost:3000/parkingSpots');
    const spots = await response.json();
    return spots;
  } catch (error) {
    console.log("Failed to fetch spots:", error);
    return [];
  }
}

// Displays parking spots as cards
function showSpots(spots) {
  const container = document.getElementById('parking-container');
  const loading = document.getElementById('loading');
  loading.style.display = 'none'; // Hides loading message
  container.innerHTML = ''; // Clears previous content

  // Loops through spots to create cards
  spots.forEach(spot => {
    const card = document.createElement('div');
    card.className = 'parking-card';

    // Adds card content
    card.innerHTML = `
      <h3>${spot.location}</h3>
      <p>Type: ${spot.type[0].toUpperCase() + spot.type.slice(1)}</p>
      <p class="${spot.availability ? 'available' : 'unavailable'}">
        Available: ${spot.availability ? 'Yes' : 'No'}
      </p>
      <p>Price: $${spot.price.toFixed(2)}/hr</p>
      <button class="favorite-btn" data-id="${spot.id}">Add Favorite</button>
    `;

    container.appendChild(card);
  });
}

// Loads spots on page load
window.addEventListener('load', async () => {
  const spots = await getSpots();
  showSpots(spots);
});