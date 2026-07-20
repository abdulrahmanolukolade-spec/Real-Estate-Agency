/* ============================================================
   LUXENEST — Contact Form Validation & Handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Real-time validation
  nameInput?.addEventListener('blur', () => validateField(nameInput, validateName));
  emailInput?.addEventListener('blur', () => validateField(emailInput, validateEmail));
  phoneInput?.addEventListener('blur', () => validateField(phoneInput, validatePhone));
  messageInput?.addEventListener('blur', () => validateField(messageInput, validateMessage));

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isValid = 
      validateField(nameInput, validateName) &
      validateField(emailInput, validateEmail) &
      validateField(phoneInput, validatePhone) &
      validateField(messageInput, validateMessage);

    if (isValid) {
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('Message sent successfully! We\'ll be in touch shortly.', 'success');
        contactForm.reset();
        // Clear validation states
        document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
      }, 1500);
    } else {
      showToast('Please fill out all required fields correctly.', 'error');
    }
  });
});

/* ---------- Validation Functions ---------- */
function validateName(value) {
  return value.trim().length >= 2 ? '' : 'Please enter your full name.';
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.';
}

function validatePhone(value) {
  return /^[\d\s\-\+\(\)]{7,20}$/.test(value) ? '' : 'Please enter a valid phone number.';
}

function validateMessage(value) {
  return value.trim().length >= 10 ? '' : 'Message must be at least 10 characters.';
}

function validateField(input, validator) {
  if (!input) return true;
  const error = validator(input.value);
  const feedback = input.nextElementSibling;
  
  if (error) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = error;
    }
    return false;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }
}