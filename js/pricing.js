/**
 * VENORA - Pricing Page Controller
 * Dynamically renders the 3 packages, package comparison matrix table,
 * and pricing FAQs accordion.
 */

(function () {
  'use strict';

  function initPricingPage() {
    if (!window.VenoraPricing) {
      console.error('VenoraPricing data not loaded.');
      return;
    }

    const packages = window.VenoraPricing.getAll();
    const comparison = window.VenoraPricing.getComparison();
    const faqs = window.VenoraPricing.getFaqs();

    // 1. Render Pricing Cards
    const cardsGrid = document.getElementById('pricing-cards-container');
    if (cardsGrid && packages) {
      cardsGrid.innerHTML = packages.map((pkg, index) => {
        const isFeatured = pkg.featured;
        const featuredBadgeHtml = isFeatured ? `<div class="featured-pill-badge" aria-hidden="true">${pkg.badge}</div>` : '';

        const inclusionsHtml = pkg.inclusions.map(inc => `
          <li>
            <span class="inclusion-check" aria-hidden="true">✓</span>
            <span>${inc}</span>
          </li>
        `).join('');

        return `
          <article class="pricing-tier-card ${isFeatured ? 'is-featured' : ''} reveal-on-scroll stagger-${index + 1}">
            ${featuredBadgeHtml}
            <div class="tier-card-header">
              <span class="tier-badge-label">${pkg.badge}</span>
              <h3 class="tier-card-name">${pkg.name}</h3>
              <p class="tier-card-tagline">${pkg.tagline}</p>
            </div>

            <div class="tier-price-box">
              <div class="tier-price-display">${pkg.priceDisplay}</div>
              <p class="tier-sample-note">${pkg.sampleNote}</p>
            </div>

            <ul class="tier-inclusions-list" aria-label="${pkg.name} inclusions">
              ${inclusionsHtml}
            </ul>

            <div class="tier-exclusions-note">
              ${pkg.exclusionsNote}
            </div>

            <a href="${pkg.ctaHref}" class="btn ${isFeatured ? 'btn-primary' : 'btn-outline-gold'} tier-card-cta" aria-label="Choose ${pkg.name} package">
              <span>${pkg.ctaLabel}</span>
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </article>
        `;
      }).join('');
    }

    // 2. Render Package Comparison Table
    const tableBody = document.getElementById('comparison-table-body');
    if (tableBody && comparison) {
      let rowsHtml = '';
      comparison.forEach(cat => {
        rowsHtml += `
          <tr class="category-row">
            <th colspan="4" scope="colgroup">${cat.category}</th>
          </tr>
        `;

        cat.features.forEach(feat => {
          function renderCell(val) {
            if (val === true) {
              return '<span class="check-icon-table" aria-label="Included">✓</span>';
            } else if (val === false) {
              return '<span class="dash-icon-table" aria-label="Not included">—</span>';
            } else {
              return `<span>${val}</span>`;
            }
          }

          rowsHtml += `
            <tr>
              <td class="feature-name">${feat.name}</td>
              <td class="table-cell-plan">${renderCell(feat.essential)}</td>
              <td class="table-cell-plan">${renderCell(feat.professional)}</td>
              <td class="table-cell-plan">${renderCell(feat.signature)}</td>
            </tr>
          `;
        });
      });

      tableBody.innerHTML = rowsHtml;
    }

    // 3. Render FAQs Accordion
    const faqsContainer = document.getElementById('pricing-faqs-container');
    if (faqsContainer && faqs) {
      faqsContainer.innerHTML = faqs.map((faq, index) => `
        <div class="faq-accordion-item ${index === 0 ? 'is-open' : ''}">
          <button type="button" class="faq-accordion-trigger" id="pricing-faq-trigger-${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="pricing-faq-content-${index}">
            <span>${faq.question}</span>
            <svg class="faq-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-accordion-content" id="pricing-faq-content-${index}" role="region" aria-labelledby="pricing-faq-trigger-${index}" ${index === 0 ? '' : 'hidden'}>
            <p>${faq.answer}</p>
          </div>
        </div>
      `).join('');

      initFaqAccordion();
    }

    initHeroAnimation();
    initScrollReveals();
  }

  function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.pricing-hero-section .reveal-on-scroll');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      heroElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 100 + index * 120);
    });
  }

  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-accordion-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-accordion-item');
        const content = item.querySelector('.faq-accordion-content');
        const isOpen = item.classList.contains('is-open');

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          content.hidden = true;
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          content.hidden = false;
        }
      });
    });
  }

  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.pricing-hero-section .reveal-on-scroll):not(.is-revealed)');
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingPage);
  } else {
    initPricingPage();
  }
})();
