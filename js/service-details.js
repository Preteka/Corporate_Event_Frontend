/**
 * VENORA - Dynamic Service Details Page Controller
 * Reads query param `?service=<slug>`, retrieves content from window.VenoraServices,
 * dynamically populates the page template, manages FAQ accordions, and handles fallback states.
 */

(function () {
  'use strict';

  function initServiceDetails() {
    if (!window.VenoraServices) {
      console.error('VenoraServices data not loaded.');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const serviceSlug = urlParams.get('service') || urlParams.get('id') || 'venue-discovery';

    const service = window.VenoraServices.getBySlug(serviceSlug);

    const mainContent = document.getElementById('service-details-root');
    const notFoundEl = document.getElementById('service-not-found');

    if (!service) {
      if (mainContent) mainContent.hidden = true;
      if (notFoundEl) notFoundEl.hidden = false;
      document.title = 'Service Not Found | VENORA Events & Venues';
      return;
    }

    if (mainContent) mainContent.hidden = false;
    if (notFoundEl) notFoundEl.hidden = true;

    // 1. Update Document Title & Meta
    document.title = `${service.name} | VENORA Corporate Services`;

    // 2. Populate Breadcrumbs
    const currentCrumb = document.getElementById('crumb-current-service');
    if (currentCrumb) currentCrumb.textContent = service.name;

    // 3. Populate Hero
    const catPill = document.getElementById('service-cat-pill');
    if (catPill) catPill.textContent = service.category;

    const heroTitle = document.getElementById('service-hero-title');
    if (heroTitle) heroTitle.textContent = service.name;

    const heroDesc = document.getElementById('service-hero-desc');
    if (heroDesc) heroDesc.textContent = service.shortDescription;

    const heroImg = document.getElementById('service-hero-img');
    if (heroImg) {
      heroImg.src = service.image;
      heroImg.alt = service.imageAlt || service.name;
    }

    const heroBadge = document.getElementById('service-hero-badge');
    if (heroBadge) heroBadge.textContent = service.badge || service.category;

    const primaryEnquireBtn = document.getElementById('service-primary-enquire-btn');
    if (primaryEnquireBtn) {
      primaryEnquireBtn.href = `checkout.html?service=${encodeURIComponent(service.slug)}`;
    }

    // 4. Populate Overview & Benefits
    const overviewText = document.getElementById('service-full-description');
    if (overviewText) overviewText.textContent = service.fullDescription;

    const benefitsList = document.getElementById('service-benefits-list');
    if (benefitsList && service.benefits) {
      benefitsList.innerHTML = service.benefits.map(b => `
        <li>
          <span class="benefit-check-icon" aria-hidden="true">✓</span>
          <span>${b}</span>
        </li>
      `).join('');
    }

    // 5. Populate Features
    const featuresContainer = document.getElementById('service-features-container');
    if (featuresContainer && service.features) {
      featuresContainer.innerHTML = service.features.map(f => `
        <div class="feature-box-card reveal-on-scroll">
          <div class="feature-box-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="feature-box-title">${f.title}</h3>
          <p class="feature-box-desc">${f.desc}</p>
        </div>
      `).join('');
    }

    // 6. Populate Process Steps
    const processContainer = document.getElementById('service-process-container');
    if (processContainer && service.process) {
      processContainer.innerHTML = service.process.map(p => `
        <div class="service-step-card reveal-on-scroll">
          <div class="service-step-pill">${p.step}</div>
          <h3 class="service-step-title">${p.title}</h3>
          <p class="service-step-desc">${p.desc}</p>
        </div>
      `).join('');
    }

    // 7. Populate Pricing Banner
    const pricingDesc = document.getElementById('service-pricing-desc');
    if (pricingDesc && service.pricing) {
      pricingDesc.textContent = service.pricing.description;
    }

    const bannerEnquireBtn = document.getElementById('pricing-banner-enquire-btn');
    if (bannerEnquireBtn) {
      bannerEnquireBtn.href = `checkout.html?service=${encodeURIComponent(service.slug)}`;
    }

    // 8. Populate FAQs Accordion
    const faqsContainer = document.getElementById('service-faqs-container');
    if (faqsContainer && service.faqs) {
      faqsContainer.innerHTML = service.faqs.map((faq, index) => `
        <div class="faq-accordion-item ${index === 0 ? 'is-open' : ''}">
          <button type="button" class="faq-accordion-trigger" id="faq-trigger-${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="faq-content-${index}">
            <span>${faq.question}</span>
            <svg class="faq-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-accordion-content" id="faq-content-${index}" role="region" aria-labelledby="faq-trigger-${index}" ${index === 0 ? '' : 'hidden'}>
            <p>${faq.answer}</p>
          </div>
        </div>
      `).join('');

      initFaqAccordion();
    }

    // 9. Populate Related Services
    const relatedContainer = document.getElementById('service-related-container');
    if (relatedContainer) {
      const related = window.VenoraServices.getRelated(service.slug, 3);
      relatedContainer.innerHTML = related.map(rel => `
        <article class="related-service-card reveal-on-scroll">
          <div class="related-card-media">
            <img src="${rel.image}" alt="${rel.imageAlt}" class="related-card-img" loading="lazy">
          </div>
          <div class="related-card-body">
            <h3 class="related-card-title">${rel.name}</h3>
            <p class="related-card-desc">${rel.shortDescription}</p>
            <a href="service-details.html?service=${rel.slug}" class="related-card-link" aria-label="Explore ${rel.name}">
              <span>View Details</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
      `).join('');
    }

    // 10. Update Final CTA link
    const finalEnquireBtn = document.getElementById('final-enquire-btn');
    if (finalEnquireBtn) {
      finalEnquireBtn.href = `checkout.html?service=${encodeURIComponent(service.slug)}`;
    }

    // 11. Run Scroll Reveals
    initScrollReveals();
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceDetails);
  } else {
    initServiceDetails();
  }
})();
