/**
 * VENORA - Component Loader & Lifecycle Engine
 * Dynamically loads components/navbar.html and components/footer.html.
 * Includes embedded template fallbacks so the site works both over HTTP servers
 * and when opened directly via file:// protocol without any missing component warnings.
 */

(function () {
  'use strict';

  // Fallback templates to ensure 100% reliability in all environments (file:// and http://)
  const FALLBACK_NAVBAR = `
<header class="venora-header" id="site-header" role="banner">
  <div class="nav-container">
    <a href="index.html" class="nav-brand" aria-label="VENORA Events and Venues Home">
      <img src="assets/logo/logo.png" alt="VENORA Events &amp; Venues" class="brand-logo" width="180" height="61">
    </a>

    <nav class="nav-menu-desktop" id="primary-navigation" aria-label="Main Navigation">
      <ul class="nav-link-list">
        <li class="nav-item"><a href="index.html" class="nav-link is-active" aria-current="page">Home 1</a></li>
        <li class="nav-item"><a href="home2.html" class="nav-link">Home 2</a></li>
        <li class="nav-item"><a href="about.html" class="nav-link">About Us</a></li>
        <li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
        <li class="nav-item"><a href="pricing.html" class="nav-link">Pricing</a></li>
        <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
        <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
        <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-actions-desktop">
      <button type="button" class="nav-control-btn theme-toggle-btn" data-action="toggle-theme" role="switch" aria-checked="false" aria-label="Switch between Light and Dark Theme" title="Toggle Theme">
        <span class="icon-theme icon-sun" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </span>
        <span class="icon-theme icon-moon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
      </button>

      <button type="button" class="nav-control-btn dir-toggle-btn" data-action="toggle-dir" role="switch" aria-checked="false" aria-label="Toggle Layout Direction" title="Switch LTR / RTL">
        <span class="dir-indicator" aria-hidden="true">LTR</span>
      </button>

      <div class="profile-dropdown-wrapper">
        <button type="button" class="nav-control-btn profile-trigger-btn" id="profile-menu-button" aria-haspopup="true" aria-expanded="false" aria-controls="profile-menu-dropdown" aria-label="Account Options">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <div class="profile-dropdown-menu" id="profile-menu-dropdown" role="menu" aria-labelledby="profile-menu-button" hidden>
          <div class="dropdown-header">
            <span class="dropdown-header-title">Client Access</span>
            <span class="dropdown-header-subtitle">VENORA Portal</span>
          </div>
          <div class="dropdown-divider" role="separator"></div>
          <a href="login.html" class="dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Login</span>
          </a>
          <a href="signup.html" class="dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Sign Up</span>
          </a>
          <a href="client-dashboard/index.html" class="dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Client Dashboard</span>
          </a>
          <a href="admin-dashboard/index.html" class="dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"></path>
            </svg>
            <span>Admin Dashboard</span>
          </a>
        </div>
      </div>
    </div>

    <button type="button" class="nav-hamburger-btn" id="mobile-menu-toggle" aria-controls="mobile-navigation-drawer" aria-expanded="false" aria-label="Toggle Mobile Menu">
      <span class="hamburger-box" aria-hidden="true">
        <span class="hamburger-line line-1"></span>
        <span class="hamburger-line line-2"></span>
        <span class="hamburger-line line-3"></span>
      </span>
    </button>
  </div>

  <div class="mobile-nav-drawer" id="mobile-navigation-drawer" aria-hidden="true">
    <div class="mobile-drawer-backdrop" data-action="close-mobile-nav"></div>
    <div class="mobile-drawer-content" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      <div class="mobile-drawer-header">
        <a href="index.html" class="nav-brand-mobile" aria-label="VENORA Home">
          <img src="assets/logo/logo.png" alt="VENORA Events &amp; Venues" class="brand-logo" width="180" height="61">
        </a>
        <button type="button" class="drawer-close-btn" data-action="close-mobile-nav" aria-label="Close Mobile Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav class="mobile-nav-links">
        <ul>
          <li><a href="index.html" class="mobile-nav-item is-active">Home 1</a></li>
          <li><a href="home2.html" class="mobile-nav-item">Home 2</a></li>
          <li><a href="about.html" class="mobile-nav-item">About Us</a></li>
          <li><a href="services.html" class="mobile-nav-item">Services</a></li>
          <li><a href="pricing.html" class="mobile-nav-item">Pricing</a></li>
          <li><a href="gallery.html" class="mobile-nav-item">Gallery</a></li>
          <li><a href="blog.html" class="mobile-nav-item">Blog</a></li>
          <li><a href="contact.html" class="mobile-nav-item">Contact</a></li>
        </ul>
      </nav>

      <div class="mobile-drawer-controls">
        <div class="drawer-control-row">
          <span class="drawer-control-label">Appearance</span>
          <button type="button" class="drawer-action-btn theme-toggle-btn" data-action="toggle-theme" aria-label="Toggle Theme">
            <span class="toggle-label-text">Theme</span>
          </button>
        </div>
        <div class="drawer-control-row">
          <span class="drawer-control-label">Layout Direction</span>
          <button type="button" class="drawer-action-btn dir-toggle-btn" data-action="toggle-dir" aria-label="Toggle Direction">
            <span class="toggle-label-text">LTR</span>
          </button>
        </div>
      </div>

      <div class="mobile-drawer-footer">
        <div class="mobile-profile-links">
          <a href="login.html" class="mobile-profile-btn btn-secondary">Login</a>
          <a href="signup.html" class="mobile-profile-btn btn-primary">Sign Up</a>
        </div>
        <a href="client-dashboard/index.html" class="mobile-dashboard-link">Client Dashboard &rarr;</a>
        <a href="admin-dashboard/index.html" class="mobile-dashboard-link" style="margin-top: 0.4rem;">Admin Dashboard &rarr;</a>
      </div>
    </div>
  </div>
</header>
`;

  const FALLBACK_FOOTER = `
<footer class="venora-footer" id="site-footer" role="contentinfo">
  <div class="footer-container">
    <div class="footer-top-grid">
      <div class="footer-col footer-col-brand">
        <a href="index.html" class="footer-brand" aria-label="VENORA Events and Venues Home">
          <img src="assets/logo/logo.png" alt="VENORA Events &amp; Venues" class="footer-logo" width="180" height="61">
        </a>
        <p class="footer-tagline">
          Thoughtfully selected spaces and considered services for exceptional corporate gatherings.
        </p>
        <div class="footer-social-links" aria-label="Venora Social Channels">
          <a href="#linkedin" class="social-icon-btn" aria-label="VENORA LinkedIn" title="LinkedIn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#twitter" class="social-icon-btn" aria-label="VENORA Twitter / X" title="Twitter / X">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#instagram" class="social-icon-btn" aria-label="VENORA Instagram" title="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Quick Links</h3>
        <ul class="footer-link-list">
          <li><a href="index.html" class="footer-link">Home 1</a></li>
          <li><a href="about.html" class="footer-link">About Us</a></li>
          <li><a href="services.html" class="footer-link">Services</a></li>
          <li><a href="gallery.html" class="footer-link">Gallery</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Explore</h3>
        <ul class="footer-link-list">
          <li><a href="home2.html" class="footer-link">Home 2</a></li>
          <li><a href="pricing.html" class="footer-link">Pricing</a></li>
          <li><a href="blog.html" class="footer-link">Blog</a></li>
          <li><a href="contact.html" class="footer-link">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Services</h3>
        <ul class="footer-link-list">
          <li><a href="service-details.html?service=venue-discovery" class="footer-link">Venue Discovery</a></li>
          <li><a href="service-details.html?service=corporate-event-planning" class="footer-link">Corporate Event Planning</a></li>
          <li><a href="service-details.html?service=conference-meeting-coordination" class="footer-link">Conference Coordination</a></li>
          <li><a href="service-details.html?service=catering-event-addons" class="footer-link">Catering &amp; Add-ons</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col-contact">
        <h3 class="footer-col-title">Venue Inquiries</h3>
        <address class="footer-contact-info">
          <p class="contact-item">
            <span class="contact-label">Email:</span>
            <a href="mailto:contact@venora-venues.example.com" class="footer-link">contact@venora-venues.example.com</a>
          </p>
          <p class="contact-item">
            <span class="contact-label">Phone:</span>
            <a href="tel:+18005550190" class="footer-link">+1 (800) 555-0190</a>
          </p>
          <p class="contact-item">
            <span class="contact-label">Location:</span>
            <span class="contact-value">450 Montgomery St, Suite 1800, San Francisco, CA</span>
          </p>
        </address>

        <div class="footer-newsletter">
          <span class="newsletter-heading">Event Insights</span>
          <p class="newsletter-sub">Curated updates on premier corporate venues.</p>
          <form class="newsletter-form" id="footer-newsletter-form" action="#" method="post" novalidate>
            <div class="newsletter-input-group">
              <input type="email" id="newsletter-email" name="email" class="newsletter-input" placeholder="Enter corporate email" required aria-label="Enter corporate email for updates">
              <button type="submit" class="newsletter-submit-btn" aria-label="Subscribe to updates">
                <span>Join</span>
              </button>
            </div>
            <span class="newsletter-feedback" id="newsletter-msg" role="status" aria-live="polite"></span>
          </form>
        </div>
      </div>
    </div>

    <div class="footer-divider" role="separator"></div>

    <div class="footer-bottom-row">
      <div class="footer-copyright">
        &copy; <span id="current-year">2026</span> VENORA Events &amp; Venues. All rights reserved.
      </div>
      <div class="footer-legal-links">
        <a href="privacy.html" class="legal-link">Privacy Policy</a>
        <span class="legal-separator" aria-hidden="true">&bull;</span>
        <a href="terms.html" class="legal-link">Terms &amp; Conditions</a>
      </div>
    </div>
  </div>
</footer>
`;

  /**
   * Safe fetch and inject component HTML fragment into mount point
   */
  async function loadComponent(mountId, componentPath, fallbackHtml) {
    const mountEl = document.getElementById(mountId);
    if (!mountEl) {
      console.warn(`[VENORA] Mount element #${mountId} not found.`);
      return false;
    }

    // Try fetching first
    try {
      const response = await fetch(componentPath);
      if (response.ok) {
        const html = await response.text();
        mountEl.innerHTML = html;
        return true;
      }
    } catch (err) {
      // Fetch unavailable (e.g. file:// protocol restriction or network error)
      // Silently proceed to fallbackHtml
    }

    // Use graceful fallback HTML template so UI is always 100% rendered
    if (fallbackHtml) {
      mountEl.innerHTML = fallbackHtml;
      return true;
    }

    return false;
  }

  /**
   * Initialize Navbar behaviors (theme, dir, profile dropdown, mobile drawer, scroll listener)
   */
  function initNavbar() {
    const header = document.getElementById('site-header');
    if (!header) return;

    // 1. Sync theme and direction state with toggles
    if (window.VenoraTheme && typeof window.VenoraTheme.syncUI === 'function') {
      window.VenoraTheme.syncUI();
    }

    // Dynamic active page link detection
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = header.querySelectorAll('.nav-link, .mobile-nav-item');
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isCurrent = (href === currentPath) ||
        (currentPath === '' && href === 'index.html') ||
        (currentPath === 'service-details.html' && href === 'services.html') ||
        (currentPath === 'blog-details.html' && href === 'blog.html');

      if (isCurrent) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });

    const mobileDrawer = document.getElementById('mobile-navigation-drawer');
    if (mobileDrawer) {
      document.body.appendChild(mobileDrawer);
    }

    // Attach Theme Toggle triggers
    const themeButtons = document.querySelectorAll('[data-action="toggle-theme"]');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.VenoraTheme) window.VenoraTheme.toggleTheme();
      });
    });

    // Attach Direction Toggle triggers
    const dirButtons = document.querySelectorAll('[data-action="toggle-dir"]');
    dirButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.VenoraTheme) window.VenoraTheme.toggleDirection();
      });
    });

    // 2. Profile Dropdown Interaction
    const profileBtn = document.getElementById('profile-menu-button');
    const profileMenu = document.getElementById('profile-menu-dropdown');

    if (profileBtn && profileMenu) {
      function openProfileMenu() {
        profileBtn.setAttribute('aria-expanded', 'true');
        profileMenu.hidden = false;
      }

      function closeProfileMenu() {
        profileBtn.setAttribute('aria-expanded', 'false');
        profileMenu.hidden = true;
      }

      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileBtn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeProfileMenu();
        } else {
          openProfileMenu();
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
          closeProfileMenu();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !profileMenu.hidden) {
          closeProfileMenu();
          profileBtn.focus();
        }
      });
    }

    // 3. Mobile Navigation Drawer
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const closeButtons = document.querySelectorAll('[data-action="close-mobile-nav"]');

    if (mobileToggle && mobileDrawer) {
      let previousScrollY = 0;
      let previousBodyOverflow = '';

      function openMobileDrawer() {
        previousScrollY = window.scrollY;
        previousBodyOverflow = document.body.style.overflow;
        mobileDrawer.classList.add('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMobileDrawer() {
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = previousBodyOverflow;
        window.scrollTo({ top: previousScrollY, behavior: 'instant' });
      }

      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('is-open');
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });

      closeButtons.forEach(btn => {
        btn.addEventListener('click', closeMobileDrawer);
      });

      // Close drawer on link selection
      const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-item');
      mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
          closeMobileDrawer();
          mobileToggle.focus();
        }
      });
    }

    // 4. Compact Navbar Scroll Transition
    function handleNavScroll() {
      if (window.scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run immediately on mount
  }

  /**
   * Initialize Footer behaviors (dynamic copyright year, newsletter demo handling)
   */
  function initFooter() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    const form = document.getElementById('footer-newsletter-form');
    const msg = document.getElementById('newsletter-msg');

    if (form && msg) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletter-email');
        const email = input ? input.value.trim() : '';

        if (!email || !email.includes('@') || !email.includes('.')) {
          msg.textContent = 'Please enter a valid corporate email address.';
          msg.className = 'newsletter-feedback is-error';
          return;
        }

        msg.textContent = 'Demo inquiry acknowledged. Updates will be sent once active.';
        msg.className = 'newsletter-feedback is-success';
        if (input) input.value = '';

        setTimeout(() => {
          msg.textContent = '';
          msg.className = 'newsletter-feedback';
        }, 5000);
      });
    }
  }

  /**
   * Theme-Aware Logo Switching
   * Swaps navbar and footer logos between dark-theme and light-theme variants
   */
  const LOGO_DARK = 'assets/logo/logo.png';
  const LOGO_LIGHT = 'assets/logo/logo-light.png';

  function updateThemeLogos() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const targetSrc = theme === 'light' ? LOGO_LIGHT : LOGO_DARK;

    // Update all navbar brand logos and footer logos
    const logos = document.querySelectorAll('.brand-logo, .footer-logo');
    logos.forEach(img => {
      if (img.getAttribute('src') !== targetSrc) {
        img.setAttribute('src', targetSrc);
      }
    });
  }

  /**
   * Main bootstrap sequence
   */
  async function init() {
    const [navLoaded, footerLoaded] = await Promise.all([
      loadComponent('navbar-mount', 'components/navbar.html', FALLBACK_NAVBAR),
      loadComponent('footer-mount', 'components/footer.html', FALLBACK_FOOTER)
    ]);

    if (navLoaded) {
      initNavbar();
    }
    if (footerLoaded) {
      initFooter();
    }

    // Apply correct logo for current theme after components are mounted
    updateThemeLogos();

    // Listen for future theme toggles to swap logo dynamically
    window.addEventListener('venora:theme-changed', updateThemeLogos);

    window.dispatchEvent(new CustomEvent('venora:components-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
