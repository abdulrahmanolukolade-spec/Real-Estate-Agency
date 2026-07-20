/* ============================================================
   LUXENEST — Property Listings (Filter, Search, Pagination)
   ============================================================ */

/* ---------- Property Data Store ---------- */
const properties = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    location: 'Beverly Hills, CA',
    price: 4500000,
    type: 'sale',
    category: 'villa',
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Oceanfront Penthouse',
    location: 'Miami Beach, FL',
    price: 12500,
    type: 'rent',
    category: 'apartment',
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    featured: true
  },
  {
    id: 3,
    title: 'Contemporary Lake House',
    location: 'Lake Tahoe, CA',
    price: 3200000,
    type: 'sale',
    category: 'house',
    beds: 4,
    baths: 3,
    sqft: 3500,
    image: 'https://images.unsplash.com/photo-1600607687644-c94bf1f6db9c?w=600&q=80',
    featured: true
  },
  {
    id: 4,
    title: 'Luxury Downtown Condo',
    location: 'New York, NY',
    price: 8500,
    type: 'rent',
    category: 'apartment',
    beds: 2,
    baths: 2,
    sqft: 1500,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
    featured: false
  },
  {
    id: 5,
    title: 'Hilltop Estate',
    location: 'San Francisco, CA',
    price: 8900000,
    type: 'sale',
    category: 'villa',
    beds: 6,
    baths: 5,
    sqft: 5800,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80',
    featured: false
  },
  {
    id: 6,
    title: 'Beachfront Bungalow',
    location: 'Malibu, CA',
    price: 6500,
    type: 'rent',
    category: 'house',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18b1f3d10?w=600&q=80',
    featured: false
  },
  {
    id: 7,
    title: 'Ski Chalet',
    location: 'Aspen, CO',
    price: 5600000,
    type: 'sale',
    category: 'house',
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    featured: false
  },
  {
    id: 8,
    title: 'Studio Luxury Suite',
    location: 'Las Vegas, NV',
    price: 3200,
    type: 'rent',
    category: 'apartment',
    beds: 1,
    baths: 1,
    sqft: 750,
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14fbe?w=600&q=80',
    featured: false
  },
  {
    id: 9,
    title: 'Mediterranean Villa',
    location: 'Santa Barbara, CA',
    price: 7200000,
    type: 'sale',
    category: 'villa',
    beds: 6,
    baths: 5,
    sqft: 5200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    featured: false
  },
  {
    id: 10,
    title: 'City View Apartment',
    location: 'Chicago, IL',
    price: 4800,
    type: 'rent',
    category: 'apartment',
    beds: 2,
    baths: 2,
    sqft: 1300,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    featured: false
  },
  {
    id: 11,
    title: 'Countryside Manor',
    location: 'Napa Valley, CA',
    price: 4800000,
    type: 'sale',
    category: 'house',
    beds: 4,
    baths: 3,
    sqft: 3600,
    image: 'https://images.unsplash.com/photo-1600607687644-c94bf1f6db9c?w=600&q=80',
    featured: false
  },
  {
    id: 12,
    title: 'Penthouse Suite',
    location: 'Dubai, UAE',
    price: 15000000,
    type: 'sale',
    category: 'apartment',
    beds: 4,
    baths: 5,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
    featured: false
  }
];

/* ---------- Format Price ---------- */
function formatPrice(price, type) {
  if (type === 'rent') {
    return `$${price.toLocaleString()}/mo`;
  }
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

/* ---------- Render Property Cards ---------- */
function renderProperties(propertiesArray, containerId = 'propertyGrid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (propertiesArray.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <h5>No Properties Found</h5>
          <p>Try adjusting your search filters.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = propertiesArray.map(prop => `
    <div class="col-lg-4 col-md-6 mb-4 reveal">
      <div class="property-card">
        <div class="property-card-image">
          <img src="${prop.image}" alt="${prop.title}" loading="lazy">
          <span class="property-card-badge ${prop.type === 'sale' ? 'sale' : ''}">
            ${prop.type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <div class="property-card-body">
          <div class="property-card-price">${formatPrice(prop.price, prop.type)}</div>
          <h6 class="property-card-title">${prop.title}</h6>
          <div class="property-card-location">
            <i class="fas fa-map-marker-alt"></i> ${prop.location}
          </div>
          <div class="property-card-features">
            <span><i class="fas fa-bed"></i> ${prop.beds} Beds</span>
            <span><i class="fas fa-bath"></i> ${prop.baths} Baths</span>
            <span><i class="fas fa-vector-square"></i> ${prop.sqft.toLocaleString()} sqft</span>
          </div>
          <a href="property-detail.html?id=${prop.id}" class="btn-luxenest w-100 text-center mt-2" style="display:block;">
            View Details
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-trigger reveal animations
  document.querySelectorAll('#propertyGrid .reveal').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  });
}

/* ---------- Filter Properties ---------- */
function filterProperties() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
  const typeFilter = document.getElementById('filterType')?.value || 'all';
  const categoryFilter = document.getElementById('filterCategory')?.value || 'all';
  const minPrice = parseInt(document.getElementById('filterMinPrice')?.value) || 0;
  const maxPrice = parseInt(document.getElementById('filterMaxPrice')?.value) || Infinity;
  const bedsFilter = parseInt(document.getElementById('filterBeds')?.value) || 0;

  const filtered = properties.filter(prop => {
    // Search term
    if (searchTerm && !prop.title.toLowerCase().includes(searchTerm) && !prop.location.toLowerCase().includes(searchTerm)) {
      return false;
    }
    // Type
    if (typeFilter !== 'all' && prop.type !== typeFilter) return false;
    // Category
    if (categoryFilter !== 'all' && prop.category !== categoryFilter) return false;
    // Price
    if (prop.price < minPrice || prop.price > maxPrice) return false;
    // Beds
    if (bedsFilter > 0 && prop.beds < bedsFilter) return false;
    return true;
  });

  renderProperties(filtered);
  updateResultsCount(filtered.length);
}

/* ---------- Update Results Count ---------- */
function updateResultsCount(count) {
  const el = document.getElementById('resultsCount');
  if (el) {
    el.textContent = `Showing ${count} ${count === 1 ? 'property' : 'properties'}`;
  }
}

/* ---------- Sort Properties ---------- */
function sortProperties() {
  const sortBy = document.getElementById('sortSelect')?.value || 'default';
  let sorted = [...properties];

  switch(sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'beds':
      sorted.sort((a, b) => b.beds - a.beds);
      break;
    case 'sqft':
      sorted.sort((a, b) => b.sqft - a.sqft);
      break;
    default:
      sorted.sort((a, b) => a.id - b.id);
  }

  renderProperties(sorted);
  updateResultsCount(sorted.length);
}

/* ---------- Show More / Load More ---------- */
function loadFeaturedProperties() {
  const container = document.getElementById('featuredGrid');
  if (!container) return;

  const featured = properties.filter(p => p.featured);
  renderProperties(featured, 'featuredGrid');
}

/* ---------- Initialize Listings Page ---------- */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize property grid on listings page
  if (document.getElementById('propertyGrid')) {
    renderProperties(properties);
    updateResultsCount(properties.length);
  }

  // Initialize featured on home page
  if (document.getElementById('featuredGrid')) {
    loadFeaturedProperties();
  }

  // Filter event listeners
  const filterElements = ['searchInput', 'filterType', 'filterCategory', 'filterMinPrice', 'filterMaxPrice', 'filterBeds'];
  filterElements.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', filterProperties);
      el.addEventListener('change', filterProperties);
    }
  });

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', sortProperties);
  }
});