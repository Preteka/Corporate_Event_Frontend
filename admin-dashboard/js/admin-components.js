/**
 * VENORA Admin Dashboard - Section Renderers & Component Engine
 * Generates all 13 functional view canvases using Home 1 design principles:
 * Sora typography, refined gold accents, elegant cards, responsive data tables,
 * and CSS-based visualizations.
 */

(function () {
  'use strict';

  const AdminComponents = {
    // ------------------------------------------------------------------------
    // 1. Overview Dashboard
    // ------------------------------------------------------------------------
    renderOverview: function () {
      const metrics = window.VenoraAdminData.getOverviewMetrics();
      const enquiries = window.VenoraAdminData.getEnquiries().slice(0, 5);
      const bookings = window.VenoraAdminData.getBookings().slice(0, 4);
      const activity = window.VenoraAdminData.getActivityLog().slice(0, 5);
      const allEnquiries = window.VenoraAdminData.getEnquiries();

      // Calculate pipeline status counts for visualization
      const statusCounts = {
        'Draft': allEnquiries.filter(e => e.status === 'Draft').length,
        'Under Review': allEnquiries.filter(e => e.status === 'Under Review' || e.status === 'Submitted').length,
        'Quote Ready': allEnquiries.filter(e => e.status === 'Quote Ready').length,
        'Awaiting Approval': allEnquiries.filter(e => e.status === 'Awaiting Client Approval').length,
        'Closed': allEnquiries.filter(e => e.status === 'Closed').length
      };

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Dashboard Overview</h2>
              <p>Monitor venue enquiries, manage bookings, and keep VENORA's event operations organized.</p>
            </div>
            <div class="section-actions">
              <button type="button" class="btn-gold" id="overview-add-venue-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add Venue</span>
              </button>
            </div>
          </div>

          <!-- 5 Summary Cards Grid -->
          <div class="summary-cards-grid">
            <div class="summary-card" data-navigate="enquiries" title="Click to view all enquiries">
              <div class="summary-card-top">
                <span class="summary-card-label">Total Enquiries</span>
                <span class="summary-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </span>
              </div>
              <div class="summary-card-value">${metrics.totalEnquiries}</div>
              <div class="summary-card-context">Across corporate clients</div>
            </div>

            <div class="summary-card" data-navigate="enquiries" data-filter="Under Review" title="Click to view pending reviews">
              <div class="summary-card-top">
                <span class="summary-card-label">Pending Reviews</span>
                <span class="summary-icon-box" style="background-color: var(--status-pending-bg); color: var(--status-pending);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
              </div>
              <div class="summary-card-value">${metrics.pendingReviews}</div>
              <div class="summary-card-context">Requires concierge triage</div>
            </div>

            <div class="summary-card" data-navigate="bookings" data-filter="upcoming" title="Click to view upcoming bookings">
              <div class="summary-card-top">
                <span class="summary-card-label">Upcoming Bookings</span>
                <span class="summary-icon-box" style="background-color: var(--status-blue-bg); color: var(--status-blue);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
              </div>
              <div class="summary-card-value">${metrics.upcomingBookings}</div>
              <div class="summary-card-context">Active scheduling queue</div>
            </div>

            <div class="summary-card" data-navigate="bookings" data-filter="Confirmed" title="Click to view confirmed bookings">
              <div class="summary-card-top">
                <span class="summary-card-label">Confirmed Bookings</span>
                <span class="summary-icon-box" style="background-color: var(--status-paid-bg); color: var(--status-paid);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
              </div>
              <div class="summary-card-value">${metrics.confirmedBookings}</div>
              <div class="summary-card-context">Venue agreements secured</div>
            </div>

            <div class="summary-card" data-navigate="payments" title="Click to view payment settlements">
              <div class="summary-card-top">
                <span class="summary-card-label">Outstanding Payments</span>
                <span class="summary-icon-box" style="background-color: var(--gold-tint); color: var(--gold-primary);">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </span>
              </div>
              <div class="summary-card-value">$${(metrics.outstandingPayments / 1000).toFixed(1)}k</div>
              <div class="summary-card-context">$${metrics.outstandingPayments.toLocaleString()} due in ledger</div>
            </div>
          </div>

          <!-- Two Column Visualizations & Operations Grid -->
          <div class="overview-sections-grid">
            <!-- Left Column: Recent Enquiries Table -->
            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Recent Enquiries</span>
                </h3>
                <a href="#enquiries" class="panel-action-link">View All &rarr;</a>
              </div>

              <div class="table-responsive">
                <table class="dash-table dash-table-enquiries">
                  <thead>
                    <tr>
                      <th class="col-ref">Ref ID</th>
                      <th class="col-client">Client</th>
                      <th class="col-event">Event Name</th>
                      <th class="col-date">Submitted</th>
                      <th class="col-status">Status</th>
                      <th class="col-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${enquiries.map(enq => `
                      <tr>
                        <td class="cell-ref"><strong>${enq.id}</strong></td>
                        <td class="cell-client">${enq.clientName}</td>
                        <td class="cell-event">${enq.eventName}</td>
                        <td class="cell-date">${enq.submissionDate}</td>
                        <td class="cell-status"><span class="status-badge ${getStatusBadgeClass(enq.status)}">${enq.status}</span></td>
                        <td class="cell-action">
                          <button type="button" class="btn-secondary btn-sm" data-action="view-enquiry" data-id="${enq.id}">View</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Right Column: Pipeline Analytics Visualization -->
            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  <span>Enquiries by Status</span>
                </h3>
                <span class="status-badge badge-gray">Demo Metrics</span>
              </div>

              <div class="chart-container">
                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Under Review</span>
                    <span>${statusCounts['Under Review']} Enquiries</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-orange" style="width: ${Math.round((statusCounts['Under Review'] / allEnquiries.length) * 100)}%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Quote Ready</span>
                    <span>${statusCounts['Quote Ready']} Enquiries</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-gold" style="width: ${Math.round((statusCounts['Quote Ready'] / allEnquiries.length) * 100)}%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Awaiting Client Approval</span>
                    <span>${statusCounts['Awaiting Approval']} Enquiries</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-blue" style="width: ${Math.round((statusCounts['Awaiting Approval'] / allEnquiries.length) * 100)}%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Draft Stage</span>
                    <span>${statusCounts['Draft']} Enquiries</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-purple" style="width: ${Math.round((statusCounts['Draft'] / allEnquiries.length) * 100)}%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Closed / Archived</span>
                    <span>${statusCounts['Closed']} Enquiries</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-green" style="width: ${Math.round((statusCounts['Closed'] / allEnquiries.length) * 100)}%;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Upcoming Bookings & Recent Activity -->
          <div class="overview-sections-grid">
            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Upcoming Bookings</span>
                </h3>
                <a href="#bookings" class="panel-action-link">View All &rarr;</a>
              </div>

              <div class="table-responsive">
                <table class="dash-table dash-table-bookings">
                  <thead>
                    <tr>
                      <th class="col-event">Event</th>
                      <th class="col-client">Client</th>
                      <th class="col-venue">Venue</th>
                      <th class="col-date">Date</th>
                      <th class="col-status">Status</th>
                      <th class="col-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${bookings.map(b => `
                      <tr>
                        <td class="cell-event"><strong>${b.eventName}</strong></td>
                        <td class="cell-client">${b.clientName}</td>
                        <td class="cell-venue">${b.venue}</td>
                        <td class="cell-date">${b.eventDate}</td>
                        <td class="cell-status"><span class="status-badge ${b.bookingStatus === 'Confirmed' ? 'badge-green' : 'badge-orange'}">${b.bookingStatus}</span></td>
                        <td class="cell-action">
                          <button type="button" class="btn-secondary btn-sm" data-action="view-booking" data-id="${b.id}">Details</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Operations Activity Feed -->
            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                  <span>Recent Activity</span>
                </h3>
              </div>

              <div class="activity-list">
                ${activity.map(act => `
                  <div class="activity-item">
                    <div class="activity-dot ${act.badgeClass === 'badge-green' ? 'dot-green' : (act.badgeClass === 'badge-blue' ? 'dot-blue' : (act.badgeClass === 'badge-purple' ? 'dot-purple' : 'dot-gold'))}"></div>
                    <div class="activity-content">
                      <div class="activity-title">${act.title}</div>
                      <div class="activity-detail">${act.detail}</div>
                      <div class="activity-time">${act.timestamp} &bull; ${act.user}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 2. Venues Management
    // ------------------------------------------------------------------------
    renderVenues: function (filter = {}) {
      const venues = window.VenoraAdminData.getVenues(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Venue Management</h2>
              <p>Configure architectural spaces, capacities, daily rates, and publication visibility.</p>
            </div>
            <div class="section-actions">
              <button type="button" class="btn-gold" id="btn-add-venue-top">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add Venue</span>
              </button>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="venue-search-input" class="filter-input" placeholder="Search venue or city..." value="${filter.search || ''}">
              
              <select id="venue-filter-cat" class="filter-select">
                <option value="all">All Categories</option>
                <option value="Corporate & Gala" ${filter.category === 'Corporate & Gala' ? 'selected' : ''}>Corporate & Gala</option>
                <option value="Gala & Summit" ${filter.category === 'Gala & Summit' ? 'selected' : ''}>Gala & Summit</option>
                <option value="Retreat & Governance" ${filter.category === 'Retreat & Governance' ? 'selected' : ''}>Retreat & Governance</option>
                <option value="Showcase & Exhibition" ${filter.category === 'Showcase & Exhibition' ? 'selected' : ''}>Showcase & Exhibition</option>
                <option value="Keynote & Conference" ${filter.category === 'Keynote & Conference' ? 'selected' : ''}>Keynote & Conference</option>
              </select>

              <select id="venue-filter-status" class="filter-select">
                <option value="all">All Statuses</option>
                <option value="Published" ${filter.status === 'Published' ? 'selected' : ''}>Published</option>
                <option value="Draft" ${filter.status === 'Draft' ? 'selected' : ''}>Draft</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">Showing ${venues.length} venue records</span>
          </div>

          <!-- Venues Grid -->
          <div class="venues-grid">
            ${venues.map(v => `
              <div class="management-card">
                <div class="card-media-wrap">
                  <img src="${v.image}" alt="${v.name}" loading="lazy">
                  <span class="card-floating-badge status-badge ${v.availability === 'Available' ? 'badge-green' : (v.availability === 'Maintenance' ? 'badge-red' : 'badge-orange')}">
                    ${v.availability}
                  </span>
                </div>
                <div class="card-content">
                  <span class="card-category-tag">${v.category} &bull; ${v.id}</span>
                  <h3 class="card-heading">${v.name}</h3>
                  <p class="card-description">${v.description}</p>
                  
                  <div class="card-meta-list">
                    <span><strong>Cap:</strong> ${v.capacity} pax</span>
                    <span><strong>Rate:</strong> ${v.pricingType === 'Quote Required' ? 'Quote Req.' : '$' + v.basePrice.toLocaleString() + '/day'}</span>
                    <span class="status-badge ${v.publicationStatus === 'Published' ? 'badge-blue' : 'badge-gray'}">${v.publicationStatus}</span>
                  </div>
                </div>
                <div class="card-footer-actions">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${v.location.split(',')[0]}</span>
                  <div style="display: flex; gap: 0.5rem;">
                    <button type="button" class="btn-secondary btn-sm" data-action="edit-venue" data-id="${v.id}">Edit</button>
                    <button type="button" class="btn-secondary btn-sm btn-danger" data-action="archive-venue" data-id="${v.id}">Archive</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 3. Services Management (Reuses window.VenoraServices)
    // ------------------------------------------------------------------------
    renderServices: function (filter = {}) {
      const services = window.VenoraAdminData.getServices(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Services Management</h2>
              <p>Manage the 6 core corporate event solutions. All changes mirror the public Services page.</p>
            </div>
            <div class="section-actions">
              <a href="../services.html" target="_blank" class="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>View Public Services Page</span>
              </a>
            </div>
          </div>

          <div class="services-grid">
            ${services.map(s => `
              <div class="management-card">
                <div class="card-media-wrap">
                  <img src="../${s.image}" alt="${s.name}" loading="lazy">
                  <span class="card-floating-badge status-badge badge-blue">Public Service</span>
                </div>
                <div class="card-content">
                  <span class="card-category-tag">${s.category}</span>
                  <h3 class="card-heading">${s.name}</h3>
                  <p class="card-description">${s.shortDescription}</p>

                  <div style="margin-top: 0.5rem;">
                    <span style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Key Offerings</span>
                    <ul style="padding-left: 1rem; font-size: 0.75rem; color: var(--text-secondary);">
                      ${(s.benefits || []).slice(0, 2).map(b => `<li>${b}</li>`).join('')}
                    </ul>
                  </div>
                </div>
                <div class="card-footer-actions">
                  <a href="../service-details.html?service=${s.slug}" target="_blank" class="btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span>Public Preview &rarr;</span>
                  </a>
                  <button type="button" class="btn-gold btn-sm" data-action="edit-service" data-id="${s.id}">Edit Params</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 4. Pricing & Packages Management (Reuses window.VenoraPricing)
    // ------------------------------------------------------------------------
    renderPricing: function () {
      const packages = window.VenoraAdminData.getPackages();

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Pricing &amp; Packages Management</h2>
              <p>Configure the 3 official tiers (Essential, Professional, Signature) and custom quote rules.</p>
            </div>
            <div class="section-actions">
              <a href="../pricing.html" target="_blank" class="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>View Public Pricing Page</span>
              </a>
            </div>
          </div>

          <div class="pricing-grid">
            ${packages.map(p => `
              <div class="management-card" style="${p.featured ? 'border-color: var(--gold-primary); box-shadow: 0 8px 30px rgba(197, 161, 91, 0.15);' : ''}">
                <div class="card-content" style="padding: 1.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span class="card-category-tag">${p.id.toUpperCase()} TIER</span>
                    ${p.featured ? '<span class="status-badge badge-gold">Featured Tier</span>' : ''}
                  </div>
                  <h3 class="card-heading" style="font-size: 1.35rem;">${p.name}</h3>
                  <p class="card-description">${p.tagline || p.summary}</p>
                  
                  <div style="margin: 1.25rem 0; padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                    <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--gold-primary);">
                      ${p.priceDisplay}
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${p.sampleNote || 'Custom structured quotation'}</span>
                  </div>

                  <div style="margin-top: 0.5rem;">
                    <span style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Inclusions</span>
                    <ul style="padding-left: 1.25rem; font-size: 0.8125rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
                      ${(p.inclusions || []).slice(0, 4).map(inc => `<li>${inc}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <div class="card-footer-actions">
                  <span class="status-badge badge-blue">Request a Quote Mode</span>
                  <button type="button" class="btn-gold btn-sm" data-action="edit-package" data-id="${p.id}">Edit Tier</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 5. Blog Management (Reuses window.VenoraBlogs)
    // ------------------------------------------------------------------------
    renderBlogs: function (filter = {}) {
      const blogs = window.VenoraAdminData.getBlogs(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Blog &amp; Editorial Management</h2>
              <p>Manage the 6 canonical editorial articles, category taxonomy, and article drafts.</p>
            </div>
            <div class="section-actions">
              <button type="button" class="btn-gold" id="btn-add-blog-top">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Article</span>
              </button>
              <a href="../blog.html" target="_blank" class="btn-secondary">View Journal &rarr;</a>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="blog-search-input" class="filter-input" placeholder="Search article title..." value="${filter.search || ''}">
              
              <select id="blog-filter-cat" class="filter-select">
                <option value="all">All Categories</option>
                <option value="Venue Selection" ${filter.category === 'Venue Selection' ? 'selected' : ''}>Venue Selection</option>
                <option value="Corporate Events" ${filter.category === 'Corporate Events' ? 'selected' : ''}>Corporate Events</option>
                <option value="Event Planning" ${filter.category === 'Event Planning' ? 'selected' : ''}>Event Planning</option>
                <option value="Event Budgeting" ${filter.category === 'Event Budgeting' ? 'selected' : ''}>Event Budgeting</option>
                <option value="Conference Strategy" ${filter.category === 'Conference Strategy' ? 'selected' : ''}>Conference Strategy</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">${blogs.length} articles in catalogue</span>
          </div>

          <!-- Blogs Grid -->
          <div class="blogs-grid">
            ${blogs.map(b => `
              <div class="management-card">
                <div class="card-media-wrap">
                  <img src="../${b.image || 'assets/images/venue-hall.jpg'}" alt="${b.title}" loading="lazy">
                  <span class="card-floating-badge status-badge badge-green">${b.publicationStatus || 'Published'}</span>
                </div>
                <div class="card-content">
                  <span class="card-category-tag">${b.category} &bull; ${b.readingTime || 5} min read</span>
                  <h3 class="card-heading" style="font-size: 1.05rem;">${b.title}</h3>
                  <p class="card-description">${b.excerpt}</p>
                  
                  <div class="card-meta-list">
                    <span>${b.publishedDisplay || 'Oct 2026'}</span>
                    <span>${b.author ? b.author.name : 'Editorial Team'}</span>
                  </div>
                </div>
                <div class="card-footer-actions">
                  <a href="../blog-details.html?slug=${b.slug}" target="_blank" class="btn-secondary btn-sm">Public Preview &rarr;</a>
                  <button type="button" class="btn-gold btn-sm" data-action="edit-blog" data-slug="${b.slug}">Edit Article</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 6. Enquiries Management
    // ------------------------------------------------------------------------
    renderEnquiries: function (filter = {}) {
      const enquiries = window.VenoraAdminData.getEnquiries(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Enquiries Management</h2>
              <p>Review event briefs, validate guest counts, add internal notes, and advance quotes.</p>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="enq-search-input" class="filter-input" placeholder="Search client or event..." value="${filter.search || ''}">
              
              <select id="enq-filter-status" class="filter-select">
                <option value="all">All Statuses</option>
                <option value="Draft" ${filter.status === 'Draft' ? 'selected' : ''}>Draft</option>
                <option value="Under Review" ${filter.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                <option value="Additional Information Required" ${filter.status === 'Additional Information Required' ? 'selected' : ''}>More Info Required</option>
                <option value="Quote Ready" ${filter.status === 'Quote Ready' ? 'selected' : ''}>Quote Ready</option>
                <option value="Awaiting Client Approval" ${filter.status === 'Awaiting Client Approval' ? 'selected' : ''}>Awaiting Approval</option>
                <option value="Closed" ${filter.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">${enquiries.length} operational enquiries</span>
          </div>

          <div class="table-responsive">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>Enquiry ID</th>
                  <th>Client</th>
                  <th>Event Name</th>
                  <th>Service</th>
                  <th>Target Date</th>
                  <th>Guests</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${enquiries.map(e => `
                  <tr>
                    <td><strong>${e.id}</strong></td>
                    <td>
                      <div>${e.clientName}</div>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">${e.company || ''}</span>
                    </td>
                    <td>${e.eventName}</td>
                    <td>${e.serviceName}</td>
                    <td>${e.eventDate || 'TBD'}</td>
                    <td>${e.guestCount} pax</td>
                    <td>${e.budget || 'Custom'}</td>
                    <td><span class="status-badge ${getStatusBadgeClass(e.status)}">${e.status}</span></td>
                    <td>
                      <div class="table-actions">
                        <button type="button" class="btn-secondary btn-sm" data-action="view-enquiry" data-id="${e.id}">Review</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 7. Quotes Management
    // ------------------------------------------------------------------------
    renderQuotes: function (filter = {}) {
      const quotes = window.VenoraAdminData.getQuotes(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Quotes Management</h2>
              <p>Formulate proposals, calculate itemized charges, and manage client agreement sign-offs.</p>
            </div>
            <div class="section-actions">
              <button type="button" class="btn-gold" id="btn-create-quote-top">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Prepare New Quote</span>
              </button>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="quote-search-input" class="filter-input" placeholder="Search quote ID or client..." value="${filter.search || ''}">
              
              <select id="quote-filter-status" class="filter-select">
                <option value="all">All Statuses</option>
                <option value="Draft" ${filter.status === 'Draft' ? 'selected' : ''}>Draft</option>
                <option value="Sent for Review" ${filter.status === 'Sent for Review' ? 'selected' : ''}>Sent for Review</option>
                <option value="Awaiting Client Approval" ${filter.status === 'Awaiting Client Approval' ? 'selected' : ''}>Awaiting Approval</option>
                <option value="Approved" ${filter.status === 'Approved' ? 'selected' : ''}>Approved</option>
                <option value="Rejected" ${filter.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">${quotes.length} quotations active</span>
          </div>

          <div class="table-responsive">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Enquiry Ref</th>
                  <th>Client</th>
                  <th>Event Name</th>
                  <th>Venue</th>
                  <th>Tier</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${quotes.map(q => `
                  <tr>
                    <td><strong>${q.id}</strong></td>
                    <td>${q.enquiryId}</td>
                    <td>${q.clientName}</td>
                    <td>${q.eventName}</td>
                    <td>${q.venueName || 'Pending'}</td>
                    <td>${q.packageName}</td>
                    <td><strong style="color: var(--gold-primary);">$${(q.totalAmount || 0).toLocaleString()}</strong></td>
                    <td><span class="status-badge ${getStatusBadgeClass(q.status)}">${q.status}</span></td>
                    <td>
                      <button type="button" class="btn-secondary btn-sm" data-action="edit-quote" data-id="${q.id}">Edit</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 8. Bookings Management
    // ------------------------------------------------------------------------
    renderBookings: function (filter = {}) {
      const bookings = window.VenoraAdminData.getBookings(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Bookings Management</h2>
              <p>Structured progression: Enquiry &rarr; Review &rarr; Quote &rarr; Approval &rarr; Payment &rarr; Venue Confirmation.</p>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="booking-search-input" class="filter-input" placeholder="Search bookings..." value="${filter.search || ''}">
              
              <select id="booking-filter-timeline" class="filter-select">
                <option value="all">All Timelines</option>
                <option value="upcoming" ${filter.timeline === 'upcoming' ? 'selected' : ''}>Upcoming Bookings</option>
                <option value="past" ${filter.timeline === 'past' ? 'selected' : ''}>Past / Executed</option>
              </select>

              <select id="booking-filter-status" class="filter-select">
                <option value="all">All Statuses</option>
                <option value="Confirmed" ${filter.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                <option value="Pending Confirmation" ${filter.status === 'Pending Confirmation' ? 'selected' : ''}>Pending Confirmation</option>
                <option value="Past" ${filter.status === 'Past' ? 'selected' : ''}>Past</option>
                <option value="Cancelled" ${filter.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">${bookings.length} reservations</span>
          </div>

          <div class="table-responsive">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Event Name</th>
                  <th>Client</th>
                  <th>Venue</th>
                  <th>Event Date</th>
                  <th>Delegates</th>
                  <th>Booking Status</th>
                  <th>Payment Settlement</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${bookings.map(b => `
                  <tr>
                    <td><strong>${b.id}</strong></td>
                    <td>${b.eventName}</td>
                    <td>${b.clientName}</td>
                    <td>${b.venue}</td>
                    <td>${b.eventDate}</td>
                    <td>${b.guestCount} pax</td>
                    <td><span class="status-badge ${b.bookingStatus === 'Confirmed' ? 'badge-green' : 'badge-orange'}">${b.bookingStatus}</span></td>
                    <td><span class="status-badge ${b.paymentStatus === 'Paid in Full' ? 'badge-green' : 'badge-blue'}">${b.paymentStatus}</span></td>
                    <td>
                      <button type="button" class="btn-secondary btn-sm" data-action="view-booking" data-id="${b.id}">Details</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 9. Client Management
    // ------------------------------------------------------------------------
    renderClients: function (filter = {}) {
      const clients = window.VenoraAdminData.getClients(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Client Management</h2>
              <p>Corporate accounts, contact directories, linked enquiries, quotes, and booking histories.</p>
            </div>
          </div>

          <div class="filter-toolbar">
            <input type="text" id="client-search-input" class="filter-input" placeholder="Search client or organization..." value="${filter.search || ''}">
            <span style="font-size: 0.8125rem; color: var(--text-muted);">${clients.length} registered corporate clients</span>
          </div>

          <div class="table-responsive">
            <table class="dash-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Company / Account</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Enquiries</th>
                  <th>Bookings</th>
                  <th>Client Tier</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${clients.map(c => `
                  <tr>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.company}</td>
                    <td>${c.email}</td>
                    <td>${c.phone}</td>
                    <td>${c.enquiriesCount}</td>
                    <td>${c.bookingsCount}</td>
                    <td><span class="status-badge badge-purple">${c.tier}</span></td>
                    <td><span class="status-badge badge-green">${c.status}</span></td>
                    <td>
                      <button type="button" class="btn-secondary btn-sm" data-action="view-client" data-id="${c.id}">Dossier</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 10. Payments & Invoices
    // ------------------------------------------------------------------------
    renderPayments: function (filter = {}) {
      const metrics = window.VenoraAdminData.getOverviewMetrics();
      const invoices = window.VenoraAdminData.getInvoices(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Payments &amp; Invoices</h2>
              <p>Monitor itemized billing, client deposits, outstanding balances, and sample payment receipts.</p>
            </div>
          </div>

          <!-- Financial Summary Cards -->
          <div class="summary-cards-grid payment-summary-grid">
            <div class="summary-card">
              <span class="summary-card-label">Total Invoiced</span>
              <div class="summary-card-value">$${(metrics.totalInvoiced / 1000).toFixed(1)}k</div>
              <div class="summary-card-context">$${metrics.totalInvoiced.toLocaleString()} billed across contracts</div>
            </div>

            <div class="summary-card">
              <span class="summary-card-label">Total Paid</span>
              <div class="summary-card-value" style="color: var(--status-paid);">$${(metrics.totalPaid / 1000).toFixed(1)}k</div>
              <div class="summary-card-context">$${metrics.totalPaid.toLocaleString()} confirmed receipts</div>
            </div>

            <div class="summary-card">
              <span class="summary-card-label">Outstanding Balance</span>
              <div class="summary-card-value" style="color: var(--gold-primary);">$${(metrics.outstandingPayments / 1000).toFixed(1)}k</div>
              <div class="summary-card-context">$${metrics.outstandingPayments.toLocaleString()} pending settlement</div>
            </div>

            <div class="summary-card">
              <span class="summary-card-label">Overdue Invoices</span>
              <div class="summary-card-value" style="color: var(--status-overdue);">${metrics.overdueInvoices}</div>
              <div class="summary-card-context">Past scheduled due dates</div>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <div class="filter-toolbar">
            <div class="filter-group">
              <input type="text" id="inv-search-input" class="filter-input" placeholder="Search invoice or event..." value="${filter.search || ''}">
              
              <select id="inv-filter-status" class="filter-select">
                <option value="all">All Invoices</option>
                <option value="Paid" ${filter.status === 'Paid' ? 'selected' : ''}>Paid</option>
                <option value="Due Soon" ${filter.status === 'Due Soon' ? 'selected' : ''}>Due Soon</option>
                <option value="Overdue" ${filter.status === 'Overdue' ? 'selected' : ''}>Overdue</option>
              </select>
            </div>

            <span style="font-size: 0.8125rem; color: var(--text-muted);">${invoices.length} invoices generated</span>
          </div>

          <div class="table-responsive">
            <table class="dash-table dash-table-invoices">
              <thead>
                <tr>
                  <th class="col-ref">Invoice ID</th>
                  <th class="col-ref">Booking Ref</th>
                  <th class="col-client">Client</th>
                  <th class="col-event">Event Name</th>
                  <th class="col-date">Due Date</th>
                  <th>Total Amount</th>
                  <th>Paid Amount</th>
                  <th>Remaining</th>
                  <th class="col-status">Status</th>
                  <th class="col-action">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${invoices.map(inv => `
                  <tr>
                    <td class="cell-ref"><strong>${inv.id}</strong></td>
                    <td class="cell-ref">${inv.bookingId}</td>
                    <td class="cell-client">${inv.clientName}</td>
                    <td class="cell-event">${inv.eventName}</td>
                    <td class="cell-date">${inv.dueDate}</td>
                    <td style="white-space: nowrap;">$${(inv.totalAmount || 0).toLocaleString()}</td>
                    <td style="white-space: nowrap;"><span style="color: var(--status-paid);">$${(inv.paidAmount || 0).toLocaleString()}</span></td>
                    <td style="white-space: nowrap;"><strong style="color: var(--gold-primary);">$${(inv.remainingAmount !== undefined ? inv.remainingAmount : 0).toLocaleString()}</strong></td>
                    <td class="cell-status"><span class="status-badge ${getStatusBadgeClass(inv.status)}">${inv.status}</span></td>
                    <td class="cell-action">
                      <button type="button" class="btn-secondary btn-sm" data-action="view-invoice" data-id="${inv.id}">View Invoice</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 11. Reports & Analytics
    // ------------------------------------------------------------------------
    renderReports: function () {
      const metrics = window.VenoraAdminData.getOverviewMetrics();
      const enquiries = window.VenoraAdminData.getEnquiries();
      const bookings = window.VenoraAdminData.getBookings();

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Reports &amp; Analytics</h2>
              <p>Aggregated operational insights derived strictly from underlying venue, booking, and invoice records.</p>
            </div>
            <span class="status-badge badge-gray">Demo Reports</span>
          </div>

          <div class="overview-sections-grid">
            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">Venue Utilization &amp; Bookings Breakdown</h3>
              </div>
              <div class="chart-container">
                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>The Glass Atrium (San Francisco)</span>
                    <span>2 Events (50% share)</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-gold" style="width: 50%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Metropolitan Grand Ballroom</span>
                    <span>1 Event (25% share)</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-blue" style="width: 25%;"></div>
                  </div>
                </div>

                <div class="chart-bar-row">
                  <div class="chart-bar-info">
                    <span>Silicon Summit Hall</span>
                    <span>1 Event (25% share)</span>
                  </div>
                  <div class="chart-bar-track">
                    <div class="chart-bar-fill fill-purple" style="width: 25%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="dash-panel">
              <div class="panel-header">
                <h3 class="panel-title">Financial Settlement Health</h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Total Billed Volume</span>
                  <p style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">$${metrics.totalInvoiced.toLocaleString()}</p>
                </div>
                <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Collected Revenue</span>
                  <p style="font-size: 1.5rem; font-weight: 700; color: var(--status-paid);">$${metrics.totalPaid.toLocaleString()} (${Math.round((metrics.totalPaid / (metrics.totalInvoiced || 1)) * 100)}%)</p>
                </div>
                <div style="padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md);">
                  <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Outstanding Receivables</span>
                  <p style="font-size: 1.5rem; font-weight: 700; color: var(--gold-primary);">$${metrics.outstandingPayments.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 12. Notifications Center
    // ------------------------------------------------------------------------
    renderNotifications: function (filter = 'all') {
      const notifs = window.VenoraAdminData.getNotifications(filter);

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Notifications Center</h2>
              <p>Operational event updates, quote sign-off alerts, and walkthrough confirmations.</p>
            </div>
            <div class="section-actions">
              <button type="button" class="btn-secondary" id="btn-mark-all-read">Mark All as Read</button>
            </div>
          </div>

          <div class="filter-toolbar">
            <div class="filter-group">
              <button type="button" class="btn-secondary btn-sm ${filter === 'all' ? 'btn-gold' : ''}" data-action="filter-notifs" data-filter="all">All</button>
              <button type="button" class="btn-secondary btn-sm ${filter === 'unread' ? 'btn-gold' : ''}" data-action="filter-notifs" data-filter="unread">Unread Only</button>
              <button type="button" class="btn-secondary btn-sm ${filter === 'read' ? 'btn-gold' : ''}" data-action="filter-notifs" data-filter="read">Read</button>
            </div>
          </div>

          <div class="notifs-container">
            ${notifs.length === 0 ? `
              <div style="padding: 3rem; text-align: center; color: var(--text-muted);">
                <p>No notifications found matching your filter.</p>
              </div>
            ` : notifs.map(n => `
              <div class="notif-item ${!n.read ? 'is-unread' : ''}">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background-color: var(--gold-tint); color: var(--gold-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <strong style="color: var(--text-primary); font-size: 0.9375rem;">${n.title}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${n.timeAgo}</span>
                  </div>
                  <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.45;">${n.message}</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;">
                  ${!n.read ? `
                    <button type="button" class="btn-secondary btn-sm" data-action="mark-read" data-id="${n.id}">Mark Read</button>
                  ` : ''}
                  <a href="#${n.relatedSection || 'overview'}" class="btn-secondary btn-sm">Open Record &rarr;</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ------------------------------------------------------------------------
    // 13. Website Settings
    // ------------------------------------------------------------------------
    renderSettings: function () {
      const settings = window.VenoraAdminData.getSettings();

      return `
        <div class="section-view">
          <div class="dash-section-header">
            <div class="section-header-titles">
              <h2>Website Settings</h2>
              <p>Configure corporate contact information, concierge office hours, verified social links, and demo state.</p>
            </div>
          </div>

          <div class="dash-panel" style="max-width: 800px;">
            <form id="settings-form" class="form-grid">
              <div class="form-group full-width">
                <label class="form-label" for="setting-brand">Brand Name</label>
                <input type="text" id="setting-brand" class="form-input" value="${settings.brandName}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-email">Concierge Contact Email</label>
                <input type="email" id="setting-email" class="form-input" value="${settings.adminContactEmail}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-phone">Concierge Toll-Free Phone</label>
                <input type="text" id="setting-phone" class="form-input" value="${settings.adminPhone}">
              </div>

              <div class="form-group full-width">
                <label class="form-label" for="setting-address">Headquarters Address</label>
                <input type="text" id="setting-address" class="form-input" value="${settings.officeAddress}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-hours-week">Weekday Consultation Hours</label>
                <input type="text" id="setting-hours-week" class="form-input" value="${settings.officeHoursWeekday}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setting-hours-sat">Saturday Walkthrough Hours</label>
                <input type="text" id="setting-hours-sat" class="form-input" value="${settings.officeHoursSaturday}">
              </div>

              <div class="form-group full-width" style="padding: 1rem; background-color: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <span class="form-label">Contact Form Backend Integration</span>
                <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">
                  Status: <strong>${settings.formEndpointStatus}</strong>. Client enquiries submitted via public forms will populate the admin demo queue directly.
                </p>
              </div>

              <div class="form-group full-width" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1.25rem;">
                <button type="button" class="btn-secondary btn-danger" id="btn-reset-demo-all">Reset All Demo Data</button>
                <button type="button" class="btn-gold" id="btn-save-settings">Save Preferences</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }
  };

  /**
   * Helper to resolve CSS classes for status badges
   */
  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Paid':
      case 'Confirmed':
      case 'Approved':
      case 'Published':
        return 'badge-green';
      case 'Quote Ready':
      case 'Awaiting Client Approval':
      case 'Awaiting Approval':
        return 'badge-gold';
      case 'Under Review':
      case 'Submitted':
      case 'Due Soon':
      case 'Pending Confirmation':
      case 'Sent for Review':
      case 'Partial':
        return 'badge-blue';
      case 'Additional Information Required':
        return 'badge-orange';
      case 'Overdue':
      case 'Cancelled':
      case 'Rejected':
        return 'badge-red';
      case 'Draft':
      case 'Closed':
      case 'Past':
      default:
        return 'badge-gray';
    }
  }

  window.VenoraAdminComponents = AdminComponents;
})();
