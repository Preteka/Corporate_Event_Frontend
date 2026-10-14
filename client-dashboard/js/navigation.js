/**
 * VENORA Client Dashboard - Navigation, Routing & Interaction Engine
 * Manages section switching, mobile drawer navigation, topbar breadcrumbs,
 * search filtering, modal management, and event delegations.
 */

(function () {
  'use strict';

  // Section titles and breadcrumb metadata
  const SECTIONS = {
    'overview': { title: 'Dashboard Overview', breadcrumb: 'Overview' },
    'services': { title: 'Explore Services', breadcrumb: 'Explore Services' },
    'enquiries': { title: 'My Enquiries', breadcrumb: 'My Enquiries' },
    'bookings': { title: 'My Bookings', breadcrumb: 'My Bookings' },
    'event-details': { title: 'Event Details', breadcrumb: 'Event Details' },
    'payments': { title: 'Payments & Invoices', breadcrumb: 'Payments & Invoices' },
    'notifications': { title: 'Notifications', breadcrumb: 'Notifications' },
    'settings': { title: 'Profile & Settings', breadcrumb: 'Profile & Settings' },
    'support': { title: 'Help & Concierge Support', breadcrumb: 'Help & Support' }
  };

  let currentSection = 'overview';
  let lastActiveElement = null;

  /**
   * Helper: Get target section from URL hash or default to 'overview'
   */
  function getSectionFromHash() {
    const hash = window.location.hash.replace('#', '').trim().toLowerCase();
    return SECTIONS[hash] ? hash : 'overview';
  }

  /**
   * Switch the active section
   */
  function navigateTo(sectionKey, extraParam = null) {
    if (!SECTIONS[sectionKey]) sectionKey = 'overview';
    currentSection = sectionKey;

    // Update URL hash without extra reload
    if (window.location.hash !== `#${sectionKey}`) {
      window.location.hash = `#${sectionKey}`;
    }

    // Update Sidebar Navigation state
    const navLinks = document.querySelectorAll('.dash-nav-link');
    navLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      const isActive = target === sectionKey;
      link.classList.toggle('is-active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Update Topbar Section Title & Breadcrumb
    const topbarTitle = document.getElementById('dash-topbar-title');
    const breadcrumbCurrent = document.getElementById('dash-breadcrumb-current');
    if (topbarTitle) topbarTitle.textContent = SECTIONS[sectionKey].title;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = SECTIONS[sectionKey].breadcrumb;

    // Render section content
    const mainContainer = document.getElementById('dashboard-main-content');
    if (!mainContainer) return;

    // Clear previous search input if any
    const searchInput = document.getElementById('dash-quick-search');
    if (searchInput) searchInput.value = '';

    const C = window.VenoraDashboardComponents;
    if (!C) return;

    let contentHTML = '';
    switch (sectionKey) {
      case 'overview':
        contentHTML = C.renderOverview();
        break;
      case 'services':
        contentHTML = C.renderServices();
        break;
      case 'enquiries':
        contentHTML = C.renderEnquiries(extraParam || 'all');
        break;
      case 'bookings':
        contentHTML = C.renderBookings(extraParam || 'all');
        break;
      case 'event-details':
        contentHTML = C.renderEventDetails(extraParam);
        break;
      case 'payments':
        contentHTML = C.renderPayments();
        break;
      case 'notifications':
        contentHTML = C.renderNotifications(extraParam || 'all');
        break;
      case 'settings':
        contentHTML = C.renderProfile();
        break;
      case 'support':
        contentHTML = C.renderSupport();
        break;
      default:
        contentHTML = C.renderOverview();
    }

    mainContainer.innerHTML = contentHTML;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile drawer if open
    closeMobileDrawer();

    // Update unread badges
    updateBadges();
  }

  /**
   * Update Notification Badge counters
   */
  function updateBadges() {
    const unreadCount = window.VenoraDemoData ? window.VenoraDemoData.getMetrics().getUnreadNotificationsCount() : 0;
    const badgeElements = document.querySelectorAll('[data-badge="notifications-count"]');
    badgeElements.forEach(el => {
      el.textContent = unreadCount;
      el.hidden = unreadCount === 0;
    });
  }

  /**
   * Mobile Sidebar Drawer Handling
   */
  function openMobileDrawer() {
    const drawer = document.getElementById('dashboard-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (drawer) drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('dashboard-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (drawer) drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /**
   * Global Modal Manager
   */
  function openModal(modalHTML) {
    const container = document.getElementById('dashboard-modal-container');
    if (!container) return;

    lastActiveElement = document.activeElement;
    container.innerHTML = modalHTML;
    container.hidden = false;
    container.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus the first input or close button
    const focusable = container.querySelector('button, input, select, textarea, [tabindex="0"]');
    if (focusable) focusable.focus();
  }

  function closeModal() {
    const container = document.getElementById('dashboard-modal-container');
    if (!container) return;

    container.classList.remove('is-open');
    container.hidden = true;
    container.innerHTML = '';
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  /**
   * Quick Search Filter across the dashboard view
   */
  function handleQuickSearch(query) {
    const q = query.toLowerCase().trim();
    const mainContainer = document.getElementById('dashboard-main-content');
    if (!mainContainer) return;

    // Filter cards or table rows in current section
    const tableRows = mainContainer.querySelectorAll('tbody tr');
    if (tableRows.length > 0) {
      tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
      return;
    }

    const cards = mainContainer.querySelectorAll('.service-dash-card, .booking-card, .event-preview-card, .mobile-record-card, .notification-item');
    if (cards.length > 0) {
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    }
  }

  /**
   * Global Click / Interaction Delegations
   */
  function initEventDelegation() {
    // 1. Hash change routing
    window.addEventListener('hashchange', () => {
      const newSec = getSectionFromHash();
      if (newSec !== currentSection) {
        navigateTo(newSec);
      }
    });

    // 2. Global Document Click Delegations
    document.addEventListener('click', (e) => {
      // Sidebar link clicked
      const navLink = e.target.closest('.dash-nav-link');
      if (navLink) {
        const section = navLink.getAttribute('data-section');
        if (section) {
          e.preventDefault();
          navigateTo(section);
        }
        return;
      }

      // Mobile hamburger button
      if (e.target.closest('#sidebar-mobile-toggle')) {
        e.preventDefault();
        openMobileDrawer();
        return;
      }

      // Close mobile drawer button or backdrop
      if (e.target.closest('#sidebar-close-btn') || e.target.closest('#sidebar-backdrop')) {
        e.preventDefault();
        closeMobileDrawer();
        return;
      }

      // Modal close triggers
      if (e.target.closest('[data-action="close-modal"]')) {
        e.preventDefault();
        closeModal();
        return;
      }

      // Click outside modal dialog to close
      const modalContainer = document.getElementById('dashboard-modal-container');
      if (modalContainer && e.target === modalContainer) {
        closeModal();
        return;
      }

      // Open New Enquiry Modal
      if (e.target.closest('[data-action="open-new-enquiry-modal"]')) {
        e.preventDefault();
        const html = window.VenoraDashboardComponents.renderNewEnquiryModal();
        openModal(html);
        return;
      }

      // Make service enquiry from Explore Services card
      const serviceEnqBtn = e.target.closest('[data-action="make-service-enquiry"]');
      if (serviceEnqBtn) {
        e.preventDefault();
        const svcId = serviceEnqBtn.getAttribute('data-service-id');
        const svcName = serviceEnqBtn.getAttribute('data-service-name');
        const html = window.VenoraDashboardComponents.renderNewEnquiryModal(svcId, svcName);
        openModal(html);
        return;
      }

      // View Enquiry Details Modal
      const viewEnqBtn = e.target.closest('[data-action="view-enquiry-details"]');
      if (viewEnqBtn) {
        e.preventDefault();
        const enqId = viewEnqBtn.getAttribute('data-id');
        const enq = window.VenoraDemoData.getEnquiryById(enqId);
        if (enq) {
          const html = window.VenoraDashboardComponents.renderEnquiryDetailModal(enq);
          openModal(html);
        }
        return;
      }

      // View Booking Details Modal
      const viewBkgBtn = e.target.closest('[data-action="view-booking-details"]');
      if (viewBkgBtn) {
        e.preventDefault();
        const bkgId = viewBkgBtn.getAttribute('data-id');
        const bkg = window.VenoraDemoData.getBookingById(bkgId);
        if (bkg) {
          const html = window.VenoraDashboardComponents.renderBookingDetailModal(bkg);
          openModal(html);
        }
        return;
      }

      // Switch to Event Details from modal
      const editFromModal = e.target.closest('[data-action="switch-to-event-details"]');
      if (editFromModal) {
        e.preventDefault();
        const bkgId = editFromModal.getAttribute('data-id');
        closeModal();
        navigateTo('event-details', bkgId);
        return;
      }

      // View Invoice Modal
      const viewInvBtn = e.target.closest('[data-action="view-invoice-details"]');
      if (viewInvBtn) {
        e.preventDefault();
        const invId = viewInvBtn.getAttribute('data-id');
        const inv = window.VenoraDemoData.getInvoiceById(invId);
        if (inv) {
          const html = window.VenoraDashboardComponents.renderInvoiceDetailModal(inv);
          openModal(html);
        }
        return;
      }

      // Filter Services by Category
      const catPill = e.target.closest('.cat-pill-btn');
      if (catPill) {
        e.preventDefault();
        const pills = document.querySelectorAll('.cat-pill-btn');
        pills.forEach(p => p.classList.remove('is-active'));
        catPill.classList.add('is-active');

        const cat = catPill.getAttribute('data-category');
        const cards = document.querySelectorAll('.service-dash-card');
        cards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'All Services' || cardCat === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
        return;
      }

      // Filter Enquiries by status tab
      const enqFilterBtn = e.target.closest('[data-filter-status]');
      if (enqFilterBtn) {
        e.preventDefault();
        const status = enqFilterBtn.getAttribute('data-filter-status');
        navigateTo('enquiries', status);
        return;
      }

      // Filter Bookings tab
      const bkgFilterBtn = e.target.closest('[data-filter-bookings]');
      if (bkgFilterBtn) {
        e.preventDefault();
        const filter = bkgFilterBtn.getAttribute('data-filter-bookings');
        navigateTo('bookings', filter);
        return;
      }

      // Filter Notifications tab
      const notifFilterBtn = e.target.closest('[data-filter-notifs]');
      if (notifFilterBtn) {
        e.preventDefault();
        const filter = notifFilterBtn.getAttribute('data-filter-notifs');
        navigateTo('notifications', filter);
        return;
      }

      // Mark single notification read
      const markSingleBtn = e.target.closest('[data-action="mark-single-read"]');
      if (markSingleBtn) {
        e.preventDefault();
        const notifId = markSingleBtn.getAttribute('data-id');
        window.VenoraDemoData.markNotificationRead(notifId);
        navigateTo('notifications');
        return;
      }

      // Mark all notifications read
      if (e.target.closest('[data-action="mark-all-read"]')) {
        e.preventDefault();
        window.VenoraDemoData.markAllNotificationsRead();
        navigateTo('notifications');
        return;
      }

      // Trigger Logout dialog
      if (e.target.closest('[data-action="trigger-logout"]')) {
        e.preventDefault();
        const html = window.VenoraDashboardComponents.renderLogoutConfirmModal();
        openModal(html);
        return;
      }

      // Confirm Logout action
      if (e.target.closest('[data-action="confirm-logout"]')) {
        e.preventDefault();
        closeModal();

        // Clear only relevant authentication/demo session state
        if (window.VenoraAuth && typeof window.VenoraAuth.clearSession === 'function') {
          window.VenoraAuth.clearSession();
        } else {
          sessionStorage.removeItem('venora_active_session');
          localStorage.removeItem('venora_active_session');
        }

        try {
          localStorage.removeItem('venora_client_dashboard_state_v1');
        } catch (err) {
          // ignore
        }

        // Return user to existing login page
        window.location.href = '../login.html';
        return;
      }

      // Reset Demo Data (if triggered from profile)
      if (e.target.closest('[data-action="reset-demo-data"]')) {
        e.preventDefault();
        if (confirm("Reset all client dashboard data back to the default demonstration state?")) {
          window.VenoraDemoData.resetState();
          alert("Demo dataset restored to initial state.");
          navigateTo('overview');
        }
        return;
      }

      // Theme toggle from topbar or settings
      if (e.target.closest('[data-action="toggle-theme"]')) {
        e.preventDefault();
        if (window.VenoraTheme) window.VenoraTheme.toggleTheme();
        return;
      }

      // Direction toggle from topbar or settings
      if (e.target.closest('[data-action="toggle-dir"]')) {
        e.preventDefault();
        if (window.VenoraTheme) window.VenoraTheme.toggleDirection();
        return;
      }
    });

    // 3. Form Submissions
    document.addEventListener('submit', (e) => {
      // New Enquiry Form submission
      if (e.target && e.target.id === 'new-enquiry-form') {
        e.preventDefault();
        const form = e.target;
        const eventName = form.eventName.value.trim();
        const serviceId = form.serviceId.value;
        const eventDate = form.eventDate.value;
        const guestCount = form.guestCount.value;
        const location = form.location.value.trim();
        const budget = form.budget ? form.budget.value.trim() : '';
        const cateringOption = form.cateringOption ? form.cateringOption.value.trim() : '';
        const avRequirements = form.avRequirements ? form.avRequirements.value.trim() : '';
        const notes = form.notes ? form.notes.value.trim() : '';

        if (!eventName || !eventDate || !guestCount || !location) {
          alert('Please fill in the required fields marked with *');
          return;
        }

        // Find service name
        let serviceName = "Venue Discovery";
        if (window.VenoraServices) {
          const s = window.VenoraServices.getBySlug(serviceId);
          if (s) serviceName = s.name;
        }

        window.VenoraDemoData.createEnquiry({
          eventName,
          serviceId,
          serviceName,
          eventDate,
          guestCount,
          location,
          budget,
          cateringOption,
          avRequirements,
          notes
        });

        closeModal();
        alert(`Success! Enquiry for "${eventName}" submitted. VENORA Concierge will review your brief.`);
        navigateTo('enquiries');
        return;
      }

      // Event Details Form submission
      if (e.target && e.target.id === 'event-details-form') {
        e.preventDefault();
        const form = e.target;
        const bookingId = form.getAttribute('data-booking-id');
        const alertEl = document.getElementById('event-save-alert');

        const updated = window.VenoraDemoData.updateEventDetails(bookingId, {
          eventName: form.eventName.value.trim(),
          eventDate: form.eventDate.value,
          time: form.time.value.trim(),
          guestCount: form.guestCount.value,
          venue: form.venue.value.trim(),
          notes: form.notes.value.trim()
        });

        if (alertEl) {
          alertEl.textContent = "Changes saved in browser demo! In production, this synchronizes with the VENORA API.";
          alertEl.className = "inline-save-alert is-success";
          alertEl.hidden = false;
          setTimeout(() => { alertEl.hidden = true; }, 4000);
        }
        return;
      }

      // Profile Form submission
      if (e.target && e.target.id === 'profile-settings-form') {
        e.preventDefault();
        const form = e.target;
        const alertEl = document.getElementById('profile-save-alert');

        window.VenoraDemoData.updateClient({
          name: form.name.value.trim(),
          title: form.title.value.trim(),
          email: form.email.value.trim(),
          phone: form.phone.value.trim(),
          company: form.company.value.trim(),
          location: form.location.value.trim(),
          preferences: {
            emailNotifs: form.emailNotifs ? form.emailNotifs.checked : false,
            smsAlerts: form.smsAlerts ? form.smsAlerts.checked : false,
            quoteUpdates: form.quoteUpdates ? form.quoteUpdates.checked : false
          }
        });

        // Update Topbar Client Avatar & Name
        updateClientUI();

        if (alertEl) {
          alertEl.textContent = "Profile updated successfully in browser session.";
          alertEl.className = "inline-save-alert is-success";
          alertEl.hidden = false;
          setTimeout(() => { alertEl.hidden = true; }, 4000);
        }
        return;
      }
    });

    // 4. Change Event Picker in Event Details
    document.addEventListener('change', (e) => {
      if (e.target && e.target.getAttribute('data-action') === 'change-event-detail-target') {
        const bkgId = e.target.value;
        navigateTo('event-details', bkgId);
      }
    });

    // 5. Quick search input listener
    const searchInput = document.getElementById('dash-quick-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        handleQuickSearch(e.target.value);
      });
    }

    // 6. Escape Key Listener for Modals and Drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modalContainer = document.getElementById('dashboard-modal-container');
        if (modalContainer && !modalContainer.hidden) {
          closeModal();
          return;
        }

        const drawer = document.getElementById('dashboard-sidebar');
        if (drawer && drawer.classList.contains('is-open')) {
          closeMobileDrawer();
          return;
        }
      }
    });

    // 7. Theme changed listener
    window.addEventListener('venora:theme-changed', (e) => {
      const theme = e.detail.theme;
      const themeLabels = document.querySelectorAll('.toggle-theme-label');
      themeLabels.forEach(lbl => {
        lbl.textContent = theme === 'dark' ? 'Switch to Light' : 'Switch to Dark';
      });
    });

    // 8. Direction changed listener
    window.addEventListener('venora:dir-changed', (e) => {
      const dir = e.detail.dir;
      const dirLabels = document.querySelectorAll('.toggle-dir-label');
      dirLabels.forEach(lbl => {
        lbl.textContent = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL';
      });
    });
  }

  /**
   * Update topbar client name and avatar
   */
  function updateClientUI() {
    const client = window.VenoraDemoData.getState().client;
    const nameEl = document.getElementById('topbar-client-name');
    const avatarInitialsEl = document.getElementById('topbar-avatar-initials');

    if (nameEl) nameEl.textContent = client.name;
    if (avatarInitialsEl) avatarInitialsEl.textContent = client.avatarInitials;
  }

  // Export
  window.VenoraDashboardNav = {
    init: function () {
      initEventDelegation();
      updateClientUI();
      updateBadges();
      const initialSection = getSectionFromHash();
      navigateTo(initialSection);
    },
    navigateTo,
    openModal,
    closeModal,
    updateBadges
  };
})();
