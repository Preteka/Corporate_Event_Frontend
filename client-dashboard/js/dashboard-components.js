/**
 * VENORA Client Dashboard - Reusable Component Renderers
 * Pure UI rendering functions for all dashboard sections, cards, tables,
 * modals, forms, and interactive views.
 * 
 * Adheres strictly to the VENORA Home 1 aesthetic:
 * - Sora headings, DM Sans body
 * - Refined gold highlights & midnight dark mode
 * - Accessible ARIA attributes & safe DOM operations
 */

(function () {
  'use strict';

  // Safe HTML Escaper to prevent any XSS issues
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Common SVG Icons
  const ICONS = {
    overview: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    services: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    enquiries: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    bookings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    eventDetails: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    payments: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
    notifications: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    support: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    mapPin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    external: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`
  };

  /**
   * Helper: Status Badge CSS class and Label
   */
  function getStatusBadge(status) {
    const s = String(status || '').toLowerCase().trim();
    let badgeClass = 'badge-neutral';
    if (s.includes('confirmed') || s.includes('paid')) badgeClass = 'badge-success';
    else if (s.includes('quote ready') || s.includes('due soon') || s.includes('awaiting approval')) badgeClass = 'badge-gold';
    else if (s.includes('under review') || s.includes('partial') || s.includes('submitted')) badgeClass = 'badge-info';
    else if (s.includes('draft') || s.includes('closed') || s.includes('past')) badgeClass = 'badge-muted';
    return `<span class="dashboard-badge ${badgeClass}">${escapeHTML(status)}</span>`;
  }

  // =========================================================================
  // 1. SECTION: OVERVIEW
  // =========================================================================
  function renderOverview() {
    const state = window.VenoraDemoData.getState();
    const metrics = window.VenoraDemoData.getMetrics();
    const client = state.client;

    const activeEnquiries = metrics.getActiveEnquiriesCount();
    const upcomingEvents = metrics.getUpcomingEventsCount();
    const pendingPayments = metrics.getPendingPaymentsAmount();
    const confirmedBookings = metrics.getConfirmedBookingsCount();

    // Primary active booking for the progress tracker
    const primaryBooking = state.bookings[0] || null;

    return `
      <div class="dashboard-section-content section-overview animate-fade-in">
        <!-- Welcome Hero Banner -->
        <div class="overview-welcome-card">
          <div class="welcome-text-group">
            <div class="welcome-eyebrow-row">
              <span class="welcome-eyebrow">CLIENT PORTAL</span>
              <span class="demo-badge-pill" title="Demonstration account with interactive sample data">
                <span class="demo-dot"></span> Demo Account
              </span>
            </div>
            <h1 class="welcome-heading">Welcome back, ${escapeHTML(client.name.split(' ')[0])}</h1>
            <p class="welcome-sub">Here is an overview of your event planning and booking activity.</p>
          </div>
          <div class="welcome-actions">
            <button type="button" class="dash-btn dash-btn-primary" data-action="open-new-enquiry-modal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>New Event Enquiry</span>
            </button>
            <a href="#services" class="dash-btn dash-btn-secondary">
              <span>Explore Services</span>
            </a>
          </div>
        </div>

        <!-- 4 Summary Cards (Calculated from demo dataset) -->
        <div class="metrics-grid">
          <!-- Card 1: Active Enquiries -->
          <div class="metric-card" tabindex="0">
            <div class="metric-header">
              <span class="metric-label">Active Enquiries</span>
              <div class="metric-icon-wrap" aria-hidden="true">${ICONS.enquiries}</div>
            </div>
            <div class="metric-value">${activeEnquiries}</div>
            <p class="metric-desc">In progress or awaiting review</p>
            <div class="metric-gold-bar"></div>
          </div>

          <!-- Card 2: Upcoming Events -->
          <div class="metric-card" tabindex="0">
            <div class="metric-header">
              <span class="metric-label">Upcoming Events</span>
              <div class="metric-icon-wrap" aria-hidden="true">${ICONS.bookings}</div>
            </div>
            <div class="metric-value">${upcomingEvents}</div>
            <p class="metric-desc">Planned corporate gatherings</p>
            <div class="metric-gold-bar"></div>
          </div>

          <!-- Card 3: Pending Payments -->
          <div class="metric-card" tabindex="0">
            <div class="metric-header">
              <span class="metric-label">Pending Payments</span>
              <div class="metric-icon-wrap" aria-hidden="true">${ICONS.payments}</div>
            </div>
            <div class="metric-value">$${pendingPayments.toLocaleString()}</div>
            <p class="metric-desc">Balance due on upcoming events</p>
            <div class="metric-gold-bar"></div>
          </div>

          <!-- Card 4: Confirmed Bookings -->
          <div class="metric-card" tabindex="0">
            <div class="metric-header">
              <span class="metric-label">Confirmed Bookings</span>
              <div class="metric-icon-wrap" aria-hidden="true">${ICONS.check}</div>
            </div>
            <div class="metric-value">${confirmedBookings}</div>
            <p class="metric-desc">Venues & schedules secured</p>
            <div class="metric-gold-bar"></div>
          </div>
        </div>

        <!-- Booking Progress Stepper Card -->
        ${primaryBooking ? `
          <div class="dashboard-panel booking-progress-panel">
            <div class="panel-header">
              <div class="panel-title-group">
                <span class="panel-eyebrow">ACTIVE MILESTONE TRACKER</span>
                <h2 class="panel-title">${escapeHTML(primaryBooking.eventName)}</h2>
                <p class="panel-sub">Reference: <strong>${escapeHTML(primaryBooking.id)}</strong> &bull; Venue: <strong>${escapeHTML(primaryBooking.venue)}</strong></p>
              </div>
              <div class="panel-status-group">
                ${getStatusBadge(primaryBooking.bookingStatus)}
              </div>
            </div>

            <div class="stepper-container" aria-label="Booking Progress Stages">
              <div class="stepper-stages">
                ${primaryBooking.stages.map((stg, idx) => `
                  <div class="stepper-stage ${stg.completed ? 'is-completed' : ''} ${stg.current ? 'is-current' : ''}">
                    <div class="stage-node">
                      <span class="stage-num">${stg.completed ? ICONS.check : (idx + 1)}</span>
                    </div>
                    <div class="stage-info">
                      <span class="stage-title">${escapeHTML(stg.name)}</span>
                      <span class="stage-date">${escapeHTML(stg.date)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="stepper-disclaimer">
                <span class="info-icon" aria-hidden="true">${ICONS.info}</span>
                <span><strong>Process note:</strong> Each booking advances through independent verification. A payment being complete does not automatically imply that the venue is confirmed. Venue confirmation requires final municipal scheduling and security hold clearance.</span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Two Column Layout: Upcoming Events & Recent Activity -->
        <div class="overview-dual-grid">
          <!-- Column 1: Upcoming Events -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <h2 class="panel-title">Upcoming Events</h2>
              <a href="#bookings" class="panel-link">View All (${state.bookings.length}) &rarr;</a>
            </div>

            <div class="events-preview-list">
              ${state.bookings.filter(b => b.bookingStatus !== 'Past').map(b => `
                <div class="event-preview-card">
                  <div class="event-img-wrap">
                    <img src="${b.venueImage}" alt="${escapeHTML(b.venue)}" loading="lazy">
                  </div>
                  <div class="event-details-wrap">
                    <div class="event-top-row">
                      <h3 class="event-name">${escapeHTML(b.eventName)}</h3>
                      ${getStatusBadge(b.bookingStatus)}
                    </div>
                    <div class="event-meta-row">
                      <span class="meta-item">${ICONS.calendar} ${escapeHTML(b.eventDate)}</span>
                      <span class="meta-item">${ICONS.mapPin} ${escapeHTML(b.venue)}</span>
                      <span class="meta-item">${ICONS.users} ${escapeHTML(b.guestCount)} delegates</span>
                    </div>
                    <div class="event-footer-row">
                      <span class="event-package-tag">${escapeHTML(b.package)}</span>
                      <button type="button" class="dash-btn-text" data-action="view-booking-details" data-id="${escapeHTML(b.id)}">
                        <span>View Details</span> &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: Recent Activity Timeline -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <h2 class="panel-title">Recent Activity</h2>
              <span class="panel-caption">Real-time event updates</span>
            </div>

            <div class="activity-timeline">
              ${state.recentActivity.map(act => `
                <div class="activity-item">
                  <div class="activity-marker marker-${act.statusColor || 'gold'}">
                    <span class="marker-dot"></span>
                  </div>
                  <div class="activity-content">
                    <div class="activity-header">
                      <h3 class="activity-title">${escapeHTML(act.title)}</h3>
                      <span class="activity-date">${escapeHTML(act.date)}</span>
                    </div>
                    <p class="activity-detail">${escapeHTML(act.detail)}</p>
                    <span class="activity-tag tag-${act.statusColor || 'gold'}">${escapeHTML(act.tag)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. SECTION: EXPLORE SERVICES (Reuses window.VenoraServices)
  // =========================================================================
  function renderServices() {
    // Access existing public services data safely
    const services = (window.VenoraServices && window.VenoraServices.getAll)
      ? window.VenoraServices.getAll()
      : [];

    const categories = (window.VenoraServices && window.VenoraServices.getCategories)
      ? window.VenoraServices.getCategories()
      : ["All Services"];

    return `
      <div class="dashboard-section-content section-services animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Explore VENORA Services</h1>
            <p class="section-sub">Browse our curated corporate event planning, venue discovery, and production services.</p>
          </div>
          <button type="button" class="dash-btn dash-btn-primary" data-action="open-new-enquiry-modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Request Custom Service</span>
          </button>
        </div>

        <!-- Category Filter Pills -->
        <div class="services-filter-pills" role="tablist" aria-label="Filter Services by Category">
          ${categories.map((cat, idx) => `
            <button type="button" class="cat-pill-btn ${idx === 0 ? 'is-active' : ''}" data-category="${escapeHTML(cat)}" role="tab" aria-selected="${idx === 0}">
              ${escapeHTML(cat)}
            </button>
          `).join('')}
        </div>

        <!-- Service Cards Grid -->
        <div class="services-card-grid" id="services-grid-container">
          ${services.map(svc => `
            <div class="service-dash-card" data-category="${escapeHTML(svc.category)}">
              <div class="service-card-media">
                <img src="../${svc.image}" alt="${escapeHTML(svc.name)}" loading="lazy">
                <span class="service-category-badge">${escapeHTML(svc.category)}</span>
              </div>
              <div class="service-card-body">
                <h2 class="service-card-title">${escapeHTML(svc.name)}</h2>
                <p class="service-card-desc">${escapeHTML(svc.shortDescription)}</p>
                <div class="service-card-actions">
                  <a href="../service-details.html?service=${encodeURIComponent(svc.slug)}" class="dash-btn-text" target="_blank" rel="noopener">
                    <span>View Details</span> ${ICONS.external}
                  </a>
                  <button type="button" class="dash-btn dash-btn-sm dash-btn-gold" data-action="make-service-enquiry" data-service-id="${escapeHTML(svc.id)}" data-service-name="${escapeHTML(svc.name)}">
                    Make an Enquiry
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. SECTION: MY ENQUIRIES
  // =========================================================================
  function renderEnquiries(filterStatus = 'all') {
    const enquiries = window.VenoraDemoData.getEnquiries(filterStatus);
    const statuses = ['all', 'draft', 'submitted', 'under review', 'quote ready', 'awaiting approval', 'closed'];

    return `
      <div class="dashboard-section-content section-enquiries animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">My Event Enquiries</h1>
            <p class="section-sub">Track requirement briefs, spatial assessments, and tailored quotes for your corporate gatherings.</p>
          </div>
          <button type="button" class="dash-btn dash-btn-primary" data-action="open-new-enquiry-modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Submit New Enquiry</span>
          </button>
        </div>

        <!-- Filter Bar -->
        <div class="table-filter-bar">
          <div class="filter-tab-group" role="tablist" aria-label="Filter Enquiries by Status">
            ${statuses.map(st => `
              <button type="button" class="filter-tab-btn ${st === filterStatus ? 'is-active' : ''}" data-filter-status="${st}" role="tab" aria-selected="${st === filterStatus}">
                ${st === 'all' ? 'All Enquiries' : st.replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            `).join('')}
          </div>
          <span class="records-count">${enquiries.length} ${enquiries.length === 1 ? 'Record' : 'Records'}</span>
        </div>

        <!-- Desktop Table View / Mobile Card View -->
        ${enquiries.length === 0 ? `
          <div class="dashboard-empty-state">
            <div class="empty-icon" aria-hidden="true">${ICONS.enquiries}</div>
            <h3 class="empty-title">No Enquiries Found</h3>
            <p class="empty-sub">There are currently no enquiries under the "${escapeHTML(filterStatus)}" filter.</p>
            <button type="button" class="dash-btn dash-btn-secondary" data-filter-status="all">Clear Filter</button>
          </div>
        ` : `
          <!-- Desktop Table -->
          <div class="dashboard-table-container desktop-only">
            <table class="dashboard-table" aria-label="Enquiries Table">
              <thead>
                <tr>
                  <th scope="col">Enquiry ID</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Requested Service</th>
                  <th scope="col">Date Submitted</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col" class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${enquiries.map(enq => `
                  <tr>
                    <td><strong class="record-id">${escapeHTML(enq.id)}</strong></td>
                    <td>
                      <div class="table-title-cell">
                        <span class="cell-primary">${escapeHTML(enq.eventName)}</span>
                        <span class="cell-secondary">${escapeHTML(enq.guestCount)} delegates &bull; ${escapeHTML(enq.eventDate)}</span>
                      </div>
                    </td>
                    <td><span class="cell-muted">${escapeHTML(enq.serviceName)}</span></td>
                    <td><span class="cell-date">${escapeHTML(enq.submissionDate)}</span></td>
                    <td>${getStatusBadge(enq.status)}</td>
                    <td><span class="cell-date">${escapeHTML(enq.lastUpdated)}</span></td>
                    <td class="text-right">
                      <div class="table-action-btns">
                        <button type="button" class="dash-btn-sm dash-btn-secondary" data-action="view-enquiry-details" data-id="${escapeHTML(enq.id)}">
                          View Details
                        </button>
                        ${enq.status === 'Quote Ready' ? `
                          <button type="button" class="dash-btn-sm dash-btn-gold" data-action="view-enquiry-details" data-id="${escapeHTML(enq.id)}">
                            Review Quote
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View -->
          <div class="dashboard-cards-list mobile-only">
            ${enquiries.map(enq => `
              <div class="mobile-record-card">
                <div class="card-top">
                  <strong class="record-id">${escapeHTML(enq.id)}</strong>
                  ${getStatusBadge(enq.status)}
                </div>
                <h3 class="card-heading">${escapeHTML(enq.eventName)}</h3>
                <div class="card-meta">
                  <div class="meta-row"><span class="meta-k">Service:</span> <span class="meta-v">${escapeHTML(enq.serviceName)}</span></div>
                  <div class="meta-row"><span class="meta-k">Event Date:</span> <span class="meta-v">${escapeHTML(enq.eventDate)}</span></div>
                  <div class="meta-row"><span class="meta-k">Delegates:</span> <span class="meta-v">${escapeHTML(enq.guestCount)}</span></div>
                  <div class="meta-row"><span class="meta-k">Updated:</span> <span class="meta-v">${escapeHTML(enq.lastUpdated)}</span></div>
                </div>
                <div class="card-actions">
                  <button type="button" class="dash-btn dash-btn-sm dash-btn-secondary w-full" data-action="view-enquiry-details" data-id="${escapeHTML(enq.id)}">
                    View Full Details
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  // =========================================================================
  // 4. SECTION: MY BOOKINGS
  // =========================================================================
  function renderBookings(filter = 'all') {
    const bookings = window.VenoraDemoData.getBookings(filter);
    const filterTabs = [
      { id: 'all', label: 'All Bookings' },
      { id: 'upcoming', label: 'Upcoming' },
      { id: 'pending', label: 'Pending Confirmation' },
      { id: 'past', label: 'Past Events' }
    ];

    return `
      <div class="dashboard-section-content section-bookings animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">My Bookings</h1>
            <p class="section-sub">Manage confirmed reservations, stage setups, dates, and dedicated concierge liaison.</p>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="table-filter-bar">
          <div class="filter-tab-group" role="tablist" aria-label="Filter Bookings">
            ${filterTabs.map(tab => `
              <button type="button" class="filter-tab-btn ${tab.id === filter ? 'is-active' : ''}" data-filter-bookings="${tab.id}" role="tab" aria-selected="${tab.id === filter}">
                ${tab.label}
              </button>
            `).join('')}
          </div>
          <span class="records-count">${bookings.length} ${bookings.length === 1 ? 'Booking' : 'Bookings'}</span>
        </div>

        <!-- Bookings List -->
        ${bookings.length === 0 ? `
          <div class="dashboard-empty-state">
            <div class="empty-icon" aria-hidden="true">${ICONS.bookings}</div>
            <h3 class="empty-title">No Bookings Found</h3>
            <p class="empty-sub">No reservations match the selected category.</p>
          </div>
        ` : `
          <div class="bookings-grid">
            ${bookings.map(b => `
              <div class="booking-card">
                <div class="booking-card-media">
                  <img src="${b.venueImage}" alt="${escapeHTML(b.venue)}" loading="lazy">
                  <div class="media-badges">
                    <span class="booking-pkg-badge">${escapeHTML(b.package)}</span>
                    ${getStatusBadge(b.bookingStatus)}
                  </div>
                </div>

                <div class="booking-card-content">
                  <div class="booking-header">
                    <div>
                      <span class="booking-ref">REF: ${escapeHTML(b.id)}</span>
                      <h2 class="booking-title">${escapeHTML(b.eventName)}</h2>
                    </div>
                  </div>

                  <div class="booking-meta-grid">
                    <div class="meta-item-box">
                      <span class="meta-label">Venue</span>
                      <strong class="meta-data">${escapeHTML(b.venue)}</strong>
                    </div>
                    <div class="meta-item-box">
                      <span class="meta-label">Date & Time</span>
                      <strong class="meta-data">${escapeHTML(b.eventDate)}</strong>
                    </div>
                    <div class="meta-item-box">
                      <span class="meta-label">Payment Status</span>
                      <strong class="meta-data">${escapeHTML(b.paymentStatus)}</strong>
                    </div>
                    <div class="meta-item-box">
                      <span class="meta-label">Total Amount</span>
                      <strong class="meta-data">$${(b.totalAmount || 0).toLocaleString()}</strong>
                    </div>
                  </div>

                  <!-- Mini Progress Bar -->
                  <div class="booking-progress-mini">
                    <div class="mini-bar-labels">
                      <span>Stage: <strong>${escapeHTML(b.bookingStage)}</strong> (${b.stageIndex}/5)</span>
                      <span>${Math.round((b.stageIndex / 5) * 100)}%</span>
                    </div>
                    <div class="mini-bar-track">
                      <div class="mini-bar-fill" style="width: ${(b.stageIndex / 5) * 100}%;"></div>
                    </div>
                  </div>

                  <div class="booking-card-footer">
                    <div class="coordinator-chip">
                      <div class="coord-avatar">${b.coordinator.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div class="coord-info">
                        <span class="coord-name">${escapeHTML(b.coordinator.name)}</span>
                        <span class="coord-role">Concierge Lead</span>
                      </div>
                    </div>
                    <button type="button" class="dash-btn dash-btn-sm dash-btn-primary" data-action="view-booking-details" data-id="${escapeHTML(b.id)}">
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  // =========================================================================
  // 5. SECTION: EVENT DETAILS (Editable browser demo)
  // =========================================================================
  function renderEventDetails(selectedBookingId = null) {
    const state = window.VenoraDemoData.getState();
    const bookings = state.bookings;
    const activeBooking = selectedBookingId
      ? (bookings.find(b => b.id === selectedBookingId) || bookings[0])
      : bookings[0];

    return `
      <div class="dashboard-section-content section-event-details animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Event Information &amp; Preferences</h1>
            <p class="section-sub">Configure scheduling, technical provisions, staging formats, and catering requirements.</p>
          </div>
          <!-- Event Selector -->
          <div class="event-picker-wrap">
            <label for="event-select-dropdown" class="sr-only">Select Event</label>
            <select id="event-select-dropdown" class="dash-select" data-action="change-event-detail-target">
              ${bookings.map(b => `
                <option value="${escapeHTML(b.id)}" ${b.id === activeBooking.id ? 'selected' : ''}>
                  ${escapeHTML(b.eventName)} (${escapeHTML(b.id)})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Demonstration Notice Banner -->
        <div class="demo-sync-notice">
          <span class="notice-icon">${ICONS.info}</span>
          <div class="notice-body">
            <strong>Browser Demo Environment:</strong>
            Edits made here are saved directly to your local browser storage for interactive evaluation. In production, this data synchronizes directly with the VENORA Event Management API.
          </div>
        </div>

        <form id="event-details-form" class="dashboard-form-grid" data-booking-id="${escapeHTML(activeBooking.id)}" novalidate>
          <!-- Section 1: General Information -->
          <div class="form-section-card">
            <h2 class="form-section-title">General Event Information</h2>
            <div class="form-row-2">
              <div class="form-group">
                <label for="event-name-input">Event Name *</label>
                <input type="text" id="event-name-input" name="eventName" class="dash-input" value="${escapeHTML(activeBooking.eventName)}" required>
              </div>
              <div class="form-group">
                <label for="event-package-input">Selected Package</label>
                <input type="text" id="event-package-input" class="dash-input is-readonly" value="${escapeHTML(activeBooking.package)}" readonly>
              </div>
            </div>

            <div class="form-row-3">
              <div class="form-group">
                <label for="event-date-input">Event Date *</label>
                <input type="date" id="event-date-input" name="eventDate" class="dash-input" value="${escapeHTML(activeBooking.dateRaw || '2026-11-20')}" required>
              </div>
              <div class="form-group">
                <label for="event-time-input">Hours / Schedule *</label>
                <input type="text" id="event-time-input" name="time" class="dash-input" value="${escapeHTML(activeBooking.time)}" required>
              </div>
              <div class="form-group">
                <label for="event-guests-input">Expected Guest Count *</label>
                <input type="number" id="event-guests-input" name="guestCount" class="dash-input" value="${escapeHTML(activeBooking.guestCount)}" min="1" max="5000" required>
              </div>
            </div>
          </div>

          <!-- Section 2: Venue & Spatial Staging -->
          <div class="form-section-card">
            <h2 class="form-section-title">Venue &amp; Staging Allocation</h2>
            <div class="form-row-2">
              <div class="form-group">
                <label for="event-venue-input">Assigned Venue</label>
                <input type="text" id="event-venue-input" name="venue" class="dash-input" value="${escapeHTML(activeBooking.venue)}">
              </div>
              <div class="form-group">
                <label for="event-location-input">Venue Address</label>
                <input type="text" id="event-location-input" class="dash-input is-readonly" value="${escapeHTML(activeBooking.venueLocation || 'San Francisco, CA')}" readonly>
              </div>
            </div>

            <div class="form-group">
              <label>Current Status &amp; Milestone</label>
              <div class="status-preview-box">
                <div>Booking Stage: <strong>${escapeHTML(activeBooking.bookingStage)}</strong> (${activeBooking.stageIndex}/5)</div>
                <div>Status: ${getStatusBadge(activeBooking.bookingStatus)}</div>
              </div>
            </div>
          </div>

          <!-- Section 3: Notes & Coordinator Specifications -->
          <div class="form-section-card">
            <h2 class="form-section-title">Coordinator Specifications &amp; Add-ons</h2>
            <div class="form-group">
              <label for="event-notes-input">Event Notes, Staging &amp; Dietary Specifications</label>
              <textarea id="event-notes-input" name="notes" class="dash-textarea" rows="4">${escapeHTML(activeBooking.notes || '')}</textarea>
              <span class="form-hint">Specify keynote AV needs, dietary restrictions, green room requirements, or schedule modifications.</span>
            </div>

            <div class="form-actions-bar">
              <div id="event-save-alert" class="inline-save-alert" hidden></div>
              <button type="submit" class="dash-btn dash-btn-primary">
                <span>Save Changes (Browser Demo)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  // =========================================================================
  // 6. SECTION: PAYMENTS & INVOICES
  // =========================================================================
  function renderPayments() {
    const metrics = window.VenoraDemoData.getMetrics();
    const invoices = window.VenoraDemoData.getInvoices();

    return `
      <div class="dashboard-section-content section-payments animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Payments &amp; Invoices</h1>
            <p class="section-sub">Review financial summaries, deposit receipts, itemized invoices, and balance schedules.</p>
          </div>
          <a href="../pricing.html" class="dash-btn dash-btn-secondary" target="_blank" rel="noopener">
            <span>View Pricing Tiers</span> ${ICONS.external}
          </a>
        </div>

        <!-- Financial Summary Cards -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Total Amount Quoted</span>
              <div class="metric-icon-wrap">${ICONS.payments}</div>
            </div>
            <div class="metric-value">$${metrics.getTotalQuotedAmount().toLocaleString()}</div>
            <p class="metric-desc">Agreed contracts total</p>
            <div class="metric-gold-bar"></div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Amount Paid</span>
              <div class="metric-icon-wrap">${ICONS.check}</div>
            </div>
            <div class="metric-value text-gold">$${metrics.getTotalPaidAmount().toLocaleString()}</div>
            <p class="metric-desc">Confirmed receipts</p>
            <div class="metric-gold-bar"></div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Remaining Balance</span>
              <div class="metric-icon-wrap">${ICONS.overview}</div>
            </div>
            <div class="metric-value">$${metrics.getTotalRemainingBalance().toLocaleString()}</div>
            <p class="metric-desc">Outstanding installments</p>
            <div class="metric-gold-bar"></div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Next Payment Due</span>
              <div class="metric-icon-wrap">${ICONS.calendar}</div>
            </div>
            <div class="metric-value text-sm-val">${escapeHTML(metrics.getNextPaymentDue())}</div>
            <p class="metric-desc">Nov 05, 2026 ($18,500)</p>
            <div class="metric-gold-bar"></div>
          </div>
        </div>

        <!-- Sandbox Integration Notice -->
        <div class="demo-sync-notice">
          <span class="notice-icon">${ICONS.info}</span>
          <div class="notice-body">
            <strong>Financial Sandbox Notice:</strong>
            This billing interface demonstrates itemized invoicing and balance accounting. To test the checkout payment workflow, click any invoice below or navigate to the public <a href="../checkout.html" target="_blank">checkout page</a>. No real funds or credit cards are charged.
          </div>
        </div>

        <!-- Invoices Table -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <h2 class="panel-title">Invoices &amp; Receipts</h2>
            <span class="records-count">${invoices.length} Invoices</span>
          </div>

          <div class="dashboard-table-container">
            <table class="dashboard-table" aria-label="Invoices Table">
              <thead>
                <tr>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Description</th>
                  <th scope="col">Issue Date</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col" class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                ${invoices.map(inv => `
                  <tr>
                    <td><strong class="record-id">${escapeHTML(inv.id)}</strong></td>
                    <td>
                      <div class="table-title-cell">
                        <span class="cell-primary">${escapeHTML(inv.description)}</span>
                        <span class="cell-secondary">${escapeHTML(inv.eventName)}</span>
                      </div>
                    </td>
                    <td><span class="cell-date">${escapeHTML(inv.issueDate)}</span></td>
                    <td><span class="cell-date">${escapeHTML(inv.dueDate)}</span></td>
                    <td><strong class="cell-amount">$${inv.amount.toLocaleString()}</strong></td>
                    <td>${getStatusBadge(inv.status)}</td>
                    <td class="text-right">
                      <button type="button" class="dash-btn-sm dash-btn-secondary" data-action="view-invoice-details" data-id="${escapeHTML(inv.id)}">
                        View Invoice
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. SECTION: NOTIFICATIONS
  // =========================================================================
  function renderNotifications(filter = 'all') {
    const notifs = window.VenoraDemoData.getNotifications(filter);
    const unreadCount = window.VenoraDemoData.getMetrics().getUnreadNotificationsCount();

    return `
      <div class="dashboard-section-content section-notifications animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Notifications</h1>
            <p class="section-sub">Activity alerts, quote deliverables, schedule confirmations, and milestone updates.</p>
          </div>
          <div class="intro-actions">
            ${unreadCount > 0 ? `
              <button type="button" class="dash-btn dash-btn-secondary" data-action="mark-all-read">
                Mark All as Read
              </button>
            ` : ''}
          </div>
        </div>

        <div class="table-filter-bar">
          <div class="filter-tab-group" role="tablist" aria-label="Filter Notifications">
            <button type="button" class="filter-tab-btn ${filter === 'all' ? 'is-active' : ''}" data-filter-notifs="all">All (${window.VenoraDemoData.getNotifications('all').length})</button>
            <button type="button" class="filter-tab-btn ${filter === 'unread' ? 'is-active' : ''}" data-filter-notifs="unread">Unread (${unreadCount})</button>
            <button type="button" class="filter-tab-btn ${filter === 'read' ? 'is-active' : ''}" data-filter-notifs="read">Read</button>
          </div>
        </div>

        <div class="notifications-list">
          ${notifs.length === 0 ? `
            <div class="dashboard-empty-state">
              <div class="empty-icon" aria-hidden="true">${ICONS.notifications}</div>
              <h3 class="empty-title">No Notifications</h3>
              <p class="empty-sub">You have no ${filter !== 'all' ? filter : ''} notifications at this time.</p>
            </div>
          ` : `
            ${notifs.map(n => `
              <div class="notification-item ${n.read ? 'is-read' : 'is-unread'}">
                <div class="notif-indicator"></div>
                <div class="notif-body">
                  <div class="notif-header">
                    <h3 class="notif-title">${escapeHTML(n.title)}</h3>
                    <span class="notif-time">${escapeHTML(n.timeAgo)}</span>
                  </div>
                  <p class="notif-message">${escapeHTML(n.message)}</p>
                  <div class="notif-actions">
                    ${n.relatedSection ? `
                      <a href="#${escapeHTML(n.relatedSection)}" class="dash-btn-text" data-action="open-related-item" data-section="${escapeHTML(n.relatedSection)}" data-id="${escapeHTML(n.relatedId || '')}">
                        <span>View Related Item</span> ${ICONS.arrowRight}
                      </a>
                    ` : ''}
                    ${!n.read ? `
                      <button type="button" class="dash-btn-text text-muted" data-action="mark-single-read" data-id="${escapeHTML(n.id)}">
                        Mark as read
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          `}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 8. SECTION: PROFILE & SETTINGS
  // =========================================================================
  function renderProfile() {
    const state = window.VenoraDemoData.getState();
    const client = state.client;
    const currentTheme = (window.VenoraTheme && window.VenoraTheme.getTheme) ? window.VenoraTheme.getTheme() : 'light';
    const currentDir = (window.VenoraTheme && window.VenoraTheme.getDirection) ? window.VenoraTheme.getDirection() : 'ltr';

    return `
      <div class="dashboard-section-content section-profile animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Profile &amp; Settings</h1>
            <p class="section-sub">Manage your corporate identity, contact details, appearance themes, and notifications.</p>
          </div>
        </div>

        <div class="profile-layout-grid">
          <!-- Left: Profile Summary Card -->
          <div class="profile-summary-card">
            <div class="profile-avatar-large">
              <span>${escapeHTML(client.avatarInitials)}</span>
            </div>
            <h2 class="profile-user-name">${escapeHTML(client.name)}</h2>
            <span class="profile-user-title">${escapeHTML(client.title)}</span>
            <span class="profile-company-tag">${escapeHTML(client.company)}</span>

            <div class="profile-stats-divider"></div>

            <div class="profile-quick-stats">
              <div class="stat-row">
                <span class="stat-k">Account Tier:</span>
                <span class="stat-v">${escapeHTML(client.tier)}</span>
              </div>
              <div class="stat-row">
                <span class="stat-k">Member Since:</span>
                <span class="stat-v">${escapeHTML(client.memberSince)}</span>
              </div>
              <div class="stat-row">
                <span class="stat-k">Account Mode:</span>
                <span class="stat-v text-gold">Demonstration</span>
              </div>
            </div>

            <div class="demo-reset-box">
              <button type="button" class="dash-btn dash-btn-secondary w-full" data-action="reset-demo-data">
                Reset Demo Data
              </button>
            </div>
          </div>

          <!-- Right: Editable Settings Form -->
          <form id="profile-settings-form" class="profile-settings-form" novalidate>
            <div class="form-section-card">
              <h2 class="form-section-title">Contact Information</h2>
              <div class="form-row-2">
                <div class="form-group">
                  <label for="prof-name">Full Name *</label>
                  <input type="text" id="prof-name" name="name" class="dash-input" value="${escapeHTML(client.name)}" required>
                </div>
                <div class="form-group">
                  <label for="prof-title">Designation / Role</label>
                  <input type="text" id="prof-title" name="title" class="dash-input" value="${escapeHTML(client.title)}">
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="prof-email">Corporate Email *</label>
                  <input type="email" id="prof-email" name="email" class="dash-input" value="${escapeHTML(client.email)}" required>
                </div>
                <div class="form-group">
                  <label for="prof-phone">Phone Number *</label>
                  <input type="tel" id="prof-phone" name="phone" class="dash-input" value="${escapeHTML(client.phone)}" required>
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="prof-company">Organization / Company</label>
                  <input type="text" id="prof-company" name="company" class="dash-input" value="${escapeHTML(client.company)}">
                </div>
                <div class="form-group">
                  <label for="prof-location">Primary Location</label>
                  <input type="text" id="prof-location" name="location" class="dash-input" value="${escapeHTML(client.location)}">
                </div>
              </div>
            </div>

            <!-- Appearance & Direction Settings -->
            <div class="form-section-card">
              <h2 class="form-section-title">Appearance &amp; Accessibility</h2>
              <div class="settings-toggle-row">
                <div class="toggle-desc">
                  <strong class="toggle-title">Theme Preference</strong>
                  <span class="toggle-sub">Switch between VENORA Light Mode (Gold &amp; White) and Dark Mode (Gold &amp; Midnight).</span>
                </div>
                <button type="button" class="dash-btn dash-btn-secondary" data-action="toggle-theme">
                  <span class="toggle-theme-label">${currentTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
                </button>
              </div>

              <div class="settings-toggle-row">
                <div class="toggle-desc">
                  <strong class="toggle-title">Layout Direction</strong>
                  <span class="toggle-sub">Toggle between LTR (Left-to-Right) and RTL (Right-to-Left) view.</span>
                </div>
                <button type="button" class="dash-btn dash-btn-secondary" data-action="toggle-dir">
                  <span class="toggle-dir-label">${currentDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL'}</span>
                </button>
              </div>
            </div>

            <!-- Notification Settings -->
            <div class="form-section-card">
              <h2 class="form-section-title">Communication Preferences</h2>
              <div class="checkbox-list">
                <label class="custom-checkbox">
                  <input type="checkbox" name="emailNotifs" ${client.preferences && client.preferences.emailNotifs ? 'checked' : ''}>
                  <span class="checkbox-box"></span>
                  <span class="checkbox-label">Email notifications for quote deliveries &amp; agreements</span>
                </label>
                <label class="custom-checkbox">
                  <input type="checkbox" name="smsAlerts" ${client.preferences && client.preferences.smsAlerts ? 'checked' : ''}>
                  <span class="checkbox-box"></span>
                  <span class="checkbox-label">SMS alerts for event-day concierge walkthroughs</span>
                </label>
                <label class="custom-checkbox">
                  <input type="checkbox" name="quoteUpdates" ${client.preferences && client.preferences.quoteUpdates ? 'checked' : ''}>
                  <span class="checkbox-box"></span>
                  <span class="checkbox-label">Priority notification when venue holds expire</span>
                </label>
              </div>

              <div class="form-actions-bar">
                <div id="profile-save-alert" class="inline-save-alert" hidden></div>
                <button type="submit" class="dash-btn dash-btn-primary">
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 9. SECTION: HELP & SUPPORT (Reuses window.VenoraConfig)
  // =========================================================================
  function renderSupport() {
    const config = window.VenoraConfig || {
      contact: {
        email: "contact@venora-venues.example.com",
        phone: "+1 (800) 555-0190",
        address: { formatted: "450 Montgomery St, Suite 1800, San Francisco, CA" }
      }
    };

    const faqs = [
      {
        q: "How do venue holds and date reservations work?",
        a: "VENORA places a tentative 10-day courtesy hold on selected spaces following your enquiry review. Holds are officially confirmed upon signed service agreement and initial reservation deposit."
      },
      {
        q: "Can I adjust catering covers and audio-visual options after quote approval?",
        a: "Yes. Final catering guest counts and specific staging equipment specifications may be updated up to 14 business days prior to your scheduled event date."
      },
      {
        q: "When is the final installment balance due?",
        a: "Typically, the remaining 50% balance is scheduled 14 business days before the event date, ensuring all catering provisions and spatial crew allocations are finalized."
      },
      {
        q: "What is VENORA's cancellation and rescheduling policy?",
        a: "Rescheduling is accommodated without penalty up to 30 days prior to event commencement, subject to venue calendar availability."
      }
    ];

    return `
      <div class="dashboard-section-content section-support animate-fade-in">
        <div class="section-intro-bar">
          <div>
            <h1 class="section-title">Help &amp; Concierge Support</h1>
            <p class="section-sub">Connect directly with the VENORA executive concierge team and review common booking questions.</p>
          </div>
          <a href="../contact.html" class="dash-btn dash-btn-primary" target="_blank" rel="noopener">
            <span>Open Public Contact Page</span> ${ICONS.external}
          </a>
        </div>

        <div class="support-dual-grid">
          <!-- Left: Official Contact Card -->
          <div class="dashboard-panel support-contact-panel">
            <h2 class="panel-title">Dedicated Concierge Desk</h2>
            <p class="panel-sub">Our executive event advisory team is available to assist with custom spatial requirements, walkthroughs, and vendor synchronization.</p>

            <div class="contact-methods-list">
              <div class="contact-method-card">
                <div class="method-icon">${ICONS.support}</div>
                <div>
                  <span class="method-label">Direct Concierge Email</span>
                  <a href="mailto:${escapeHTML(config.contact.email)}" class="method-value">${escapeHTML(config.contact.email)}</a>
                </div>
              </div>

              <div class="contact-method-card">
                <div class="method-icon">${ICONS.overview}</div>
                <div>
                  <span class="method-label">Direct Consultation Line</span>
                  <a href="tel:${escapeHTML(config.contact.phoneRaw || '+18005550190')}" class="method-value">${escapeHTML(config.contact.phone)}</a>
                </div>
              </div>

              <div class="contact-method-card">
                <div class="method-icon">${ICONS.mapPin}</div>
                <div>
                  <span class="method-label">Executive Office</span>
                  <span class="method-value">${escapeHTML(config.contact.address.formatted)}</span>
                </div>
              </div>
            </div>

            <div class="support-hours-box">
              <strong class="hours-title">Client Consultation Hours</strong>
              <div class="hours-row"><span>Monday – Friday:</span> <strong>9:00 AM – 6:00 PM PST</strong></div>
              <div class="hours-row"><span>Saturday:</span> <strong>10:00 AM – 3:00 PM PST (Walkthroughs)</strong></div>
              <div class="hours-row"><span>Sunday:</span> <strong>Event-Day Concierge Active</strong></div>
            </div>
          </div>

          <!-- Right: Frequently Asked Questions Accordion -->
          <div class="dashboard-panel">
            <h2 class="panel-title">Common Booking Questions</h2>
            <p class="panel-sub">Key guidelines regarding venue holds, quotes, and production timelines.</p>

            <div class="dash-faq-accordion">
              ${faqs.map((faq, idx) => `
                <details class="dash-faq-item" ${idx === 0 ? 'open' : ''}>
                  <summary class="dash-faq-question">
                    <span>${escapeHTML(faq.q)}</span>
                    <span class="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div class="dash-faq-answer">
                    <p>${escapeHTML(faq.a)}</p>
                  </div>
                </details>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 10. MODAL RENDERERS (Enquiry Detail, Booking Detail, Invoice Detail, New Enquiry)
  // =========================================================================

  function renderEnquiryDetailModal(enquiry) {
    if (!enquiry) return '';
    return `
      <div class="dash-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-enquiry-title">
        <div class="dash-modal-header">
          <div>
            <span class="modal-eyebrow">ENQUIRY REFERENCE &bull; ${escapeHTML(enquiry.id)}</span>
            <h2 id="modal-enquiry-title" class="modal-title">${escapeHTML(enquiry.eventName)}</h2>
          </div>
          <button type="button" class="dash-modal-close" data-action="close-modal" aria-label="Close modal">
            ${ICONS.close}
          </button>
        </div>

        <div class="dash-modal-body">
          <div class="modal-status-banner">
            <div>Current Status: ${getStatusBadge(enquiry.status)}</div>
            <div>Submitted: <strong>${escapeHTML(enquiry.submissionDate)}</strong></div>
          </div>

          <div class="modal-grid-2">
            <div class="modal-info-box">
              <span class="info-label">Service Category</span>
              <strong class="info-val">${escapeHTML(enquiry.serviceName)}</strong>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Preferred Date</span>
              <strong class="info-val">${escapeHTML(enquiry.eventDate)}</strong>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Attendee Count</span>
              <strong class="info-val">${escapeHTML(enquiry.guestCount)} delegates</strong>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Target Location</span>
              <strong class="info-val">${escapeHTML(enquiry.location)}</strong>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Preferred Space</span>
              <strong class="info-val">${escapeHTML(enquiry.preferredVenue)}</strong>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Quoted / Budget</span>
              <strong class="info-val text-gold">${enquiry.quotedAmount ? '$' + enquiry.quotedAmount.toLocaleString() : escapeHTML(enquiry.budget)}</strong>
            </div>
          </div>

          <div class="modal-block">
            <h4 class="block-heading">Catering &amp; Add-on Brief</h4>
            <p class="block-text">${escapeHTML(enquiry.cateringOption || 'None specified')}</p>
          </div>

          <div class="modal-block">
            <h4 class="block-heading">Audio-Visual &amp; Staging Brief</h4>
            <p class="block-text">${escapeHTML(enquiry.avRequirements || 'None specified')}</p>
          </div>

          <div class="modal-block">
            <h4 class="block-heading">Specific Coordinator Notes</h4>
            <p class="block-text">${escapeHTML(enquiry.notes || 'No extra notes provided.')}</p>
          </div>

          <!-- Activity Timeline -->
          <div class="modal-block">
            <h4 class="block-heading">Enquiry Milestone History</h4>
            <div class="modal-timeline">
              ${enquiry.timeline.map(item => `
                <div class="m-timeline-item">
                  <span class="m-time-date">${escapeHTML(item.date)}</span>
                  <div class="m-time-info">
                    <strong>${escapeHTML(item.title)}</strong>
                    <p>${escapeHTML(item.desc)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="dash-modal-footer">
          <button type="button" class="dash-btn dash-btn-secondary" data-action="close-modal">Close</button>
          <a href="../contact.html" class="dash-btn dash-btn-primary" target="_blank">Contact Concierge</a>
        </div>
      </div>
    `;
  }

  function renderBookingDetailModal(booking) {
    if (!booking) return '';
    return `
      <div class="dash-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-booking-title">
        <div class="dash-modal-header">
          <div>
            <span class="modal-eyebrow">BOOKING DOSSIER &bull; ${escapeHTML(booking.id)}</span>
            <h2 id="modal-booking-title" class="modal-title">${escapeHTML(booking.eventName)}</h2>
          </div>
          <button type="button" class="dash-modal-close" data-action="close-modal" aria-label="Close modal">
            ${ICONS.close}
          </button>
        </div>

        <div class="dash-modal-body">
          <div class="modal-hero-banner">
            <img src="${booking.venueImage}" alt="${escapeHTML(booking.venue)}">
            <div class="hero-overlay">
              <span class="hero-venue-name">${escapeHTML(booking.venue)}</span>
              <span class="hero-venue-loc">${escapeHTML(booking.venueLocation)}</span>
            </div>
          </div>

          <div class="modal-grid-3">
            <div class="modal-info-box">
              <span class="info-label">Date &amp; Schedule</span>
              <strong class="info-val">${escapeHTML(booking.eventDate)}</strong>
              <span class="info-sub">${escapeHTML(booking.time)}</span>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Guest Count</span>
              <strong class="info-val">${escapeHTML(booking.guestCount)} delegates</strong>
              <span class="info-sub">${escapeHTML(booking.package)}</span>
            </div>
            <div class="modal-info-box">
              <span class="info-label">Settlement Status</span>
              <strong class="info-val">${escapeHTML(booking.paymentStatus)}</strong>
              <span class="info-sub">$${(booking.paidAmount || 0).toLocaleString()} of $${(booking.totalAmount || 0).toLocaleString()}</span>
            </div>
          </div>

          <!-- Inclusions List -->
          <div class="modal-block">
            <h4 class="block-heading">Confirmed Package Inclusions</h4>
            <ul class="modal-inclusions-list">
              ${booking.inclusions.map(inc => `
                <li><span class="check-icon">${ICONS.check}</span> ${escapeHTML(inc)}</li>
              `).join('')}
            </ul>
          </div>

          <!-- Coordinator Contact Card -->
          <div class="modal-block">
            <h4 class="block-heading">Assigned Venue Director</h4>
            <div class="modal-coord-card">
              <div class="coord-avatar-lg">${booking.coordinator.name.split(' ').map(n=>n[0]).join('')}</div>
              <div>
                <strong>${escapeHTML(booking.coordinator.name)}</strong>
                <span class="coord-role-sub">${escapeHTML(booking.coordinator.role)}</span>
                <div class="coord-links">
                  <a href="mailto:${escapeHTML(booking.coordinator.email)}">${escapeHTML(booking.coordinator.email)}</a> &bull;
                  <span>${escapeHTML(booking.coordinator.phone)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dash-modal-footer">
          <button type="button" class="dash-btn dash-btn-secondary" data-action="close-modal">Close</button>
          <button type="button" class="dash-btn dash-btn-primary" data-action="switch-to-event-details" data-id="${escapeHTML(booking.id)}">Edit Event Notes</button>
        </div>
      </div>
    `;
  }

  function renderInvoiceDetailModal(invoice) {
    if (!invoice) return '';
    return `
      <div class="dash-modal-dialog invoice-modal" role="dialog" aria-modal="true" aria-labelledby="modal-invoice-title">
        <div class="dash-modal-header">
          <div>
            <span class="modal-eyebrow">TAX INVOICE &bull; VENORA EVENTS</span>
            <h2 id="modal-invoice-title" class="modal-title">${escapeHTML(invoice.id)}</h2>
          </div>
          <button type="button" class="dash-modal-close" data-action="close-modal" aria-label="Close modal">
            ${ICONS.close}
          </button>
        </div>

        <div class="dash-modal-body invoice-body">
          <div class="invoice-brand-row">
            <img src="../assets/logo/logo.png" alt="VENORA" class="invoice-logo" width="160">
            <div class="invoice-status-stamp ${invoice.status === 'Paid' ? 'stamp-paid' : 'stamp-due'}">
              ${escapeHTML(invoice.status.toUpperCase())}
            </div>
          </div>

          <div class="invoice-meta-row">
            <div>
              <span class="inv-label">Billed To:</span>
              <strong>Alex Morgan</strong><br>
              Morgan &amp; Co.<br>
              alex.morgan@example.com
            </div>
            <div class="text-right">
              <span class="inv-label">Issue Date:</span> ${escapeHTML(invoice.issueDate)}<br>
              <span class="inv-label">Due Date:</span> <strong>${escapeHTML(invoice.dueDate)}</strong><br>
              <span class="inv-label">Payment Method:</span> ${escapeHTML(invoice.paymentMethod)}
            </div>
          </div>

          <table class="invoice-items-table" aria-label="Invoice Line Items">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col" class="text-center">Qty</th>
                <th scope="col" class="text-right">Rate</th>
                <th scope="col" class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.lineItems.map(item => `
                <tr>
                  <td>${escapeHTML(item.description)}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-right">$${item.rate.toLocaleString()}</td>
                  <td class="text-right"><strong>$${item.amount.toLocaleString()}</strong></td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">Subtotal:</td>
                <td class="text-right">$${(invoice.subtotal || invoice.amount).toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">Taxes &amp; Surcharges:</td>
                <td class="text-right">$${(invoice.taxAmount || 0).toLocaleString()}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" class="text-right">Total Invoice Balance:</td>
                <td class="text-right text-gold"><strong>$${invoice.amount.toLocaleString()}</strong></td>
              </tr>
            </tfoot>
          </table>

          <div class="invoice-notice-box">
            <strong>Demonstration Sandbox Notice:</strong>
            This invoice is for client presentation and demonstration review. To explore the checkout flow, you can visit the public <a href="../checkout.html" target="_blank">checkout page</a>.
          </div>
        </div>

        <div class="dash-modal-footer">
          <button type="button" class="dash-btn dash-btn-secondary" data-action="close-modal">Close</button>
          <a href="../checkout.html" class="dash-btn dash-btn-primary" target="_blank">Open Checkout</a>
        </div>
      </div>
    `;
  }

  function renderNewEnquiryModal(preselectedServiceId = null, preselectedServiceName = null) {
    const services = (window.VenoraServices && window.VenoraServices.getAll)
      ? window.VenoraServices.getAll()
      : [];

    return `
      <div class="dash-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-new-enquiry-title">
        <div class="dash-modal-header">
          <div>
            <span class="modal-eyebrow">NEW EVENT INTAKE</span>
            <h2 id="modal-new-enquiry-title" class="modal-title">Submit Event Brief</h2>
          </div>
          <button type="button" class="dash-modal-close" data-action="close-modal" aria-label="Close modal">
            ${ICONS.close}
          </button>
        </div>

        <form id="new-enquiry-form" class="dash-modal-body" novalidate>
          <div class="form-row-2">
            <div class="form-group">
              <label for="new-enq-name">Event Name *</label>
              <input type="text" id="new-enq-name" name="eventName" class="dash-input" placeholder="e.g. Annual Executive Summit 2027" required>
            </div>
            <div class="form-group">
              <label for="new-enq-service">Requested Service *</label>
              <select id="new-enq-service" name="serviceId" class="dash-select" required>
                ${services.map(s => `
                  <option value="${escapeHTML(s.id)}" ${s.id === preselectedServiceId ? 'selected' : ''}>
                    ${escapeHTML(s.name)}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-row-3">
            <div class="form-group">
              <label for="new-enq-date">Preferred Date *</label>
              <input type="date" id="new-enq-date" name="eventDate" class="dash-input" required>
            </div>
            <div class="form-group">
              <label for="new-enq-guests">Expected Guests *</label>
              <input type="number" id="new-enq-guests" name="guestCount" class="dash-input" placeholder="e.g. 150" min="5" max="5000" required>
            </div>
            <div class="form-group">
              <label for="new-enq-location">Preferred Location *</label>
              <input type="text" id="new-enq-location" name="location" class="dash-input" placeholder="e.g. San Francisco Financial District" required>
            </div>
          </div>

          <div class="form-group">
            <label for="new-enq-budget">Estimated Budget Tier</label>
            <input type="text" id="new-enq-budget" name="budget" class="dash-input" placeholder="e.g. $30,000 - $50,000">
          </div>

          <div class="form-group">
            <label for="new-enq-catering">Catering &amp; Add-on Preference</label>
            <input type="text" id="new-enq-catering" name="cateringOption" class="dash-input" placeholder="e.g. Executive Plated Dinner & Cocktail Hour">
          </div>

          <div class="form-group">
            <label for="new-enq-av">Audio-Visual Specifications</label>
            <input type="text" id="new-enq-av" name="avRequirements" class="dash-input" placeholder="e.g. 4K Video Wall, Wireless Microphones, Live Webcast">
          </div>

          <div class="form-group">
            <label for="new-enq-notes">Additional Notes / Brief</label>
            <textarea id="new-enq-notes" name="notes" class="dash-textarea" rows="3" placeholder="Provide any architectural or spatial preferences..."></textarea>
          </div>

          <div class="dash-modal-footer">
            <button type="button" class="dash-btn dash-btn-secondary" data-action="close-modal">Cancel</button>
            <button type="submit" class="dash-btn dash-btn-primary">
              <span>Submit Enquiry</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }

  function renderLogoutConfirmModal() {
    return `
      <div class="dash-modal-dialog confirm-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-logout-title" style="max-width: 440px;">
        <div class="dash-modal-header">
          <div>
            <span class="modal-eyebrow">ACCOUNT SESSION</span>
            <h2 id="modal-logout-title" class="modal-title" style="font-size: 1.25rem;">Sign Out</h2>
          </div>
          <button type="button" class="dash-modal-close" data-action="close-modal" aria-label="Close dialog">
            ${ICONS.close}
          </button>
        </div>

        <div class="dash-modal-body" style="padding: 1.5rem 1.75rem;">
          <p class="block-text" style="font-size: 1rem; color: var(--text-primary); font-weight: 500;">
            Are you sure you want to log out?
          </p>
          <p class="form-hint" style="margin-top: 0.35rem; color: var(--text-muted);">
            You will be returned to the VENORA Portal login page.
          </p>
        </div>

        <div class="dash-modal-footer">
          <button type="button" class="dash-btn dash-btn-secondary" data-action="close-modal">Cancel</button>
          <button type="button" class="dash-btn dash-btn-primary" data-action="confirm-logout">Logout</button>
        </div>
      </div>
    `;
  }

  // Export globally
  window.VenoraDashboardComponents = {
    renderOverview,
    renderServices,
    renderEnquiries,
    renderBookings,
    renderEventDetails,
    renderPayments,
    renderNotifications,
    renderProfile,
    renderSupport,
    renderEnquiryDetailModal,
    renderBookingDetailModal,
    renderInvoiceDetailModal,
    renderNewEnquiryModal,
    renderLogoutConfirmModal,
    ICONS
  };
})();
