/**
 * VENORA Admin Dashboard - Navigation & Router Controller
 * Manages hash-based routing, mobile drawer toggle, active sidebar item states,
 * breadcrumb synchronizations, and unread notification badges.
 */

(function () {
  'use strict';

  const mainCanvas = document.getElementById('dashboard-main-content');
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const topbarTitle = document.getElementById('dash-topbar-title');
  const breadcrumbCurrent = document.getElementById('dash-breadcrumb-current');
  const mobileToggle = document.getElementById('sidebar-mobile-toggle');
  const closeBtn = document.getElementById('sidebar-close-btn');

  let currentSection = 'overview';
  let activeFilters = {};

  const sectionMetadata = {
    overview: { title: "Dashboard Overview", breadcrumb: "Overview" },
    venues: { title: "Venue Management", breadcrumb: "Venues" },
    services: { title: "Services Management", breadcrumb: "Services" },
    pricing: { title: "Pricing & Packages", breadcrumb: "Pricing & Packages" },
    blogs: { title: "Blog & Editorial Management", breadcrumb: "Blog Management" },
    enquiries: { title: "Enquiries Management", breadcrumb: "Enquiries" },
    quotes: { title: "Quotes Management", breadcrumb: "Quotes" },
    bookings: { title: "Bookings Management", breadcrumb: "Bookings" },
    clients: { title: "Client Directory", breadcrumb: "Clients" },
    payments: { title: "Payments & Invoices", breadcrumb: "Payments & Invoices" },
    reports: { title: "Reports & Analytics", breadcrumb: "Reports" },
    notifications: { title: "Notifications Center", breadcrumb: "Notifications" },
    settings: { title: "Website Settings", breadcrumb: "Website Settings" }
  };

  const AdminNav = {
    init: function () {
      // 1. Mobile Drawer Listeners
      if (mobileToggle) {
        mobileToggle.addEventListener('click', AdminNav.openDrawer);
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', AdminNav.closeDrawer);
      }
      if (backdrop) {
        backdrop.addEventListener('click', AdminNav.closeDrawer);
      }

      // Close drawer on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('drawer-open')) {
          AdminNav.closeDrawer();
        }
      });

      // 2. Hash Routing Listener
      window.addEventListener('hashchange', AdminNav.handleHashChange);

      // 3. Initial Route Determination
      AdminNav.handleHashChange();

      // 4. Update Badges
      AdminNav.updateBadges();
    },

    openDrawer: function () {
      if (sidebar) sidebar.classList.add('drawer-open');
      if (backdrop) backdrop.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    },

    closeDrawer: function () {
      if (sidebar) sidebar.classList.remove('drawer-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      document.body.style.overflow = '';
    },

    handleHashChange: function () {
      const rawHash = window.location.hash.replace(/^#/, '');
      const section = rawHash || 'overview';

      AdminNav.navigateTo(section, activeFilters);
    },

    navigateTo: function (section, filterParams = {}) {
      if (!sectionMetadata[section]) {
        section = 'overview';
      }

      currentSection = section;
      activeFilters = filterParams;

      // Update URL hash cleanly if differing
      if (window.location.hash !== `#${section}`) {
        history.replaceState(null, '', `#${section}`);
      }

      // Update Topbar
      const meta = sectionMetadata[section];
      if (topbarTitle) topbarTitle.textContent = meta.title;
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = meta.breadcrumb;

      // Update Sidebar Navigation Active Links
      const navLinks = document.querySelectorAll('.dash-nav-link');
      navLinks.forEach(link => {
        if (link.getAttribute('data-section') === section) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });

      // Render Section View Content
      AdminNav.renderCurrentView();

      // Close mobile drawer upon navigation
      AdminNav.closeDrawer();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Synchronize badges
      AdminNav.updateBadges();
    },

    renderCurrentView: function () {
      if (!mainCanvas || !window.VenoraAdminComponents) return;

      switch (currentSection) {
        case 'overview':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderOverview();
          break;
        case 'venues':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderVenues(activeFilters);
          break;
        case 'services':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderServices(activeFilters);
          break;
        case 'pricing':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderPricing();
          break;
        case 'blogs':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderBlogs(activeFilters);
          break;
        case 'enquiries':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderEnquiries(activeFilters);
          break;
        case 'quotes':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderQuotes(activeFilters);
          break;
        case 'bookings':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderBookings(activeFilters);
          break;
        case 'clients':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderClients(activeFilters);
          break;
        case 'payments':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderPayments(activeFilters);
          break;
        case 'reports':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderReports();
          break;
        case 'notifications':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderNotifications(activeFilters.notifFilter || 'all');
          break;
        case 'settings':
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderSettings();
          break;
        default:
          mainCanvas.innerHTML = window.VenoraAdminComponents.renderOverview();
      }

      // Attach view-specific interactive event handlers
      AdminNav.attachViewEventHandlers();
    },

    refreshCurrentSection: function () {
      AdminNav.renderCurrentView();
      AdminNav.updateBadges();
    },

    updateBadges: function () {
      if (!window.VenoraAdminData) return;
      const unreadCount = window.VenoraAdminData.getUnreadNotificationsCount();

      const badgePills = document.querySelectorAll('[data-badge="admin-notifs-count"]');
      badgePills.forEach(badge => {
        badge.textContent = unreadCount;
        if (unreadCount > 0) {
          badge.removeAttribute('hidden');
        } else {
          badge.setAttribute('hidden', '');
        }
      });
    },

    attachViewEventHandlers: function () {
      // Summary Card click transitions on Overview
      const summaryCards = document.querySelectorAll('.summary-card[data-navigate]');
      summaryCards.forEach(card => {
        card.addEventListener('click', () => {
          const target = card.getAttribute('data-navigate');
          const filter = card.getAttribute('data-filter');
          const filterParams = {};
          if (filter) {
            if (target === 'enquiries') filterParams.status = filter;
            if (target === 'bookings') {
              if (filter === 'upcoming') filterParams.timeline = 'upcoming';
              else filterParams.status = filter;
            }
          }
          AdminNav.navigateTo(target, filterParams);
        });
      });

      // Add Venue Button (Overview & Venues header)
      const addVenueTop = document.getElementById('overview-add-venue-btn') || document.getElementById('btn-add-venue-top');
      if (addVenueTop && window.VenoraAdminForms) {
        addVenueTop.addEventListener('click', () => {
          window.VenoraAdminForms.showVenueModal(null);
        });
      }

      // Add Blog Button
      const addBlogTop = document.getElementById('btn-add-blog-top');
      if (addBlogTop && window.VenoraAdminForms) {
        addBlogTop.addEventListener('click', () => {
          window.VenoraAdminForms.showBlogModal(null);
        });
      }

      // Prepare Quote Button
      const createQuoteTop = document.getElementById('btn-create-quote-top');
      if (createQuoteTop && window.VenoraAdminForms) {
        createQuoteTop.addEventListener('click', () => {
          window.VenoraAdminForms.showQuoteModal(null, null);
        });
      }

      // Enquiries View / Review Buttons
      const enqViewBtns = document.querySelectorAll('[data-action="view-enquiry"]');
      enqViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showEnquiryDetails(id);
        });
      });

      // Venue Edit & Archive
      const editVenueBtns = document.querySelectorAll('[data-action="edit-venue"]');
      editVenueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showVenueModal(id);
        });
      });

      const archiveVenueBtns = document.querySelectorAll('[data-action="archive-venue"]');
      archiveVenueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm('Are you sure you want to archive this venue? It will be removed from active public discovery.')) {
            window.VenoraAdminData.deleteVenue(id);
            AdminNav.refreshCurrentSection();
          }
        });
      });

      // Quote Edit
      const editQuoteBtns = document.querySelectorAll('[data-action="edit-quote"]');
      editQuoteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showQuoteModal(id);
        });
      });

      // Booking Details
      const viewBookingBtns = document.querySelectorAll('[data-action="view-booking"]');
      viewBookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showBookingDetails(id);
        });
      });

      // Client Dossier
      const viewClientBtns = document.querySelectorAll('[data-action="view-client"]');
      viewClientBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showClientDossier(id);
        });
      });

      // Invoices View
      const viewInvoiceBtns = document.querySelectorAll('[data-action="view-invoice"]');
      viewInvoiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showInvoiceModal(id);
        });
      });

      // Blog Edit
      const editBlogBtns = document.querySelectorAll('[data-action="edit-blog"]');
      editBlogBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const slug = btn.getAttribute('data-slug');
          if (window.VenoraAdminForms) window.VenoraAdminForms.showBlogModal(slug);
        });
      });

      // Service Edit Params
      const editServiceBtns = document.querySelectorAll('[data-action="edit-service"]');
      editServiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          alert(`Service "${id}" parameters are connected to the central services catalogue. Edits apply to public listing and client portals in demo mode.`);
        });
      });

      // Pricing Edit Package
      const editPkgBtns = document.querySelectorAll('[data-action="edit-package"]');
      editPkgBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          alert(`Package "${id.toUpperCase()}" is currently operating in "Request a Quote" mode matching the public Pricing page.`);
        });
      });

      // Notifications actions
      const markAllReadBtn = document.getElementById('btn-mark-all-read');
      if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
          window.VenoraAdminData.markAllNotificationsRead();
          AdminNav.refreshCurrentSection();
        });
      }

      const markReadBtns = document.querySelectorAll('[data-action="mark-read"]');
      markReadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          window.VenoraAdminData.markNotificationRead(id);
          AdminNav.refreshCurrentSection();
        });
      });

      const notifFilterBtns = document.querySelectorAll('[data-action="filter-notifs"]');
      notifFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');
          activeFilters.notifFilter = filter;
          AdminNav.refreshCurrentSection();
        });
      });

      // Settings Save & Reset
      const saveSettingsBtn = document.getElementById('btn-save-settings');
      if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
          const newSettings = {
            brandName: document.getElementById('setting-brand').value,
            adminContactEmail: document.getElementById('setting-email').value,
            adminPhone: document.getElementById('setting-phone').value,
            officeAddress: document.getElementById('setting-address').value,
            officeHoursWeekday: document.getElementById('setting-hours-week').value,
            officeHoursSaturday: document.getElementById('setting-hours-sat').value
          };
          window.VenoraAdminData.saveSettings(newSettings);
          alert('Website settings updated successfully for demo preview.');
        });
      }

      const resetDemoBtn = document.getElementById('btn-reset-demo-all');
      if (resetDemoBtn) {
        resetDemoBtn.addEventListener('click', () => {
          if (confirm('Reset all demo records (venues, enquiries, quotes, bookings, invoices) to clean development state?')) {
            window.VenoraAdminData.resetDemoData();
            AdminNav.refreshCurrentSection();
          }
        });
      }

      // Filter Inputs & Selects wiring
      AdminNav.attachFilterInputs();
    },

    attachFilterInputs: function () {
      // Venues Filters
      const venueSearch = document.getElementById('venue-search-input');
      const venueCat = document.getElementById('venue-filter-cat');
      const venueStatus = document.getElementById('venue-filter-status');

      if (venueSearch) {
        venueSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (venueCat) {
        venueCat.addEventListener('change', (e) => {
          activeFilters.category = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (venueStatus) {
        venueStatus.addEventListener('change', (e) => {
          activeFilters.status = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Enquiries Filters
      const enqSearch = document.getElementById('enq-search-input');
      const enqStatus = document.getElementById('enq-filter-status');

      if (enqSearch) {
        enqSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (enqStatus) {
        enqStatus.addEventListener('change', (e) => {
          activeFilters.status = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Bookings Filters
      const bkgSearch = document.getElementById('booking-search-input');
      const bkgTimeline = document.getElementById('booking-filter-timeline');
      const bkgStatus = document.getElementById('booking-filter-status');

      if (bkgSearch) {
        bkgSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (bkgTimeline) {
        bkgTimeline.addEventListener('change', (e) => {
          activeFilters.timeline = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (bkgStatus) {
        bkgStatus.addEventListener('change', (e) => {
          activeFilters.status = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Quotes Filters
      const quoteSearch = document.getElementById('quote-search-input');
      const quoteStatus = document.getElementById('quote-filter-status');

      if (quoteSearch) {
        quoteSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (quoteStatus) {
        quoteStatus.addEventListener('change', (e) => {
          activeFilters.status = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Invoices Filters
      const invSearch = document.getElementById('inv-search-input');
      const invStatus = document.getElementById('inv-filter-status');

      if (invSearch) {
        invSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (invStatus) {
        invStatus.addEventListener('change', (e) => {
          activeFilters.status = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Clients Search
      const clientSearch = document.getElementById('client-search-input');
      if (clientSearch) {
        clientSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }

      // Blogs Search & Cat
      const blogSearch = document.getElementById('blog-search-input');
      const blogCat = document.getElementById('blog-filter-cat');

      if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
          activeFilters.search = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
      if (blogCat) {
        blogCat.addEventListener('change', (e) => {
          activeFilters.category = e.target.value;
          AdminNav.renderCurrentView();
        });
      }
    }
  };

  window.VenoraAdminNav = AdminNav;
})();
