/**
 * VENORA - Theme and Direction Engine
 * Handles theme (Gold & White / Gold & Midnight) and layout direction (LTR / RTL)
 * Zero flash of unstyled theme, persistent via localStorage
 */

(function () {
  'use strict';

  const THEME_KEY = 'venora_theme_preference';
  const DIR_KEY = 'venora_dir_preference';

  /**
   * Determine initial theme based on localStorage or system preference
   */
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Determine initial direction based on localStorage
   */
  function getPreferredDirection() {
    const saved = localStorage.getItem(DIR_KEY);
    return saved === 'rtl' ? 'rtl' : 'ltr';
  }

  /**
   * Apply theme to root document
   */
  function setTheme(theme) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    try {
      localStorage.setItem(THEME_KEY, validTheme);
    } catch (e) {
      // storage unavailable
    }
    // Update theme toggle UI states if already rendered
    updateThemeToggleUI(validTheme);
    window.dispatchEvent(new CustomEvent('venora:theme-changed', { detail: { theme: validTheme } }));
  }

  /**
   * Apply direction to root document
   */
  function setDirection(dir) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', validDir);
    try {
      localStorage.setItem(DIR_KEY, validDir);
    } catch (e) {
      // storage unavailable
    }
    updateDirectionToggleUI(validDir);
    window.dispatchEvent(new CustomEvent('venora:dir-changed', { detail: { dir: validDir } }));
  }

  /**
   * Sync visual toggles with active theme state
   */
  function updateThemeToggleUI(theme) {
    const toggles = document.querySelectorAll('[data-action="toggle-theme"]');
    toggles.forEach(toggle => {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      toggle.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      const textSpan = toggle.querySelector('.toggle-label-text');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  /**
   * Sync visual toggles with active direction state
   */
  function updateDirectionToggleUI(dir) {
    const toggles = document.querySelectorAll('[data-action="toggle-dir"]');
    toggles.forEach(toggle => {
      const isRtl = dir === 'rtl';
      toggle.setAttribute('aria-checked', isRtl ? 'true' : 'false');
      toggle.setAttribute('aria-label', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      toggle.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      const textSpan = toggle.querySelector('.toggle-label-text');
      if (textSpan) {
        textSpan.textContent = isRtl ? 'LTR' : 'RTL';
      }
    });
  }

  // Apply immediately upon execution to prevent flash
  const initialTheme = getPreferredTheme();
  const initialDir = getPreferredDirection();
  document.documentElement.setAttribute('data-theme', initialTheme);
  document.documentElement.setAttribute('dir', initialDir);

  // Expose global controller
  window.VenoraTheme = {
    getTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
    getDirection: () => document.documentElement.getAttribute('dir') || 'ltr',
    setTheme: setTheme,
    setDirection: setDirection,
    toggleTheme: function () {
      const current = this.getTheme();
      setTheme(current === 'dark' ? 'light' : 'dark');
    },
    toggleDirection: function () {
      const current = this.getDirection();
      setDirection(current === 'rtl' ? 'ltr' : 'rtl');
    },
    syncUI: function () {
      updateThemeToggleUI(this.getTheme());
      updateDirectionToggleUI(this.getDirection());
    }
  };

  // Listen for system theme adjustments if user hasn't explicitly overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
