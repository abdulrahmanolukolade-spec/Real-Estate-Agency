/* ============================================================
   LUXENEST — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  // -------------- Active Nav Link --------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-luxenest .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // -------------- Back to Top Button --------------
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------- Scroll Reveal Animations --------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // -------------- Stats Counter Animation --------------
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target'));
          if (!target.classList.contains('counted')) {
            target.classList.add('counted');
            animateCounter(target, targetValue);
          }
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statObserver.observe(el));
  }

  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current.toLocaleString();
    }, 25);
  }

  // -------------- Smooth Scroll for Anchor Links --------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------------- Navbar Shrink on Scroll --------------
  const navbar = document.querySelector('.navbar-luxenest');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
      } else {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // -------------- Newsletter Form --------------
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const email = input.value.trim();
      if (email && isValidEmail(email)) {
        showToast('Thank you for subscribing to LUXENEST!', 'success');
        input.value = '';
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  }

  // -------------- Utility Functions --------------
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.luxenest-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `luxenest-toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    // Styles
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'success' ? '#1a1a2e' : '#dc3545'};
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-left: 4px solid var(--accent-gold, #c9a84c);
    `;

    // Trigger animation
    requestAnimationFrame(() => { toast.style.opacity = '1'; });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
});