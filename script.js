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
  if (loading) loading.style.display = 'none';
  container.innerHTML = '';

  if (spots.length === 0) {
    container.innerHTML = '<p style="text-align: center;">No spots found.</p>';
    return;
  }

  spots.forEach(spot => {
    const card = document.createElement('div');
    card.className = 'parking-card';

    const imagePath = spot.image.startsWith('http') ? spot.image : `${spot.image}`;

    card.innerHTML = `
      <img src="${imagePath}" alt="${spot.location}" />
      <h3>${spot.location}</h3>
      <p>Type: ${spot.type[0].toUpperCase() + spot.type.slice(1)}</p>
      <p class="${spot.availability ? 'available' : 'unavailable'}">
        Available: ${spot.availability ? 'Yes' : 'No'}
      </p>
      <p>Price: $${spot.price.toFixed(2)}/hr</p>
      <button class="favorite-btn" data-id="${spot.id}">
        ${isFavorite(spot.id) ? 'Remove Favorite' : 'Add Favorite'}
      </button>
      <button class="reserve-btn" data-id="${spot.id}" ${!spot.availability ? 'disabled' : ''}>
        ${spot.availability ? 'Reserve Spot' : 'Unavailable'}
      </button>
    `;

    container.appendChild(card);
  });

  addFavoriteEvents();
  addReserveEvents();
}

function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favorites.includes(id.toString());
}

function toggleFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favorites.includes(id.toString())) {
    favorites = favorites.filter(fav => fav !== id.toString());
    alert('Removed from favorites!');
  } else {
    favorites.push(id.toString());
    alert('Added to favorites!');
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavoriteEvents() {
  const buttons = document.querySelectorAll('.favorite-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      toggleFavorite(id);
      button.textContent = isFavorite(id) ? 'Remove Favorite' : 'Add Favorite';
    });
  });
}

function addReserveEvents() {
  const buttons = document.querySelectorAll('.reserve-btn');
  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('data-id');
      await reserveSpot(id);
      const updatedSpots = await getSpots();
      showSpots(updatedSpots);
    });
  });
}

async function reserveSpot(id) {
  try {
    const response = await fetch(`http://localhost:3000/parkingSpots/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ availability: false })
    });
    if (!response.ok) throw new Error('Failed to reserve');
    alert('Spot reserved successfully!');
  } catch (error) {
    console.error('Error reserving spot:', error);
    alert('Failed to reserve the spot.');
  }
}

async function showFilteredSpots() {
  const spots = await getSpots();
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput ? searchInput.value.toLowerCase() : '';
  const filterType = document.getElementById('type-filter')?.value || 'all';
  const onlyFavorites = document.getElementById('only-favorites')?.checked;

  let filteredSpots = spots.filter(spot =>
    spot.location.toLowerCase().includes(searchText)
  );

  if (filterType !== 'all') {
    filteredSpots = filteredSpots.filter(spot => spot.type === filterType);
  }

  if (onlyFavorites) {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    filteredSpots = filteredSpots.filter(spot =>
      favs.includes(spot.id.toString())
    );
  }

  showSpots(filteredSpots);
}

// Load and display spots
window.addEventListener('load', async () => {
  const spots = await getSpots();
  showSpots(spots);
});

// Filter functionality
document.getElementById('search-input')?.addEventListener('input', showFilteredSpots);
document.getElementById('type-filter')?.addEventListener('change', showFilteredSpots);
document.getElementById('only-favorites')?.addEventListener('change', showFilteredSpots);
