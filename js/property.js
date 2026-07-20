/* ============================================================
   LUXENEST — Property Detail (Gallery, Mortgage Calculator)
   ============================================================ */

/* ---------- Get Property by ID ---------- */
function getPropertyById(id) {
  return properties.find(p => p.id === parseInt(id));
}

/* ---------- Load Property Detail ---------- */
function loadPropertyDetail() {
  const container = document.getElementById('propertyDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get('id') || 1;
  const property = getPropertyById(propertyId);

  if (!property) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h5>Property Not Found</h5>
        <p>The property you're looking for doesn't exist.</p>
        <a href="listings.html" class="btn-luxenest mt-3">Browse Properties</a>
      </div>
    `;
    return;
  }

  const images = [
    property.image,
    property.image.replace('w=600', 'w=800'),
    property.image.replace('w=600', 'w=1200'),
    property.image
  ];

  document.title = `${property.title} — LUXENEST`;

  container.innerHTML = `
    <!-- Gallery -->
    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="gallery-main">
          <img id="mainImage" src="${images[0]}" alt="${property.title}" class="w-100" style="height: 500px; object-fit: cover;">
        </div>
        <div class="gallery-thumbs row g-2">
          ${images.slice(0, 4).map((img, i) => `
            <div class="col-3">
              <img src="${img}" alt="View ${i+1}" class="${i === 0 ? 'active' : ''}" onclick="changeImage(this, '${img}')" style="cursor:pointer;">
            </div>
          `).join('')}
        </div>
      </div>
      <div class="col-lg-4">
        <div class="property-detail-sidebar">
          <h2 class="section-title" style="font-size: 2rem;">${formatPrice(property.price, property.type)}</h2>
          <p class="text-muted"><i class="fas fa-map-marker-alt" style="color: var(--accent-gold);"></i> ${property.location}</p>
          <p class="mb-3"><span class="badge ${property.type === 'sale' ? 'badge-sale' : 'badge-rent'} text-white px-3 py-2">${property.type === 'sale' ? 'For Sale' : 'For Rent'}</span></p>
          
          <div class="row g-3 mb-4">
            <div class="col-4 text-center">
              <div class="p-3 border rounded-3" style="background: var(--bg-off-white);">
                <i class="fas fa-bed fa-lg" style="color: var(--accent-gold);"></i>
                <h6 class="mt-2 mb-0">${property.beds}</h6>
                <small class="text-muted">Beds</small>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="p-3 border rounded-3" style="background: var(--bg-off-white);">
                <i class="fas fa-bath fa-lg" style="color: var(--accent-gold);"></i>
                <h6 class="mt-2 mb-0">${property.baths}</h6>
                <small class="text-muted">Baths</small>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="p-3 border rounded-3" style="background: var(--bg-off-white);">
                <i class="fas fa-vector-square fa-lg" style="color: var(--accent-gold);"></i>
                <h6 class="mt-2 mb-0">${property.sqft.toLocaleString()}</h6>
                <small class="text-muted">Sq Ft</small>
              </div>
            </div>
          </div>

          <a href="contact.html" class="btn-luxenest w-100 mb-2 text-center">Schedule a Viewing</a>
          <button class="btn-luxenest-outline w-100" onclick="showToast('Property added to favorites!', 'success')">
            <i class="far fa-heart"></i> Add to Favorites
          </button>
        </div>
      </div>
    </div>

    <!-- Description & Features -->
    <div class="row">
      <div class="col-lg-8">
        <h3 class="mb-3">About This Property</h3>
        <div class="gold-divider"></div>
        <p class="text-muted" style="line-height: 1.8; font-size: 1.05rem;">
          Welcome to this stunning ${property.title.toLowerCase()}, a masterpiece of modern architecture 
          and design. Nestled in the prestigious ${property.location} area, this ${property.beds}-bedroom, 
          ${property.baths}-bathroom residence offers an unparalleled living experience with 
          ${property.sqft.toLocaleString()} square feet of meticulously crafted living space.
        </p>
        <p class="text-muted" style="line-height: 1.8; font-size: 1.05rem;">
          Every detail has been thoughtfully considered, from the soaring ceilings and floor-to-ceiling 
          windows that flood the space with natural light, to the premium finishes and state-of-the-art 
          smart home technology. The open-concept layout seamlessly connects the living, dining, and 
          kitchen areas, creating an ideal space for both entertaining and everyday luxury living.
        </p>

        <h4 class="mt-4 mb-3">Key Features</h4>
        <div class="gold-divider"></div>
        <div class="row g-3">
          ${[
            'Hardwood floors throughout',
            'Gourmet chef\'s kitchen',
            'Smart home automation',
            'Private terrace / balcony',
            '24/7 concierge service',
            'Fitness center & spa',
            'Resident lounge',
            'Valet parking',
            'Wine cellar',
            'Rooftop pool',
            'Private elevator',
            'Floor-to-ceiling windows'
          ].map(f => `
            <div class="col-md-6">
              <p class="mb-2"><i class="fas fa-check-circle" style="color: var(--accent-gold);"></i> ${f}</p>
            </div>
          `).join('')}
        </div>

        <!-- Virtual Tour -->
        <h4 class="mt-5 mb-3">Virtual Tour</h4>
        <div class="gold-divider"></div>
        <div class="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Virtual Tour" allowfullscreen></iframe>
        </div>
      </div>

      <!-- Sidebar: Mortgage Calculator -->
      <div class="col-lg-4">
        <div class="mortgage-calculator sticky-top" style="top: 100px;">
          <h5><i class="fas fa-calculator" style="color: var(--accent-gold);"></i> Mortgage Calculator</h5>
          <form id="mortgageForm" onsubmit="calculateMortgage(event)">
            <div class="mb-3">
              <label class="form-label small text-muted">Property Price</label>
              <input type="number" class="form-control" id="mortgagePrice" value="${property.price}" readonly>
            </div>
            <div class="mb-3">
              <label class="form-label small text-muted">Down Payment (%)</label>
              <input type="number" class="form-control" id="downPayment" value="20" min="0" max="100">
            </div>
            <div class="mb-3">
              <label class="form-label small text-muted">Annual Interest Rate (%)</label>
              <input type="number" class="form-control" id="interestRate" value="6.5" step="0.1" min="0">
            </div>
            <div class="mb-3">
              <label class="form-label small text-muted">Loan Term (Years)</label>
              <select class="form-select" id="loanTerm">
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="30" selected>30 Years</option>
              </select>
            </div>
            <button type="submit" class="btn-luxenest w-100">Calculate</button>
          </form>
          <div id="mortgageResult" class="mt-3" style="display:none;">
            <div class="mortgage-result">
              <small class="text-white-50">Estimated Monthly Payment</small>
              <div class="monthly-payment" id="monthlyPayment">$0</div>
              <small class="text-white-50">* Taxes & insurance not included</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map -->
    <h4 class="mt-5 mb-3">Location</h4>
    <div class="gold-divider"></div>
    <div class="map-container mb-5">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192575541946!3d34.02016131035495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f252608cf!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1" 
        allowfullscreen="" 
        loading="lazy">
      </iframe>
    </div>
  `;
}

/* ---------- Change Gallery Image ---------- */
function changeImage(element, src) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
  element.classList.add('active');
}

/* ---------- Mortgage Calculator ---------- */
function calculateMortgage(event) {
  event.preventDefault();
  
  const price = parseFloat(document.getElementById('mortgagePrice').value);
  const downPct = parseFloat(document.getElementById('downPayment').value) / 100;
  const rate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
  const termYears = parseInt(document.getElementById('loanTerm').value);
  const totalPayments = termYears * 12;

  const downAmount = price * downPct;
  const loanAmount = price - downAmount;

  if (loanAmount <= 0) {
    showToast('Down payment cannot exceed property price.', 'error');
    return;
  }

  // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthly = rate === 0 
    ? loanAmount / totalPayments
    : loanAmount * (rate * Math.pow(1 + rate, totalPayments)) / (Math.pow(1 + rate, totalPayments) - 1);

  const resultDiv = document.getElementById('mortgageResult');
  const monthlyDisplay = document.getElementById('monthlyPayment');
  
  monthlyDisplay.textContent = `$${monthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  resultDiv.style.display = 'block';

  // Animate the result
  resultDiv.style.opacity = '0';
  setTimeout(() => { resultDiv.style.opacity = '1'; }, 50);
}

/* ---------- Initialize ---------- */
document.addEventListener('DOMContentLoaded', function() {
  loadPropertyDetail();
});