console.log("App is ready!");

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

function showSpots(spots) {
  const container = document.getElementById('parking-container');
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
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
  const searchText = document.getElementById('search-input').value.toLowerCase();

  const filteredSpots = spots.filter(spot => 
    spot.location.toLowerCase().includes(searchText)
  );

  showSpots(filteredSpots);
}

window.addEventListener('load', async () => {
  const spots = await getSpots();
  showSpots(spots);
});

document.getElementById('search-input').addEventListener('input', showFilteredSpots);