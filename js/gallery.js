/**
 * VENORA - Interactive Architectural Venue Gallery Controller (gallery.js)
 * Master controller orchestrating all 10 gallery sections:
 *  1. Hero entrance sequence
 *  2. Category filtering & atmosphere navigation
 *  3. Interactive 3D perspective gallery stage with expand/contract physics
 *  4. The Signature Collection (asymmetrical editorial showcase)
 *  5. Perspectives in Motion (tri-band kinetic continuous movement)
 *  6. Hidden Details (architectural discovery with pulsing pins)
 *  7. Light & Atmosphere (mood-driven visual chapters)
 *  8. The Endless Frame (continuous moving photographic ribbon)
 *  9. Shared Full-Screen Modal Lightbox Preview
 *  10. CTA navigation bindings
 */

(function () {
  'use strict';

  // State Management
  let currentCategory = 'All Spaces';
  let filtered3DItems = [];
  let activePanelIndex = 2; // Default center panel visually prominent
  let currentMoodId = 'warm';

  // Lightbox State
  let lightboxItems = [];
  let currentLightboxIndex = 0;
  let previouslyFocusedElement = null;
  let isEndlessPaused = false;

  /**
   * Main Initialization
   */
  function initGalleryPage() {
    if (!window.VenoraGallery) {
      console.error('[VENORA Gallery] Data module window.VenoraGallery not loaded.');
      return;
    }

    filtered3DItems = window.VenoraGallery.get3DItems();
    lightboxItems = filtered3DItems;

    // Initialize all sections
    initHeroAnimation();
    renderCategoryPills();
    renderGalleryPanels();
    bindMobile3DControls();
    renderSignatureCollection();
    renderPerspectivesInMotion();
    renderHiddenDetails();
    renderLightAndAtmosphere();
    renderEndlessFrame();
    bindLightboxEvents();
    initScrollReveals();
  }

  /* ==========================================================================
     1. Hero Entrance Sequence
     ========================================================================== */
  function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.gallery-hero-section .reveal-on-scroll');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      heroElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 80 + index * 120);
    });
  }

  /* ==========================================================================
     2. Category Filter Navigation (Section 2)
     ========================================================================== */
  function renderCategoryPills() {
    const navContainer = document.querySelector('.gallery-category-nav');
    if (!navContainer) return;

    const categories = window.VenoraGallery.getCategories();

    navContainer.innerHTML = categories.map(cat => {
      const isActive = cat === currentCategory;
      return `
        <button type="button" 
                class="category-pill-btn ${isActive ? 'is-active' : ''}" 
                data-category="${cat}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}">
          ${cat}
        </button>
      `;
    }).join('');

    // Attach click events
    navContainer.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (cat === currentCategory) return;
        setCategory(cat);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('gallery-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        setCategory('All Spaces');
      });
    }
  }

  function setCategory(cat) {
    currentCategory = cat;
    filtered3DItems = window.VenoraGallery.get3DByCategory(cat);

    // Update active pill UI
    const navContainer = document.querySelector('.gallery-category-nav');
    if (navContainer) {
      navContainer.querySelectorAll('.category-pill-btn').forEach(btn => {
        const isMatch = btn.getAttribute('data-category') === cat;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }

    // Update count badge & reset button
    const countBadge = document.getElementById('gallery-items-count');
    const resetBtn = document.getElementById('gallery-reset-btn');
    if (countBadge) {
      countBadge.textContent = cat === 'All Spaces'
        ? `Showing all ${filtered3DItems.length} curated spaces`
        : `Showing ${filtered3DItems.length} spaces in "${cat}"`;
    }
    if (resetBtn) {
      resetBtn.hidden = (cat === 'All Spaces');
    }

    // Reset active panel index to middle of new results
    activePanelIndex = Math.min(2, Math.floor(filtered3DItems.length / 2));

    renderGalleryPanels();
  }

  /* ==========================================================================
     3. Signature Interactive 3D Perspective Gallery (Section 3)
     ========================================================================== */
  function renderGalleryPanels() {
    const track = document.getElementById('gallery-3d-track');
    if (!track) return;

    if (filtered3DItems.length === 0) {
      track.innerHTML = `
        <div class="gallery-empty-state text-center" style="padding: 4rem 1rem; color: var(--text-secondary); width: 100%;">
          <p>No venues found in this category.</p>
        </div>
      `;
      return;
    }

    track.innerHTML = filtered3DItems.map((item, index) => {
      const isActive = index === activePanelIndex;
      return `
        <article class="gallery-panel ${isActive ? 'is-active' : ''}" 
                 data-index="${index}"
                 data-id="${item.id}"
                 tabindex="0"
                 role="button"
                 aria-label="View ${item.title} details"
                 aria-expanded="${isActive ? 'true' : 'false'}">
          <img src="${item.image}" alt="${item.imageAlt}" class="gallery-panel-img" loading="${index < 5 ? 'eager' : 'lazy'}">
          <div class="gallery-panel-shade" aria-hidden="true"></div>

          <!-- Vertical Condensed Indicator for Narrow State -->
          <div class="gallery-panel-collapsed-meta" aria-hidden="true">
            <span>${item.category}</span>
          </div>

          <!-- Expanded Full Content Caption -->
          <div class="gallery-panel-caption">
            <div class="gallery-caption-top">
              <span class="gallery-category-tag">
                <span class="gallery-tag-dot"></span>
                <span>${item.category}</span>
              </span>
              <span class="gallery-capacity-pill">${item.capacity}</span>
            </div>
            <h3 class="gallery-panel-title">${item.title}</h3>
            <p class="gallery-panel-desc">${item.shortDesc}</p>
            <div class="gallery-expand-cta" aria-hidden="true">
              <span>Expand Preview</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindPanelInteractions();
    updatePaginationDots();
  }

  function bindPanelInteractions() {
    const track = document.getElementById('gallery-3d-track');
    if (!track) return;
    const panels = track.querySelectorAll('.gallery-panel');

    panels.forEach(panel => {
      // Desktop Mouse Hover: Smooth expansion & perspective tilt
      panel.addEventListener('mouseenter', () => {
        track.classList.add('has-active');
        panels.forEach(p => {
          p.classList.remove('is-active');
          p.setAttribute('aria-expanded', 'false');
        });
        panel.classList.add('is-active');
        panel.setAttribute('aria-expanded', 'true');
        activePanelIndex = parseInt(panel.getAttribute('data-index'), 10);
      });

      // Click or Tap: Open Shared Lightbox
      panel.addEventListener('click', () => {
        const id = panel.getAttribute('data-id');
        openLightboxById(id, filtered3DItems);
      });

      // Keyboard Accessibility (Enter / Space)
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = panel.getAttribute('data-id');
          openLightboxById(id, filtered3DItems);
        }
      });
    });

    // Pointer leaves 3D track -> Restore prominent center panel
    track.addEventListener('mouseleave', () => {
      track.classList.remove('has-active');
      panels.forEach((p, idx) => {
        const isDefault = idx === activePanelIndex;
        p.classList.toggle('is-active', isDefault);
        p.setAttribute('aria-expanded', isDefault ? 'true' : 'false');
      });
    });
  }

  function bindMobile3DControls() {
    const track = document.getElementById('gallery-3d-track');
    const prevBtn = document.getElementById('gallery-prev-panel-btn');
    const nextBtn = document.getElementById('gallery-next-panel-btn');

    if (prevBtn && track) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    if (nextBtn && track) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    if (track) {
      let scrollTimeout;
      track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveScrollPanel, 60);
      });
    }
  }

  function updatePaginationDots() {
    const dotsContainer = document.getElementById('gallery-pagination-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = filtered3DItems.map((_, idx) => `
      <span class="pagination-dot ${idx === activePanelIndex ? 'is-active' : ''}" data-index="${idx}"></span>
    `).join('');

    dotsContainer.querySelectorAll('.pagination-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        const track = document.getElementById('gallery-3d-track');
        const panels = track.querySelectorAll('.gallery-panel');
        if (panels[idx]) {
          panels[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });
  }

  function updateActiveScrollPanel() {
    const track = document.getElementById('gallery-3d-track');
    if (!track) return;

    const panels = track.querySelectorAll('.gallery-panel');
    const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    panels.forEach((panel, idx) => {
      const box = panel.getBoundingClientRect();
      const panelCenter = box.left + box.width / 2;
      const dist = Math.abs(trackCenter - panelCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === closestIdx);
    });
  }

  /* ==========================================================================
     4. Section Four — The Signature Collection (Asymmetrical Showcase)
     ========================================================================== */
  function renderSignatureCollection() {
    const container = document.getElementById('signature-editorial-grid');
    if (!container) return;

    const items = window.VenoraGallery.getSignatureCollection();
    if (!items || items.length === 0) return;

    const featured = items[0];
    const supporting = items.slice(1);

    container.innerHTML = `
      <!-- Featured Dominant Frame (001) -->
      <article class="sig-card-featured" 
               data-id="${featured.id}" 
               tabindex="0" 
               role="button" 
               aria-label="View ${featured.title} details">
        <img src="${featured.image}" alt="${featured.imageAlt}" class="sig-img" loading="lazy">
        <div class="sig-overlay" aria-hidden="true"></div>
        <div class="sig-numeral" aria-hidden="true">${featured.numeral}</div>
        <div class="sig-featured-content">
          <span class="sig-category">
            <span class="gallery-tag-dot"></span>
            ${featured.category}
          </span>
          <h3 class="sig-title">${featured.title}</h3>
          <p class="sig-desc">${featured.fullDesc || featured.shortDesc}</p>
          <div class="gallery-expand-cta" aria-hidden="true">
            <span>Explore Signature Frame</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </div>
        </div>
      </article>

      <!-- Supporting Editorial Cards (002, 003, 004) -->
      <div class="sig-supporting-col">
        ${supporting.map(sub => `
          <article class="sig-card-supporting" 
                   data-id="${sub.id}" 
                   tabindex="0" 
                   role="button" 
                   aria-label="View ${sub.title} details">
            <div class="sig-sub-thumb">
              <img src="${sub.image}" alt="${sub.imageAlt}" loading="lazy">
            </div>
            <div class="sig-sub-content">
              <span class="sig-sub-numeral" aria-hidden="true">${sub.numeral}</span>
              <span class="sig-sub-category">${sub.category}</span>
              <h4 class="sig-sub-title">${sub.title}</h4>
              <p class="sig-sub-desc">${sub.shortDesc}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    // Attach click & keyboard listeners to open lightbox
    container.querySelectorAll('[data-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openLightboxById(id, items);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          openLightboxById(id, items);
        }
      });
    });
  }

  /* ==========================================================================
     5. Section Five — Perspectives in Motion (Multi-Band Horizontal Scroll)
     ========================================================================== */
  function renderPerspectivesInMotion() {
    const motionData = window.VenoraGallery.getMotionPerspectives();
    if (!motionData) return;

    const renderBand = (trackId, items) => {
      const track = document.getElementById(trackId);
      if (!track || !items) return;

      // Duplicate once for seamless infinite kinetic loop
      const duplicated = [...items, ...items];

      track.innerHTML = duplicated.map((item, idx) => {
        const isDuplicate = idx >= items.length;
        return `
          <article class="motion-card" 
                   data-id="${item.id}"
                   tabindex="${isDuplicate ? '-1' : '0'}"
                   role="button"
                   aria-hidden="${isDuplicate ? 'true' : 'false'}"
                   aria-label="View ${item.title}">
            <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
            <div class="motion-card-overlay">
              <span class="motion-category">${item.category}</span>
              <h4 class="motion-title">${item.title}</h4>
            </div>
          </article>
        `;
      }).join('');

      // Click to open lightbox
      track.querySelectorAll('.motion-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          openLightboxById(id, items);
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const id = card.getAttribute('data-id');
            openLightboxById(id, items);
          }
        });
      });
    };

    renderBand('motion-track-top', motionData.topBand);
    renderBand('motion-track-middle', motionData.middleBand);
    renderBand('motion-track-bottom', motionData.bottomBand);
  }

  /* ==========================================================================
     6. Section Six — Hidden Details (Architectural Discovery with Pulsing Pins)
     ========================================================================== */
  function renderHiddenDetails() {
    const container = document.getElementById('details-discovery-grid');
    if (!container) return;

    const items = window.VenoraGallery.getHiddenDetails();
    if (!items || items.length === 0) return;

    container.innerHTML = items.map(item => `
      <article class="detail-card" 
               data-id="${item.id}"
               tabindex="0"
               role="button"
               aria-label="Inspect ${item.title}">
        <img src="${item.image}" alt="${item.imageAlt}" class="detail-img" loading="lazy">

        <!-- Pulsing Detail Marker Pin -->
        <button type="button" 
                class="detail-pin-marker" 
                style="left: ${item.pinX}%; top: ${item.pinY}%;" 
                aria-label="${item.pinLabel}" 
                title="${item.pinLabel}">
          <span>+</span>
        </button>

        <!-- Editorial Caption Box -->
        <div class="detail-caption-box">
          <span class="detail-cat-badge">${item.category}</span>
          <h3 class="detail-title">${item.title}</h3>
          <p class="detail-desc">${item.shortDesc}</p>
        </div>
      </article>
    `).join('');

    // Attach click and keyboard listeners
    container.querySelectorAll('.detail-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        openLightboxById(id, items);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          openLightboxById(id, items);
        }
      });
    });
  }

  /* ==========================================================================
     7. Section Seven — Light & Atmosphere (Mood-Based Chapters)
     ========================================================================== */
  function renderLightAndAtmosphere() {
    const triggersContainer = document.querySelector('.atmosphere-mood-triggers');
    const stageContainer = document.getElementById('atmosphere-showcase-stage');
    if (!triggersContainer || !stageContainer) return;

    const moods = window.VenoraGallery.getMoods();

    // Render Mood Trigger Buttons
    triggersContainer.innerHTML = moods.map(mood => {
      const isActive = mood.id === currentMoodId;
      return `
        <button type="button" 
                class="mood-trigger-btn ${isActive ? 'is-active' : ''}" 
                data-mood="${mood.id}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}">
          ${mood.label}
        </button>
      `;
    }).join('');

    triggersContainer.querySelectorAll('.mood-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const moodId = btn.getAttribute('data-mood');
        if (moodId === currentMoodId) return;
        setMood(moodId);
      });
    });

    renderMoodShowcaseStage(currentMoodId);
  }

  function setMood(moodId) {
    currentMoodId = moodId;

    // Update active trigger styling
    const triggers = document.querySelectorAll('.mood-trigger-btn');
    triggers.forEach(btn => {
      const isMatch = btn.getAttribute('data-mood') === moodId;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Render updated mood showcase stage with soft opacity transition
    const stage = document.getElementById('atmosphere-showcase-stage');
    if (stage) {
      stage.style.opacity = '0.35';
      setTimeout(() => {
        renderMoodShowcaseStage(moodId);
        stage.style.opacity = '1';
      }, 180);
    }
  }

  function renderMoodShowcaseStage(moodId) {
    const stage = document.getElementById('atmosphere-showcase-stage');
    if (!stage) return;

    const moodData = window.VenoraGallery.getMoodData(moodId);
    if (!moodData) return;

    const primary = moodData.primary;
    const supporting = moodData.supporting || [];
    const allMoodItems = [primary, ...supporting];

    stage.innerHTML = `
      <!-- Primary Feature Card -->
      <article class="mood-primary-card" 
               data-id="${primary.id}" 
               tabindex="0" 
               role="button" 
               aria-label="View ${primary.title}">
        <img src="${primary.image}" alt="${primary.imageAlt}" loading="lazy">
        <div class="mood-primary-overlay"></div>
        <div class="mood-primary-caption">
          <span class="mood-narrative-tag">${moodData.narrative}</span>
          <h3 class="mood-primary-title">${primary.title}</h3>
          <p class="mood-primary-desc">${primary.fullDesc || primary.shortDesc}</p>
        </div>
      </article>

      <!-- Supporting Atmosphere Cards -->
      <div class="mood-supporting-col">
        ${supporting.map(sub => `
          <article class="mood-sub-card" 
                   data-id="${sub.id}" 
                   tabindex="0" 
                   role="button" 
                   aria-label="View ${sub.title}">
            <img src="${sub.image}" alt="${sub.imageAlt}" loading="lazy">
            <div class="mood-sub-overlay"></div>
            <div class="mood-sub-caption">
              <h4 class="mood-sub-title">${sub.title}</h4>
              <p class="mood-sub-desc">${sub.shortDesc}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    // Attach click and keyboard listeners to open lightbox
    stage.querySelectorAll('[data-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openLightboxById(id, allMoodItems);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          openLightboxById(id, allMoodItems);
        }
      });
    });
  }

  /* ==========================================================================
     8. Section Eight — The Endless Frame (Continuous Moving Ribbon)
     ========================================================================== */
  function renderEndlessFrame() {
    const track = document.getElementById('endless-ribbon-track');
    const toggleBtn = document.getElementById('endless-toggle-motion-btn');
    if (!track) return;

    const items = window.VenoraGallery.getEndlessFrameItems();
    if (!items || items.length === 0) return;

    // Duplicate once for seamless infinite loop
    const duplicated = [...items, ...items];

    track.innerHTML = duplicated.map((item, idx) => {
      const isDuplicate = idx >= items.length;
      return `
        <article class="endless-card" 
                 data-id="${item.id}"
                 tabindex="${isDuplicate ? '-1' : '0'}"
                 role="button"
                 aria-hidden="${isDuplicate ? 'true' : 'false'}"
                 aria-label="View ${item.title}">
          <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
          <div class="endless-card-shade">
            <span class="endless-cat">${item.category}</span>
            <h4 class="endless-title">${item.title}</h4>
          </div>
        </article>
      `;
    }).join('');

    // Toggle Play / Pause button
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isEndlessPaused = !isEndlessPaused;
        track.classList.toggle('is-paused', isEndlessPaused);
        toggleBtn.setAttribute('aria-pressed', isEndlessPaused ? 'true' : 'false');
        
        const iconSpan = toggleBtn.querySelector('.btn-pause-icon');
        const textSpan = toggleBtn.querySelector('.btn-pause-text');
        if (iconSpan) iconSpan.textContent = isEndlessPaused ? '▶' : '❚❚';
        if (textSpan) textSpan.textContent = isEndlessPaused ? 'Resume Motion' : 'Pause Motion';
      });
    }

    // Click to open lightbox
    track.querySelectorAll('.endless-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openLightboxById(id, items);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          openLightboxById(id, items);
        }
      });
    });
  }

  /* ==========================================================================
     9. Section Nine — Shared Full-Screen Image Preview (Lightbox Modal)
     ========================================================================== */
  function bindLightboxEvents() {
    const lightbox = document.getElementById('gallery-lightbox');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const backdrop = document.getElementById('lightbox-backdrop');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepLightbox(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepLightbox(1);
      });
    }

    // Keyboard Shortcuts: Esc to close, Left/Right arrows to step
    window.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.hasAttribute('hidden')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepLightbox(1);
      }
    });

    // Touch swipe gesture support on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const stage = document.querySelector('.lightbox-dialog');
    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) stepLightbox(1); // Swipe left -> Next
          else stepLightbox(-1); // Swipe right -> Prev
        }
      }, { passive: true });
    }
  }

  function openLightboxById(itemId, contextItems) {
    if (!window.VenoraGallery) return;

    // Use passed contextItems or fallback to all flattened items
    lightboxItems = (contextItems && contextItems.length > 0)
      ? contextItems
      : window.VenoraGallery.getAllFlattened();

    let targetIndex = lightboxItems.findIndex(it => it.id === itemId);
    if (targetIndex === -1) {
      // If item wasn't in contextItems, look up in global index
      const item = window.VenoraGallery.getItemById(itemId);
      if (item) {
        lightboxItems = [item];
        targetIndex = 0;
      } else {
        return;
      }
    }

    previouslyFocusedElement = document.activeElement;
    currentLightboxIndex = targetIndex;

    renderLightboxContent();

    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
      lightbox.removeAttribute('hidden');
      document.body.classList.add('lightbox-active');

      const closeBtn = document.getElementById('lightbox-close-btn');
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
      lightbox.setAttribute('hidden', '');
      document.body.classList.remove('lightbox-active');
    }

    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    }
  }

  function stepLightbox(delta) {
    if (lightboxItems.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + delta + lightboxItems.length) % lightboxItems.length;
    renderLightboxContent();
  }

  function renderLightboxContent() {
    const item = lightboxItems[currentLightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const category = document.getElementById('lightbox-category');
    const counter = document.getElementById('lightbox-counter');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');
    const capVal = document.getElementById('lightbox-capacity-val');
    const areaVal = document.getElementById('lightbox-area-val');
    const specsRow = document.getElementById('lightbox-specs');

    if (img) {
      img.style.opacity = '0.3';
      img.src = item.image;
      img.alt = item.imageAlt || item.title;
      img.onload = () => { img.style.opacity = '1'; };
    }

    if (category) category.textContent = item.category || 'Venue Perspective';
    if (counter) counter.textContent = `${currentLightboxIndex + 1} of ${lightboxItems.length}`;
    if (title) title.textContent = item.title || 'VENORA Space';
    if (desc) desc.textContent = item.fullDesc || item.shortDesc || '';

    // Capacity and Area specs (hide if not applicable)
    if (item.capacity && item.area) {
      if (specsRow) specsRow.style.display = 'flex';
      if (capVal) capVal.textContent = item.capacity;
      if (areaVal) areaVal.textContent = item.area;
    } else if (item.capacity) {
      if (specsRow) specsRow.style.display = 'flex';
      if (capVal) capVal.textContent = item.capacity;
      if (areaVal) areaVal.textContent = 'Custom Layout';
    } else {
      if (specsRow) specsRow.style.display = 'none';
    }
  }

  /* ==========================================================================
     10. Scroll Reveals & Accessibility
     ========================================================================== */
  function initScrollReveals() {
    const targets = document.querySelectorAll('.reveal-on-scroll:not(.gallery-hero-section .reveal-on-scroll):not(.is-revealed)');
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => el.classList.add('is-revealed'));
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

    targets.forEach(target => observer.observe(target));
  }

  // Self Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryPage);
  } else {
    initGalleryPage();
  }
})();
