/**
 * VENORA - Contact Page Controller (contact.js)
 * Synchronizes centralized site configuration, manages form validation,
 * provides truthful feedback on integration status, and handles FAQ accordions.
 */

(function () {
  'use strict';

  function initContactPage() {
    populateConfigDetails();
    initContactForm();
    initFaqAccordion();
    initScrollReveals();
  }

  /**
   * 1. Populate configured contact details from site-config.js
   */
  function populateConfigDetails() {
    if (!window.VenoraConfig) return;

    const { contact } = window.VenoraConfig;
    if (!contact) return;

    const emailLink = document.getElementById('contact-email-link');
    if (emailLink && contact.email) {
      emailLink.href = `mailto:${contact.email}`;
      emailLink.textContent = contact.email;
    }

    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink && contact.phone) {
      phoneLink.href = `tel:${contact.phoneRaw || contact.phone}`;
      phoneLink.textContent = contact.phone;
    }

    const addressEl = document.getElementById('contact-address-text');
    if (addressEl && contact.address && contact.address.formatted) {
      addressEl.textContent = contact.address.formatted;
    }

    // Populate Office Hours if available
    const hoursList = document.getElementById('office-hours-list');
    if (hoursList && contact.officeHours && contact.officeHours.length > 0) {
      hoursList.innerHTML = contact.officeHours.map(slot => `
        <li class="hours-row">
          <span class="hours-days">${slot.days}</span>
          <span class="hours-time">${slot.hours}</span>
        </li>
      `).join('');
    }
  }

  /**
   * 2. Comprehensive Contact Form Validation & Truthful Feedback
   */
  function initContactForm() {
    const form = document.getElementById('contact-enquiry-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const typeSelect = document.getElementById('contact-enquiry-type');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('submit-btn-text');
    const feedback = document.getElementById('contact-form-feedback');

    // Helper to set error
    function setError(inputId, message) {
      const input = document.getElementById(inputId);
      const errorEl = document.getElementById(`error-${inputId}`);
      if (input) input.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = message;
    }

    // Helper to clear error
    function clearError(inputId) {
      const input = document.getElementById(inputId);
      const errorEl = document.getElementById(`error-${inputId}`);
      if (input) input.classList.remove('is-invalid');
      if (errorEl) errorEl.textContent = '';
    }

    // Real-time error removal upon typing
    [nameInput, emailInput, typeSelect, subjectInput, messageInput].forEach(field => {
      if (!field) return;
      field.addEventListener('input', () => clearError(field.id));
      field.addEventListener('change', () => clearError(field.id));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setError('contact-name', 'Please provide your full name (minimum 2 characters).');
        isValid = false;
      } else {
        clearError('contact-name');
      }

      // 2. Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        setError('contact-email', 'Please enter a valid corporate email address.');
        isValid = false;
      } else {
        clearError('contact-email');
      }

      // 3. Validate Enquiry Type
      const typeVal = typeSelect ? typeSelect.value : '';
      if (!typeVal) {
        setError('contact-enquiry-type', 'Please select an enquiry category.');
        isValid = false;
      } else {
        clearError('contact-enquiry-type');
      }

      // 4. Validate Subject
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectVal || subjectVal.length < 4) {
        setError('contact-subject', 'Please include an enquiry subject (minimum 4 characters).');
        isValid = false;
      } else {
        clearError('contact-subject');
      }

      // 5. Validate Message
      const msgVal = messageInput ? messageInput.value.trim() : '';
      if (!msgVal || msgVal.length < 10) {
        setError('contact-message', 'Please share details regarding your event requirements (minimum 10 characters).');
        isValid = false;
      } else {
        clearError('contact-message');
      }

      if (!isValid) {
        // Focus first invalid element
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Disable button during simulated processing
      submitBtn.disabled = true;
      submitText.textContent = 'Processing...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Enquiry';

        // Truthful feedback as requested: Backend submission is in development mode
        const supportEmail = (window.VenoraConfig && window.VenoraConfig.contact && window.VenoraConfig.contact.email)
          ? window.VenoraConfig.contact.email
          : 'contact@venora-venues.example.com';

        feedback.hidden = false;
        feedback.className = 'form-status-feedback is-notice';
        feedback.innerHTML = `
          <strong>Requirement brief validated:</strong> Thank you, <em>${escapeHtml(nameVal)}</em>. 
          Please note that live form dispatch is currently in development mode. 
          To guarantee your enquiry is logged immediately by our advisory team, please forward your requirements directly to our concierge at 
          <a href="mailto:${supportEmail}?subject=${encodeURIComponent(subjectVal)}" style="color: var(--gold-primary); text-decoration: underline; font-weight: 600;">${supportEmail}</a> 
          or telephone us during consultation hours.
        `;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  /**
   * 3. FAQ Accordion Interaction
   */
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.contact-faq-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.contact-faq-item');
        const content = item.querySelector('.contact-faq-content');
        const isOpen = item.classList.contains('is-open');

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          content.hidden = true;
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          content.hidden = false;
        }
      });
    });
  }

  /**
   * 4. Scroll Reveal Observer
   */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    if (revealElements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
  } else {
    initContactPage();
  }
})();
