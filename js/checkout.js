/**
 * VENORA - Multi-Step Booking & Purchase Flow Controller
 * Manages Step 1 (Package), Step 2 (Event Details), Step 3 (Customer Details),
 * Step 4 (Order Review), and Step 5 (Confirmation/Status).
 */

(function () {
  'use strict';

  function initCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPackageId = urlParams.get('package') || 'professional';
    const initialServiceSlug = urlParams.get('service') || '';

    // Booking state
    const bookingState = {
      packageId: initialPackageId,
      packageName: 'Professional',
      packagePrice: 'Custom Quote',
      serviceSlug: initialServiceSlug,
      eventName: '',
      eventType: 'Conference',
      eventDate: '',
      altDate: '',
      attendees: 100,
      city: 'Mumbai',
      venuePreference: '',
      addons: [],
      notes: '',
      fullName: '',
      email: '',
      phone: '',
      company: '',
      referenceId: ''
    };

    // Pre-fill user details if logged in
    if (window.VenoraAuth && window.VenoraAuth.getUser) {
      const activeUser = window.VenoraAuth.getUser();
      if (activeUser) {
        if (activeUser.name) bookingState.fullName = activeUser.name;
        if (activeUser.email) bookingState.email = activeUser.email;
        if (activeUser.phone) bookingState.phone = activeUser.phone;
        if (activeUser.company) bookingState.company = activeUser.company;
      }
    }

    let currentStep = 1;
    const totalSteps = 4; // Steps 1 to 4 before final confirmation (step 5)

    // DOM Elements
    const stepperSteps = document.querySelectorAll('.stepper-step');
    const stepPanels = document.querySelectorAll('.checkout-step-panel');
    const summaryPkgName = document.getElementById('summary-pkg-name');
    const summaryPkgTagline = document.getElementById('summary-pkg-tagline');
    const summaryPkgPrice = document.getElementById('summary-pkg-price');
    const summaryEventDate = document.getElementById('summary-event-date');
    const summaryAttendees = document.getElementById('summary-attendees');
    const summaryAddons = document.getElementById('summary-addons-list');

    // Setup package option cards in Step 1
    const pkgCards = document.querySelectorAll('.package-option-card');
    pkgCards.forEach(card => {
      const pkgId = card.getAttribute('data-package');
      if (pkgId === bookingState.packageId) {
        card.classList.add('is-selected');
      }

      card.addEventListener('click', () => {
        pkgCards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        bookingState.packageId = pkgId;
        updatePackageFromData(pkgId);
      });
    });

    function updatePackageFromData(pkgId) {
      if (window.VenoraPricing && window.VenoraPricing.getById) {
        const pkg = window.VenoraPricing.getById(pkgId);
        if (pkg) {
          bookingState.packageName = pkg.name;
          bookingState.packagePrice = pkg.priceDisplay;
          if (summaryPkgName) summaryPkgName.textContent = pkg.name;
          if (summaryPkgTagline) summaryPkgTagline.textContent = pkg.tagline;
          if (summaryPkgPrice) summaryPkgPrice.textContent = pkg.priceDisplay;
        }
      }
    }

    updatePackageFromData(bookingState.packageId);

    // Pre-fill input fields if we have user data
    const nameInput = document.getElementById('cust-name');
    const emailInput = document.getElementById('cust-email');
    const phoneInput = document.getElementById('cust-phone');
    const companyInput = document.getElementById('cust-company');

    if (nameInput && bookingState.fullName) nameInput.value = bookingState.fullName;
    if (emailInput && bookingState.email) emailInput.value = bookingState.email;
    if (phoneInput && bookingState.phone) phoneInput.value = bookingState.phone;
    if (companyInput && bookingState.company) companyInput.value = bookingState.company;

    // Next / Back Button Handlers
    document.querySelectorAll('[data-action="next-step"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          collectStepData(currentStep);
          goToStep(currentStep + 1);
        }
      });
    });

    document.querySelectorAll('[data-action="prev-step"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
      });
    });

    // Form Submission (Step 4 -> Step 5)
    const submitEnquiryBtn = document.getElementById('submit-enquiry-btn');
    if (submitEnquiryBtn) {
      submitEnquiryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const termsCheck = document.getElementById('review-terms-checkbox');
        if (termsCheck && !termsCheck.checked) {
          alert('Please accept the VENORA terms and coordination policies to proceed.');
          return;
        }

        submitEnquiryBtn.disabled = true;
        submitEnquiryBtn.innerHTML = 'Submitting Enquiry...';

        setTimeout(() => {
          bookingState.referenceId = 'VEN-' + Math.floor(100000 + Math.random() * 900000);
          showConfirmation(bookingState);
        }, 800);
      });
    }

    function validateStep(step) {
      if (step === 1) {
        return true;
      }

      if (step === 2) {
        const evName = document.getElementById('event-name');
        const evDate = document.getElementById('event-date');
        const evAttendees = document.getElementById('event-attendees');

        if (!evName || !evName.value.trim()) {
          alert('Please enter your event or summit title.');
          if (evName) evName.focus();
          return false;
        }

        if (!evDate || !evDate.value) {
          alert('Please select your preferred event date.');
          if (evDate) evDate.focus();
          return false;
        }

        if (!evAttendees || !evAttendees.value || parseInt(evAttendees.value) < 1) {
          alert('Please specify the expected number of delegates.');
          if (evAttendees) evAttendees.focus();
          return false;
        }

        return true;
      }

      if (step === 3) {
        const name = document.getElementById('cust-name');
        const email = document.getElementById('cust-email');
        const phone = document.getElementById('cust-phone');

        if (!name || !name.value.trim()) {
          alert('Please enter your full name.');
          if (name) name.focus();
          return false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
          alert('Please enter a valid corporate email address.');
          if (email) email.focus();
          return false;
        }

        if (!phone || !phone.value.trim()) {
          alert('Please enter your contact phone number.');
          if (phone) phone.focus();
          return false;
        }

        return true;
      }

      return true;
    }

    function collectStepData(step) {
      if (step === 2) {
        const evName = document.getElementById('event-name');
        const evType = document.getElementById('event-type');
        const evDate = document.getElementById('event-date');
        const altDate = document.getElementById('event-alt-date');
        const attendees = document.getElementById('event-attendees');
        const city = document.getElementById('event-city');
        const venue = document.getElementById('event-venue-pref');
        const notes = document.getElementById('event-notes');

        if (evName) bookingState.eventName = evName.value.trim();
        if (evType) bookingState.eventType = evType.value;
        if (evDate) bookingState.eventDate = evDate.value;
        if (altDate) bookingState.altDate = altDate.value;
        if (attendees) bookingState.attendees = attendees.value;
        if (city) bookingState.city = city.value.trim();
        if (venue) bookingState.venuePreference = venue.value.trim();
        if (notes) bookingState.notes = notes.value.trim();

        // Addons
        bookingState.addons = [];
        document.querySelectorAll('input[name="addons"]:checked').forEach(cb => {
          bookingState.addons.push(cb.value);
        });

        // Update sidebar
        if (summaryEventDate) summaryEventDate.textContent = bookingState.eventDate;
        if (summaryAttendees) summaryAttendees.textContent = `${bookingState.attendees} Delegates`;
        if (summaryAddons) {
          summaryAddons.innerHTML = bookingState.addons.length > 0
            ? bookingState.addons.map(a => `<span class="badge" style="background: var(--bg-secondary); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; border: 1px solid var(--border-color);">${a}</span>`).join(' ')
            : 'None selected';
        }
      }

      if (step === 3) {
        const name = document.getElementById('cust-name');
        const email = document.getElementById('cust-email');
        const phone = document.getElementById('cust-phone');
        const comp = document.getElementById('cust-company');

        if (name) bookingState.fullName = name.value.trim();
        if (email) bookingState.email = email.value.trim();
        if (phone) bookingState.phone = phone.value.trim();
        if (comp) bookingState.company = comp.value.trim();

        // Update Review summary in Step 4
        renderReviewSummary();
      }
    }

    function renderReviewSummary() {
      const revPkg = document.getElementById('review-pkg-name');
      const revEvent = document.getElementById('review-event-details');
      const revCust = document.getElementById('review-customer-details');

      if (revPkg) revPkg.textContent = `${bookingState.packageName} (${bookingState.packagePrice})`;
      if (revEvent) {
        revEvent.innerHTML = `
          <strong>${bookingState.eventName}</strong> (${bookingState.eventType})<br>
          Date: ${bookingState.eventDate} ${bookingState.altDate ? '(Alt: ' + bookingState.altDate + ')' : ''}<br>
          Delegates: ${bookingState.attendees} · City: ${bookingState.city}<br>
          ${bookingState.venuePreference ? 'Venue: ' + bookingState.venuePreference + '<br>' : ''}
          ${bookingState.addons.length > 0 ? 'Selected Add-ons: ' + bookingState.addons.join(', ') : 'No extra add-ons'}
        `;
      }
      if (revCust) {
        revCust.innerHTML = `
          <strong>${bookingState.fullName}</strong><br>
          Email: ${bookingState.email}<br>
          Phone: ${bookingState.phone}<br>
          ${bookingState.company ? 'Organization: ' + bookingState.company : ''}
        `;
      }
    }

    function goToStep(targetStep) {
      currentStep = targetStep;

      // Update stepper nav bubbles
      stepperSteps.forEach((el, i) => {
        const stepNum = i + 1;
        el.classList.toggle('is-active', stepNum === currentStep);
        el.classList.toggle('is-completed', stepNum < currentStep);
      });

      // Show/hide step panels
      stepPanels.forEach(panel => {
        const pStep = parseInt(panel.getAttribute('data-step'));
        panel.hidden = (pStep !== currentStep);
      });

      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    function showConfirmation(state) {
      // Hide all regular steps and sidebar
      document.getElementById('checkout-steps-form').hidden = true;
      document.getElementById('checkout-sidebar').hidden = true;

      const confirmSection = document.getElementById('checkout-confirmation-view');
      if (confirmSection) {
        confirmSection.hidden = false;
        const refEl = document.getElementById('confirm-ref-number');
        if (refEl) refEl.textContent = state.referenceId;

        const summaryEl = document.getElementById('confirm-event-summary');
        if (summaryEl) {
          summaryEl.textContent = `${state.eventName} (${state.packageName} Plan) · ${state.eventDate} · ${state.fullName} (${state.email})`;
        }
      }

      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  }

  document.addEventListener('DOMContentLoaded', initCheckout);
})();
