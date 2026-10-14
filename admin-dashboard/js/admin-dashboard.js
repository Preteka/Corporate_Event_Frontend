/**
 * VENORA Admin Dashboard - Main Application Controller
 * Bootstraps the admin portal, theme toggles, search shortcuts,
 * and global action delegates.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initAdminDashboard);

  function initAdminDashboard() {
    // 1. Initialize Navigation & Routing
    if (window.VenoraAdminNav) {
      window.VenoraAdminNav.init();
    }

    // 2. Setup Topbar Theme & Direction Controls
    setupAppearanceControls();

    // 3. Setup Quick Search in Topbar
    setupQuickSearch();

    // 4. Setup Logout Trigger
    setupLogout();
  }

  function setupAppearanceControls() {
    // Theme toggle buttons
    const themeBtns = document.querySelectorAll('[data-action="toggle-theme"]');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
      });
    });

    // Direction toggle buttons
    const dirBtns = document.querySelectorAll('[data-action="toggle-dir"]');
    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const html = document.documentElement;
        const currentDir = html.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', nextDir);
        localStorage.setItem('direction', nextDir);
      });
    });
  }

  function setupQuickSearch() {
    const searchInput = document.getElementById('dash-quick-search');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query && window.VenoraAdminNav) {
          // Navigate to enquiries search or venues search
          window.VenoraAdminNav.navigateTo('enquiries', { search: query });
        }
      }
    });

    // Keyboard shortcut "/" to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function setupLogout() {
    const logoutBtn = document.getElementById('sidebar-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (window.VenoraAdminForms) {
          window.VenoraAdminForms.showLogoutConfirmation();
        } else {
          window.location.href = '../login.html';
        }
      });
    }
  }
})();
