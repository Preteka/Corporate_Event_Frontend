/**
 * VENORA - Authentication Engine (Login & Signup)
 * Handles client-side input validation, password visibility toggling,
 * safe session storage management, and post-authentication continuation.
 */

(function () {
  'use strict';

  const SESSION_KEY = 'venora_active_session';

  function getActiveUser() {
    try {
      const data = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession(user, remember = false) {
    const payload = JSON.stringify({
      id: user.id || 'usr_' + Date.now().toString(36),
      name: user.name || 'Corporate Delegate',
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      authenticatedAt: new Date().toISOString()
    });

    try {
      if (remember) {
        localStorage.setItem(SESSION_KEY, payload);
      } else {
        sessionStorage.setItem(SESSION_KEY, payload);
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  function getContinuationUrl() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    const pkg = params.get('package');
    const service = params.get('service');

    if (redirect) return redirect;
    if (pkg) return `checkout.html?package=${encodeURIComponent(pkg)}`;
    if (service) return `checkout.html?service=${encodeURIComponent(service)}`;
    return 'index.html';
  }

  function initPasswordToggles() {
    const toggles = document.querySelectorAll('[data-toggle="password"]');
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        btn.innerHTML = isPassword ? `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ` : `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      });
    });
  }

  function showAlert(alertEl, msg, type = 'error') {
    if (!alertEl) return;
    alertEl.textContent = msg;
    alertEl.className = `auth-alert-banner is-${type}`;
    alertEl.hidden = false;
  }

  function hideAlert(alertEl) {
    if (!alertEl) return;
    alertEl.hidden = true;
  }

  function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    const alertEl = document.getElementById('auth-alert');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert(alertEl);

      const email = form.email.value.trim();
      const password = form.password.value;
      const remember = form.remember ? form.remember.checked : false;

      // Validation
      if (!email || !password) {
        showAlert(alertEl, 'Please provide both your corporate email and password.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert(alertEl, 'Please enter a valid corporate email address.');
        return;
      }

      // Simulate authentication request
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Signing In...';
      }

      setTimeout(() => {
        setSession({
          email: email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        }, remember);

        showAlert(alertEl, 'Authentication successful. Redirecting...', 'success');

        setTimeout(() => {
          window.location.href = getContinuationUrl();
        }, 600);
      }, 700);
    });
  }

  function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const alertEl = document.getElementById('auth-alert');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert(alertEl);

      const name = form.fullname.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone ? form.phone.value.trim() : '';
      const password = form.password.value;
      const confirmPassword = form.confirm_password ? form.confirm_password.value : '';
      const terms = form.terms ? form.terms.checked : true;

      // Validation
      if (!name || !email || !password) {
        showAlert(alertEl, 'Please fill in all required registration fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert(alertEl, 'Please provide a valid corporate email address.');
        return;
      }

      if (password.length < 6) {
        showAlert(alertEl, 'Password must be at least 6 characters in length.');
        return;
      }

      if (confirmPassword && password !== confirmPassword) {
        showAlert(alertEl, 'Passwords do not match. Please verify your entry.');
        return;
      }

      if (!terms) {
        showAlert(alertEl, 'Please accept the VENORA terms of service to continue.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating Account...';
      }

      setTimeout(() => {
        setSession({
          name: name,
          email: email,
          phone: phone
        }, true);

        showAlert(alertEl, 'Account created successfully. Welcome to VENORA.', 'success');

        setTimeout(() => {
          window.location.href = getContinuationUrl();
        }, 700);
      }, 800);
    });
  }

  window.VenoraAuth = {
    getUser: getActiveUser,
    isAuthenticated: () => getActiveUser() !== null,
    setSession: setSession,
    clearSession: clearSession,
    getContinuationUrl: getContinuationUrl
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initLoginForm();
    initSignupForm();
  });
})();
