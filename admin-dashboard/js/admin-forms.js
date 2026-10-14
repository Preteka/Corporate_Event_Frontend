/**
 * VENORA Admin Dashboard - Form Controllers & Modal Management
 * Handles dialog modals, form validation, accessible focus,
 * and operation mutations for venues, blogs, quotes, enquiries, and demo payments.
 */

(function () {
  'use strict';

  const modalContainer = document.getElementById('dashboard-modal-container');

  const AdminForms = {
    /**
     * Open an accessible modal dialog
     */
    openModal: function (title, contentHtml, footerHtml = '', sizeClass = '') {
      if (!modalContainer) return;

      modalContainer.innerHTML = `
        <div class="modal-backdrop-overlay" data-action="close-modal" aria-hidden="true"></div>
        <div class="modal-box ${sizeClass}" role="dialog" aria-modal="true" aria-labelledby="modal-title-heading">
          <div class="modal-header">
            <h3 class="modal-title" id="modal-title-heading">${title}</h3>
            <button type="button" class="modal-close-btn" data-action="close-modal" aria-label="Close dialog">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            ${contentHtml}
          </div>
          ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
        </div>
      `;

      modalContainer.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      // Attach close listeners
      const closeBtns = modalContainer.querySelectorAll('[data-action="close-modal"]');
      closeBtns.forEach(btn => {
        btn.addEventListener('click', AdminForms.closeModal);
      });

      // Escape key listener
      document.addEventListener('keydown', handleEscapeKey);
    },

    closeModal: function () {
      if (!modalContainer) return;
      modalContainer.setAttribute('hidden', '');
      modalContainer.innerHTML = '';
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    },

    // ------------------------------------------------------------------------
    // Venue Forms
    // ------------------------------------------------------------------------
    showVenueModal: function (venueId = null) {
      const isEdit = !!venueId;
      const venue = isEdit ? window.VenoraAdminData.getVenueById(venueId) : null;

      const title = isEdit ? `Edit Venue: ${venue.name}` : `Add New Venue`;
      const content = `
        <form id="venue-form" class="form-grid">
          <input type="hidden" id="venue-id" value="${venue ? venue.id : ''}">
          
          <div class="form-group full-width">
            <label class="form-label" for="venue-name">Venue Name *</label>
            <input type="text" id="venue-name" class="form-input" required value="${venue ? venue.name : ''}" placeholder="e.g. The Grand Conservatory">
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-category">Category *</label>
            <select id="venue-category" class="form-select" required>
              <option value="Corporate & Gala" ${venue && venue.category === 'Corporate & Gala' ? 'selected' : ''}>Corporate & Gala</option>
              <option value="Gala & Summit" ${venue && venue.category === 'Gala & Summit' ? 'selected' : ''}>Gala & Summit</option>
              <option value="Retreat & Governance" ${venue && venue.category === 'Retreat & Governance' ? 'selected' : ''}>Retreat & Governance</option>
              <option value="Showcase & Exhibition" ${venue && venue.category === 'Showcase & Exhibition' ? 'selected' : ''}>Showcase & Exhibition</option>
              <option value="Keynote & Conference" ${venue && venue.category === 'Keynote & Conference' ? 'selected' : ''}>Keynote & Conference</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-capacity">Guest Capacity *</label>
            <input type="number" id="venue-capacity" class="form-input" min="10" max="2000" required value="${venue ? venue.capacity : '200'}">
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="venue-location">Location / Address *</label>
            <input type="text" id="venue-location" class="form-input" required value="${venue ? venue.location : ''}" placeholder="e.g. 500 Howard Street, San Francisco, CA">
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-pricing-type">Pricing Type</label>
            <select id="venue-pricing-type" class="form-select">
              <option value="Fixed Daily Rate" ${venue && venue.pricingType === 'Fixed Daily Rate' ? 'selected' : ''}>Fixed Daily Rate</option>
              <option value="Quote Required" ${venue && venue.pricingType === 'Quote Required' ? 'selected' : ''}>Quote Required</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-base-price">Base Daily Rate ($)</label>
            <input type="number" id="venue-base-price" class="form-input" min="0" step="500" value="${venue ? venue.basePrice : '10000'}">
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-availability">Availability Status</label>
            <select id="venue-availability" class="form-select">
              <option value="Available" ${venue && venue.availability === 'Available' ? 'selected' : ''}>Available</option>
              <option value="Booked" ${venue && venue.availability === 'Booked' ? 'selected' : ''}>Booked</option>
              <option value="Maintenance" ${venue && venue.availability === 'Maintenance' ? 'selected' : ''}>Maintenance</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="venue-status">Publication Status</label>
            <select id="venue-status" class="form-select">
              <option value="Published" ${venue && venue.publicationStatus === 'Published' ? 'selected' : ''}>Published</option>
              <option value="Draft" ${venue && venue.publicationStatus === 'Draft' ? 'selected' : ''}>Draft / Hidden</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="venue-desc">Description</label>
            <textarea id="venue-desc" class="form-textarea" rows="3" placeholder="Spatial features, architectural design, and delegate flow...">${venue ? venue.description : ''}</textarea>
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="venue-facilities">Key Facilities (comma separated)</label>
            <input type="text" id="venue-facilities" class="form-input" value="${venue && venue.facilities ? venue.facilities.join(', ') : '4K LED Screen, Fiber Uplink, VIP Room'}">
          </div>
        </form>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Cancel</button>
        <button type="button" class="btn-gold" id="btn-save-venue">Save Venue</button>
      `;

      AdminForms.openModal(title, content, footer);

      document.getElementById('btn-save-venue').addEventListener('click', () => {
        const form = document.getElementById('venue-form');
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const facilitiesInput = document.getElementById('venue-facilities').value;
        const facilities = facilitiesInput.split(',').map(s => s.trim()).filter(Boolean);

        const venueData = {
          id: document.getElementById('venue-id').value || null,
          name: document.getElementById('venue-name').value,
          category: document.getElementById('venue-category').value,
          capacity: parseInt(document.getElementById('venue-capacity').value, 10),
          location: document.getElementById('venue-location').value,
          pricingType: document.getElementById('venue-pricing-type').value,
          basePrice: parseFloat(document.getElementById('venue-base-price').value) || 0,
          availability: document.getElementById('venue-availability').value,
          publicationStatus: document.getElementById('venue-status').value,
          description: document.getElementById('venue-desc').value,
          facilities: facilities.length > 0 ? facilities : ['High-Speed WiFi', 'Audio-Visual Staging']
        };

        window.VenoraAdminData.saveVenue(venueData);
        AdminForms.closeModal();
        if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
      });
    },

    // ------------------------------------------------------------------------
    // Blog Forms
    // ------------------------------------------------------------------------
    showBlogModal: function (slug = null) {
      const isEdit = !!slug;
      const blog = isEdit ? window.VenoraAdminData.getBlogBySlug(slug) : null;

      const title = isEdit ? `Edit Article: ${blog.title}` : `Create New Blog Article`;
      const content = `
        <form id="blog-form" class="form-grid">
          <input type="hidden" id="blog-slug" value="${blog ? blog.slug : ''}">

          <div class="form-group full-width">
            <label class="form-label" for="blog-title">Article Title *</label>
            <input type="text" id="blog-title" class="form-input" required value="${blog ? blog.title : ''}" placeholder="e.g. Modern Spatial Layouts for Annual Summits">
          </div>

          <div class="form-group">
            <label class="form-label" for="blog-category">Category *</label>
            <select id="blog-category" class="form-select" required>
              <option value="Venue Selection" ${blog && blog.category === 'Venue Selection' ? 'selected' : ''}>Venue Selection</option>
              <option value="Corporate Events" ${blog && blog.category === 'Corporate Events' ? 'selected' : ''}>Corporate Events</option>
              <option value="Event Planning" ${blog && blog.category === 'Event Planning' ? 'selected' : ''}>Event Planning</option>
              <option value="Event Budgeting" ${blog && blog.category === 'Event Budgeting' ? 'selected' : ''}>Event Budgeting</option>
              <option value="Conference Strategy" ${blog && blog.category === 'Conference Strategy' ? 'selected' : ''}>Conference Strategy</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="blog-status">Publication Status</label>
            <select id="blog-status" class="form-select">
              <option value="Published" ${blog && blog.publicationStatus === 'Published' ? 'selected' : ''}>Published</option>
              <option value="Draft" ${blog && blog.publicationStatus === 'Draft' ? 'selected' : ''}>Draft</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="blog-excerpt">Excerpt / Summary *</label>
            <textarea id="blog-excerpt" class="form-textarea" required rows="2" placeholder="Brief summary displayed on journal cards...">${blog ? blog.excerpt : ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="blog-author">Author Name</label>
            <input type="text" id="blog-author" class="form-input" value="${blog && blog.author ? blog.author.name : 'VENORA Editorial Team'}">
          </div>

          <div class="form-group">
            <label class="form-label" for="blog-tags">Tags (comma separated)</label>
            <input type="text" id="blog-tags" class="form-input" value="${blog && blog.tags ? blog.tags.join(', ') : 'Corporate, Planning, Venues'}">
          </div>

          <div class="form-group full-width">
            <label class="form-label" for="blog-content">Article Content (Markdown / Text)</label>
            <textarea id="blog-content" class="form-textarea" rows="6" placeholder="Write full article body paragraphs...">${blog && blog.content ? (Array.isArray(blog.content) ? blog.content.map(c => c.text || '').join('\n\n') : blog.content) : ''}</textarea>
          </div>
        </form>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Cancel</button>
        <button type="button" class="btn-gold" id="btn-save-blog">Publish Article</button>
      `;

      AdminForms.openModal(title, content, footer, 'modal-large');

      document.getElementById('btn-save-blog').addEventListener('click', () => {
        const form = document.getElementById('blog-form');
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const tagsInput = document.getElementById('blog-tags').value;
        const tags = tagsInput.split(',').map(s => s.trim()).filter(Boolean);

        const blogData = {
          slug: document.getElementById('blog-slug').value || null,
          title: document.getElementById('blog-title').value,
          category: document.getElementById('blog-category').value,
          publicationStatus: document.getElementById('blog-status').value,
          excerpt: document.getElementById('blog-excerpt').value,
          author: {
            name: document.getElementById('blog-author').value,
            role: "Event Planning Insights",
            bio: "The VENORA Editorial Team shares practical guidance on corporate event planning."
          },
          tags: tags,
          content: [
            { type: "paragraph", text: document.getElementById('blog-content').value }
          ]
        };

        window.VenoraAdminData.saveBlog(blogData);
        AdminForms.closeModal();
        if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
      });
    },

    // ------------------------------------------------------------------------
    // Enquiry Details & Status Transitions
    // ------------------------------------------------------------------------
    showEnquiryDetails: function (id) {
      const enq = window.VenoraAdminData.getEnquiryById(id);
      if (!enq) return;

      const title = `Enquiry Dossier: ${enq.id}`;
      const content = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary);">${enq.eventName}</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">Client: <strong>${enq.clientName}</strong> (${enq.company || 'Enterprise'}) &bull; ${enq.clientEmail}</p>
            </div>
            <span class="status-badge badge-gold">${enq.status}</span>
          </div>

          <div class="form-grid">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Service Requested</span>
              <p style="font-weight: 600; color: var(--text-primary);">${enq.serviceName}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Preferred Venue</span>
              <p style="font-weight: 600; color: var(--text-primary);">${enq.preferredVenue || 'Flexible Shortlist'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Event Date</span>
              <p style="font-weight: 600; color: var(--text-primary);">${enq.eventDate || 'TBD'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Guest Count</span>
              <p style="font-weight: 600; color: var(--text-primary);">${enq.guestCount} delegates</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Client Budget</span>
              <p style="font-weight: 600; color: var(--text-primary);">${enq.budget || 'Not specified'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Quoted Proposal</span>
              <p style="font-weight: 600; color: var(--gold-primary);">${enq.quotedAmount ? '$' + enq.quotedAmount.toLocaleString() : 'Pending Quote'}</p>
            </div>
          </div>

          <div style="background-color: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md);">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Special Requirements &amp; AV Notes</span>
            <p style="margin-top: 0.25rem; font-size: 0.875rem;">${enq.notes || 'None provided'}</p>
            ${enq.avRequirements ? `<p style="margin-top: 0.5rem; font-size: 0.8125rem; color: var(--text-secondary);"><strong>AV Specs:</strong> ${enq.avRequirements}</p>` : ''}
          </div>

          <!-- Workflow Action Row -->
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
            <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Update Operational Status</label>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="btn-secondary btn-sm" data-action="status-enq" data-status="Under Review">Mark Under Review</button>
              <button type="button" class="btn-secondary btn-sm" data-action="status-enq" data-status="Additional Information Required">Request More Info</button>
              <button type="button" class="btn-secondary btn-sm" data-action="status-enq" data-status="Quote Ready">Mark Quote Ready</button>
              <button type="button" class="btn-secondary btn-sm" data-action="status-enq" data-status="Awaiting Client Approval">Send for Approval</button>
              <button type="button" class="btn-secondary btn-sm" data-action="status-enq" data-status="Closed">Close Enquiry</button>
            </div>
          </div>

          <!-- Internal Note Addition -->
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="internal-note-input" class="form-input" placeholder="Add internal concierge note...">
            <button type="button" class="btn-gold btn-sm" id="btn-add-enq-note" style="white-space: nowrap;">Add Note</button>
          </div>

          <!-- Activity Timeline -->
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Milestone Timeline</span>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${(enq.timeline || []).map(t => `
                <div style="font-size: 0.8125rem; border-left: 2px solid var(--gold-primary); padding-left: 0.75rem;">
                  <strong style="color: var(--text-primary);">${t.title}</strong> &bull; <span style="color: var(--text-muted);">${t.date}</span>
                  <p style="color: var(--text-secondary); margin-top: 0.1rem;">${t.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Close</button>
        <button type="button" class="btn-gold" id="btn-create-quote-from-enq">Prepare Formal Quote</button>
      `;

      AdminForms.openModal(title, content, footer, 'modal-large');

      // Status change listeners
      const statusBtns = modalContainer.querySelectorAll('[data-action="status-enq"]');
      statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const newStatus = btn.getAttribute('data-status');
          window.VenoraAdminData.updateEnquiryStatus(id, newStatus);
          AdminForms.showEnquiryDetails(id); // reload modal content
          if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
        });
      });

      // Internal note listener
      const addNoteBtn = document.getElementById('btn-add-enq-note');
      if (addNoteBtn) {
        addNoteBtn.addEventListener('click', () => {
          const input = document.getElementById('internal-note-input');
          if (input && input.value.trim()) {
            window.VenoraAdminData.addEnquiryNote(id, input.value.trim());
            AdminForms.showEnquiryDetails(id);
          }
        });
      }

      // Prepare quote button
      const prepQuoteBtn = document.getElementById('btn-create-quote-from-enq');
      if (prepQuoteBtn) {
        prepQuoteBtn.addEventListener('click', () => {
          AdminForms.closeModal();
          AdminForms.showQuoteModal(null, id);
        });
      }
    },

    // ------------------------------------------------------------------------
    // Quote Forms & Generation
    // ------------------------------------------------------------------------
    showQuoteModal: function (quoteId = null, fromEnquiryId = null) {
      const isEdit = !!quoteId;
      const quote = isEdit ? window.VenoraAdminData.getQuoteById(quoteId) : null;
      const enq = fromEnquiryId ? window.VenoraAdminData.getEnquiryById(fromEnquiryId) : null;

      const title = isEdit ? `Edit Quote: ${quote.id}` : `Prepare Formal Quotation`;
      const clientName = quote ? quote.clientName : (enq ? enq.clientName : 'Alex Morgan');
      const company = quote ? quote.company : (enq ? enq.company : 'Morgan & Co.');
      const eventName = quote ? quote.eventName : (enq ? enq.eventName : 'Executive Summit');
      const enquiryRef = quote ? quote.enquiryId : (fromEnquiryId || 'ENQ-2026-881');
      const venueName = quote ? quote.venueName : (enq ? enq.preferredVenue : 'The Glass Atrium');

      const content = `
        <form id="quote-form" class="form-grid">
          <input type="hidden" id="quote-id" value="${quote ? quote.id : ''}">
          <input type="hidden" id="quote-enq-ref" value="${enquiryRef}">

          <div class="form-group">
            <label class="form-label">Client Name</label>
            <input type="text" id="quote-client" class="form-input" required value="${clientName}">
          </div>

          <div class="form-group">
            <label class="form-label">Company / Account</label>
            <input type="text" id="quote-company" class="form-input" value="${company}">
          </div>

          <div class="form-group full-width">
            <label class="form-label">Event Name *</label>
            <input type="text" id="quote-event" class="form-input" required value="${eventName}">
          </div>

          <div class="form-group">
            <label class="form-label">Assigned Venue</label>
            <input type="text" id="quote-venue" class="form-input" value="${venueName}">
          </div>

          <div class="form-group">
            <label class="form-label">Package Selection</label>
            <select id="quote-package" class="form-select">
              <option value="signature" ${quote && quote.packageId === 'signature' ? 'selected' : ''}>Signature Tier</option>
              <option value="professional" ${quote && quote.packageId === 'professional' ? 'selected' : ''}>Professional Tier</option>
              <option value="essential" ${quote && quote.packageId === 'essential' ? 'selected' : ''}>Essential Tier</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Quote Status</label>
            <select id="quote-status" class="form-select">
              <option value="Draft" ${quote && quote.status === 'Draft' ? 'selected' : ''}>Draft</option>
              <option value="Sent for Review" ${quote && quote.status === 'Sent for Review' ? 'selected' : ''}>Sent for Review</option>
              <option value="Awaiting Client Approval" ${quote && quote.status === 'Awaiting Client Approval' ? 'selected' : ''}>Awaiting Client Approval</option>
              <option value="Approved" ${quote && quote.status === 'Approved' ? 'selected' : ''}>Approved</option>
              <option value="Rejected" ${quote && quote.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Total Quotation ($)</label>
            <input type="number" id="quote-total" class="form-input" required step="500" value="${quote ? quote.totalAmount : (enq && enq.quotedAmount ? enq.quotedAmount : 38500)}">
          </div>

          <div class="form-group full-width">
            <label class="form-label">Scope &amp; Terms Notes</label>
            <textarea id="quote-notes" class="form-textarea" rows="3" placeholder="Itemized allocations and contract stipulations...">${quote ? quote.notes : 'Includes full venue hire, sound and lighting engineering, and hospitality coordination.'}</textarea>
          </div>
        </form>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Cancel</button>
        <button type="button" class="btn-gold" id="btn-save-quote">Save Quotation</button>
      `;

      AdminForms.openModal(title, content, footer);

      document.getElementById('btn-save-quote').addEventListener('click', () => {
        const form = document.getElementById('quote-form');
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const quoteData = {
          id: document.getElementById('quote-id').value || null,
          enquiryId: document.getElementById('quote-enq-ref').value,
          clientName: document.getElementById('quote-client').value,
          company: document.getElementById('quote-company').value,
          eventName: document.getElementById('quote-event').value,
          venueName: document.getElementById('quote-venue').value,
          packageId: document.getElementById('quote-package').value,
          packageName: document.getElementById('quote-package').options[document.getElementById('quote-package').selectedIndex].text,
          status: document.getElementById('quote-status').value,
          totalAmount: parseFloat(document.getElementById('quote-total').value) || 0,
          notes: document.getElementById('quote-notes').value
        };

        window.VenoraAdminData.saveQuote(quoteData);
        AdminForms.closeModal();
        if (window.VenoraAdminNav) window.VenoraAdminNav.navigateTo('quotes');
      });
    },

    // ------------------------------------------------------------------------
    // Booking Details
    // ------------------------------------------------------------------------
    showBookingDetails: function (id) {
      const bkg = window.VenoraAdminData.getBookingById(id);
      if (!bkg) return;

      const title = `Booking Details: ${bkg.id}`;
      const content = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 1.1875rem; font-weight: 700; color: var(--text-primary);">${bkg.eventName}</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">${bkg.clientName} &bull; ${bkg.company || 'Enterprise'}</p>
            </div>
            <span class="status-badge ${bkg.bookingStatus === 'Confirmed' ? 'badge-green' : 'badge-orange'}">${bkg.bookingStatus}</span>
          </div>

          <div class="form-grid">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Venue</span>
              <p style="font-weight: 600; color: var(--text-primary);">${bkg.venue}</p>
              <p style="font-size: 0.75rem; color: var(--text-secondary);">${bkg.venueLocation || ''}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Event Date &amp; Time</span>
              <p style="font-weight: 600; color: var(--text-primary);">${bkg.eventDate}</p>
              <p style="font-size: 0.75rem; color: var(--text-secondary);">${bkg.time || 'All Day'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Package Tier</span>
              <p style="font-weight: 600; color: var(--text-primary);">${bkg.package || 'Custom'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Settlement Status</span>
              <p style="font-weight: 600; color: var(--gold-primary);">${bkg.paymentStatus} ($${bkg.paidAmount.toLocaleString()} paid of $${bkg.totalAmount.toLocaleString()})</p>
            </div>
          </div>

          <!-- Inclusions -->
          <div style="background-color: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md);">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">Confirmed Deliverables</span>
            <ul style="padding-left: 1.25rem; font-size: 0.8125rem; color: var(--text-secondary);">
              ${(bkg.inclusions || []).map(inc => `<li>${inc}</li>`).join('')}
            </ul>
          </div>

          <!-- Status Controls -->
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
            <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Update Booking Status</label>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn-secondary btn-sm" id="btn-bkg-confirm">Mark Confirmed</button>
              <button type="button" class="btn-secondary btn-sm" id="btn-bkg-pending">Mark Pending Confirmation</button>
              <button type="button" class="btn-secondary btn-sm btn-danger" id="btn-bkg-cancel">Cancel Booking</button>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Close</button>
      `;

      AdminForms.openModal(title, content, footer);

      document.getElementById('btn-bkg-confirm').addEventListener('click', () => {
        window.VenoraAdminData.updateBookingStatus(id, 'Confirmed');
        AdminForms.showBookingDetails(id);
        if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
      });

      document.getElementById('btn-bkg-pending').addEventListener('click', () => {
        window.VenoraAdminData.updateBookingStatus(id, 'Pending Confirmation');
        AdminForms.showBookingDetails(id);
        if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
      });

      document.getElementById('btn-bkg-cancel').addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel this booking? This will be reflected across client records.')) {
          window.VenoraAdminData.updateBookingStatus(id, 'Cancelled');
          AdminForms.showBookingDetails(id);
          if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
        }
      });
    },

    // ------------------------------------------------------------------------
    // Client Dossier Modal
    // ------------------------------------------------------------------------
    showClientDossier: function (clientId) {
      const client = window.VenoraAdminData.getClientById(clientId);
      if (!client) return;

      const title = `Client Profile: ${client.name}`;
      const content = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; gap: 1rem; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--border-subtle);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--gold-primary), var(--gold-deep)); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.125rem; font-weight: 700;">
              ${client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${client.name}</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">${client.title || 'Corporate Planner'} &bull; <strong>${client.company}</strong></p>
            </div>
            <span class="status-badge badge-purple" style="margin-left: auto;">${client.tier}</span>
          </div>

          <div class="form-grid">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Email</span>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem;">${client.email}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Phone</span>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem;">${client.phone || 'N/A'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Location</span>
              <p style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem;">${client.location || 'San Francisco, CA'}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Account Type</span>
              <p style="font-weight: 600; color: var(--gold-primary); font-size: 0.875rem;">${client.isDemoAccount ? 'Active Demo Client' : 'Standard Client'}</p>
            </div>
          </div>

          <!-- Connected Records Summary -->
          <div>
            <h5 style="font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Connected Activity History</h5>
            <div style="background-color: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); font-size: 0.8125rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <p><strong>Enquiries Logged (${client.enquiries ? client.enquiries.length : 0}):</strong> ${(client.enquiries || []).map(e => e.id + ' (' + e.status + ')').join(', ') || 'None'}</p>
              <p><strong>Formal Quotes (${client.quotes ? client.quotes.length : 0}):</strong> ${(client.quotes || []).map(q => q.id + ' ($' + q.totalAmount.toLocaleString() + ')').join(', ') || 'None'}</p>
              <p><strong>Confirmed Bookings (${client.bookings ? client.bookings.length : 0}):</strong> ${(client.bookings || []).map(b => b.id + ' (' + b.eventName + ')').join(', ') || 'None'}</p>
              <p><strong>Billing Invoices (${client.invoices ? client.invoices.length : 0}):</strong> ${(client.invoices || []).map(i => i.id + ' (' + i.status + ')').join(', ') || 'None'}</p>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Close</button>
      `;

      AdminForms.openModal(title, content, footer);
    },

    // ------------------------------------------------------------------------
    // Invoice & Demo Payment Modal
    // ------------------------------------------------------------------------
    showInvoiceModal: function (invoiceId) {
      const inv = window.VenoraAdminData.getInvoiceById(invoiceId);
      if (!inv) return;

      const title = `Invoice Details: ${inv.id}`;
      const content = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--text-primary);">${inv.eventName}</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">${inv.clientName} &bull; ${inv.company}</p>
            </div>
            <span class="status-badge ${inv.status === 'Paid' ? 'badge-green' : (inv.status === 'Overdue' ? 'badge-red' : 'badge-orange')}">${inv.status}</span>
          </div>

          <div class="form-grid">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Issue Date</span>
              <p style="font-weight: 600; color: var(--text-primary);">${inv.issueDate}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Due Date</span>
              <p style="font-weight: 600; color: var(--text-primary);">${inv.dueDate}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Total Invoiced</span>
              <p style="font-weight: 700; font-size: 1.125rem; color: var(--text-primary);">$${(inv.totalAmount || 0).toLocaleString()}</p>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Outstanding Balance</span>
              <p style="font-weight: 700; font-size: 1.125rem; color: var(--gold-primary);">$${(inv.remainingAmount !== undefined ? inv.remainingAmount : 0).toLocaleString()}</p>
            </div>
          </div>

          <!-- Line Items Table -->
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Itemized Charges</span>
            <table class="dash-table" style="font-size: 0.8125rem;">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${(inv.lineItems || []).map(li => `
                  <tr>
                    <td>${li.description}</td>
                    <td>$${(li.amount || 0).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          ${inv.status !== 'Paid' ? `
            <div style="background-color: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--gold-primary); display: block; margin-bottom: 0.5rem;">Record Demo Payment Receipt</span>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">This logs sample settlement without transmitting real financial data.</p>
              <div style="display: flex; gap: 0.5rem;">
                <input type="number" id="demo-pay-amount" class="form-input" value="${inv.remainingAmount || inv.totalAmount}" style="max-width: 160px;">
                <button type="button" class="btn-gold btn-sm" id="btn-record-demo-pay">Record Demo Settlement</button>
              </div>
            </div>
          ` : `
            <div style="background-color: rgba(16, 185, 129, 0.08); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--status-paid); font-size: 0.8125rem; color: var(--status-paid);">
              ✓ Settled in Full &bull; ${inv.paymentMethod || 'Wire Transfer'} (${inv.paidDate})
            </div>
          `}
        </div>
      `;

      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Close</button>
      `;

      AdminForms.openModal(title, content, footer);

      const payBtn = document.getElementById('btn-record-demo-pay');
      if (payBtn) {
        payBtn.addEventListener('click', () => {
          const amount = parseFloat(document.getElementById('demo-pay-amount').value) || 0;
          if (amount > 0) {
            window.VenoraAdminData.recordDemoPayment(invoiceId, amount, 'Demo Settlement Recorded');
            AdminForms.showInvoiceModal(invoiceId);
            if (window.VenoraAdminNav) window.VenoraAdminNav.refreshCurrentSection();
          }
        });
      }
    },

    // ------------------------------------------------------------------------
    // Logout Confirmation
    // ------------------------------------------------------------------------
    showLogoutConfirmation: function () {
      const title = 'Confirm Logout';
      const content = `
        <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.5;">
          Are you sure you want to log out of the <strong>VENORA Admin Dashboard</strong>? You will be redirected to the secure portal login page.
        </p>
      `;
      const footer = `
        <button type="button" class="btn-secondary" data-action="close-modal">Stay in Dashboard</button>
        <button type="button" class="btn-gold" id="btn-confirm-logout">Log Out</button>
      `;

      AdminForms.openModal(title, content, footer);

      document.getElementById('btn-confirm-logout').addEventListener('click', () => {
        AdminForms.closeModal();
        window.location.href = '../login.html';
      });
    }
  };

  function handleEscapeKey(e) {
    if (e.key === 'Escape') {
      AdminForms.closeModal();
    }
  }

  window.VenoraAdminForms = AdminForms;
})();
