/**
 * VENORA Client Dashboard - Main Application Controller
 * Initializes dashboard lifecycle, theme integration, direction switching,
 * and keyboard shortcuts.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme & Direction from shared engine
    if (window.VenoraTheme) {
      window.VenoraTheme.syncUI();
    }

    // 2. Initialize Navigation and Section Router
    if (window.VenoraDashboardNav) {
      window.VenoraDashboardNav.init();
    }

    // 3. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Focus quick search when pressing '/' outside inputs
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        const searchInput = document.getElementById('dash-quick-search');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    console.info('VENORA Client Dashboard initialized successfully.');
  });
})();
