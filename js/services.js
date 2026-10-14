/**
 * VENORA - Services Overview Page Controller
 * Handles dynamic rendering of the 6 services, category filtering,
 * and scroll reveal observers.
 */

(function () {
  'use strict';

  function initServices() {
    if (!window.VenoraServices) {
      console.error('VenoraServices data not loaded.');
      return;
    }

    const services = window.VenoraServices.getAll();
    const gridContainer = document.getElementById('services-grid-container');
    const filterButtons = document.querySelectorAll('.filter-pill-btn');
    const counterEl = document.getElementById('filter-counter-text');

    if (!gridContainer) return;

    let activeCategory = 'All Services';

    function renderServices(filtered) {
      gridContainer.innerHTML = '';

      if (filtered.length === 0) {
        gridContainer.innerHTML = `
          <div class="services-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
            <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1.5rem;">No services found matching this category.</p>
            <button type="button" class="btn btn-outline-gold" id="reset-filter-btn">View All Services</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-filter-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => setCategory('All Services'));
        }
        return;
      }

      filtered.forEach((service, index) => {
        const card = document.createElement('article');
        card.className = `service-item-card reveal-on-scroll stagger-${(index % 3) + 1}`;
        card.setAttribute('data-category', service.category);
        card.setAttribute('data-id', service.id);

        const benefitsHtml = service.benefits.slice(0, 3).map(b => `
          <li>
            <span class="benefit-bullet-dot" aria-hidden="true"></span>
            <span>${b}</span>
          </li>
        `).join('');

        card.innerHTML = `
          <div class="service-item-media">
            <span class="service-item-category-tag">${service.category}</span>
            <img src="${service.image}" alt="${service.imageAlt}" class="service-item-img" loading="lazy">
          </div>
          <div class="service-item-body">
            <h3 class="service-item-title">${service.name}</h3>
            <p class="service-item-desc">${service.shortDescription}</p>
            <ul class="service-item-benefits" aria-label="Key highlights">
              ${benefitsHtml}
            </ul>
            <div class="service-item-footer">
              <a href="service-details.html?service=${service.slug}" class="service-details-link" aria-label="View details for ${service.name}">
                <span>View Details</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a href="checkout.html?service=${service.slug}" class="btn btn-primary service-enquire-btn" aria-label="Enquire about ${service.name}">
                <span>Enquire</span>
              </a>
            </div>
          </div>
        `;

        gridContainer.appendChild(card);
      });

      // Update counter
      if (counterEl) {
        counterEl.textContent = `Showing ${filtered.length} of ${services.length} services`;
      }

      // Re-trigger scroll observer for dynamically added cards
      initScrollReveals();
    }

    function setCategory(category) {
      activeCategory = category;

      // Update active pill button state
      filterButtons.forEach(btn => {
        const cat = btn.getAttribute('data-category');
        const isActive = (cat === category);
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      // Filter services
      if (category === 'All Services') {
        renderServices(services);
      } else {
        const filtered = services.filter(s => s.category === category);
        renderServices(filtered);
      }
    }

    // Attach click listeners to filter pills
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const category = btn.getAttribute('data-category');
        setCategory(category);
      });
    });

    // Initial render
    setCategory('All Services');
  }

  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    if (revealElements.length === 0) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initServices();
      initScrollReveals();
    });
  } else {
    initServices();
    initScrollReveals();
  }
})();
