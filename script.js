console.log("App is ready!");

async function getSpots() {
  try {
    const response = await fetch('http://localhost:3000/parkingSpots');
    const spots = await response.json();
    return spots;
  } catch (error) {
    console.error("Failed to fetch spots:", error);
    return [];
  }
}

function showSpots(spots) {
  const container = document.getElementById('parking-container');
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
  container.innerHTML = '';

  if (spots.length === 0) {
    container.innerHTML = '<p style="text-align: center;">No spots found.</p>';
    return;
  }

  spots.forEach(spot => {
    const card = document.createElement('div');
    card.className = 'parking-card';

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

async function showFilteredSpots() {
  const spots = await getSpots();
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput ? searchInput.value.toLowerCase() : '';
  const filterType = document.getElementById('type-filter').value;

  let filteredSpots = spots.filter(spot => {
    const matchesType = (filterType === 'all') || (spot.type === filterType);
    const matchesText = spot.location.toLowerCase().includes(searchText);
    return matchesType && matchesText;
  });

  showSpots(filteredSpots);
}

// Wait for DOM before adding listeners
window.addEventListener('DOMContentLoaded', async () => {
  const spots = await getSpots();
  showSpots(spots);

  // Add event listeners safely
  const searchInput = document.getElementById('search-input');
  const filterSelect = document.getElementById('type-filter');

  if (searchInput) {
    searchInput.addEventListener('input', showFilteredSpots);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', showFilteredSpots);
  }
});
