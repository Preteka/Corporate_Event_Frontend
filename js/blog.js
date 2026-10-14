/**
 * VENORA - Journal & Blog Controller (blog.js)
 * Coordinates search filtering, category pill toggles, dynamic card rendering,
 * and newsletter subscription interaction.
 */

(function () {
  'use strict';

  let currentCategory = 'All Articles';
  let searchQuery = '';

  function initBlogListing() {
    if (!window.VenoraBlogs) {
      console.error('[VENORA] VenoraBlogs data module not loaded.');
      return;
    }

    renderCategoryPills();
    renderFeaturedArticle();
    renderBlogGrid();
    bindSearchEvents();
    bindNewsletterForm();
    initHeroAnimation();
    initScrollReveals();
  }

  /**
   * 0. Hero Entrance Animation
   */
  function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.blog-hero-section .reveal-on-scroll');
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

  /**
   * 1. Render Category Filter Pills
   */
  function renderCategoryPills() {
    const pillsContainer = document.getElementById('blog-category-pills');
    if (!pillsContainer) return;

    const categories = window.VenoraBlogs.getCategories();

    pillsContainer.innerHTML = categories.map(cat => {
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
    pillsContainer.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (cat === currentCategory) return;

        currentCategory = cat;

        // Update active class
        pillsContainer.querySelectorAll('.category-pill-btn').forEach(b => {
          const active = b.getAttribute('data-category') === currentCategory;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        updateFilterResults();
      });
    });
  }

  /**
   * 2. Render Featured Article Section
   */
  function renderFeaturedArticle() {
    const container = document.getElementById('featured-article-container');
    if (!container) return;

    const featured = window.VenoraBlogs.getFeatured();
    if (!featured) {
      container.parentElement.hidden = true;
      return;
    }

    container.innerHTML = `
      <article class="featured-article-card reveal-on-scroll" aria-label="Featured Article: ${featured.title}">
        <div class="featured-image-box">
          <img src="${featured.image}" alt="${featured.imageAlt || featured.title}" class="featured-image" loading="lazy">
          <span class="featured-badge-pill" aria-hidden="true">Featured Editorial</span>
        </div>
        <div class="featured-content-box">
          <span class="featured-cat-tag">${featured.category}</span>
          <h2 class="featured-title">
            <a href="blog-details.html?slug=${featured.slug}">${featured.title}</a>
          </h2>
          <p class="featured-excerpt">${featured.excerpt}</p>
          
          <div class="article-meta-row">
            <img src="${featured.author.photo}" alt="" class="meta-author-avatar" aria-hidden="true">
            <div class="meta-info-col">
              <span class="meta-author-name">${featured.author.name}</span>
              <div class="meta-date-reading">
                <span>${featured.publishedDisplay}</span>
                <span class="meta-dot-sep" aria-hidden="true">&bull;</span>
                <span>${featured.readingTime} min read</span>
              </div>
            </div>
          </div>

          <a href="blog-details.html?slug=${featured.slug}" class="read-more-link" aria-label="Read full article: ${featured.title}">
            <span>Read Article</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Filter articles according to category and search query
   */
  function getFilteredArticles() {
    const all = window.VenoraBlogs.getAll();
    const cleanSearch = searchQuery.toLowerCase().trim();

    return all.filter(article => {
      // 1. Category check
      const matchesCategory = (currentCategory === 'All Articles') || (article.category === currentCategory);
      if (!matchesCategory) return false;

      // 2. Search check
      if (!cleanSearch) return true;

      const titleMatch = article.title.toLowerCase().includes(cleanSearch);
      const excerptMatch = article.excerpt.toLowerCase().includes(cleanSearch);
      const catMatch = article.category.toLowerCase().includes(cleanSearch);
      const tagMatch = article.tags && article.tags.some(t => t.toLowerCase().includes(cleanSearch));
      
      // Also search inside content blocks if available
      const contentMatch = article.content && article.content.some(block => {
        if (block.text) return block.text.toLowerCase().includes(cleanSearch);
        if (block.items) return block.items.some(it => it.toLowerCase().includes(cleanSearch));
        return false;
      });

      return titleMatch || excerptMatch || catMatch || tagMatch || contentMatch;
    });
  }

  /**
   * 3. Render Blog Cards Grid
   */
  function renderBlogGrid() {
    const gridContainer = document.getElementById('blog-grid-container');
    const emptyState = document.getElementById('blog-empty-state');
    const featuredSection = document.getElementById('blog-featured');
    const gridHeader = document.getElementById('blog-grid-header');
    if (!gridContainer) return;

    const isFiltering = (currentCategory !== 'All Articles') || (searchQuery.trim().length > 0);
    const matched = getFilteredArticles();

    // If no search or filter is applied:
    // Display the featured article in its dedicated section, and display the remaining 5 articles in the grid.
    let articlesToDisplayInGrid = [];
    if (!isFiltering) {
      if (featuredSection) featuredSection.hidden = false;
      if (gridHeader) {
        gridHeader.querySelector('.section-title').textContent = 'Latest Editorial Guides';
      }
      const featured = window.VenoraBlogs.getFeatured();
      articlesToDisplayInGrid = matched.filter(a => a.id !== featured.id);
    } else {
      // When searching or category filtered:
      // Hide the standalone featured card so that only precisely matching cards appear in the grid
      if (featuredSection) featuredSection.hidden = true;
      if (gridHeader) {
        gridHeader.querySelector('.section-title').textContent = `Matching Articles (${matched.length})`;
      }
      articlesToDisplayInGrid = matched;
    }

    if (matched.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
    } else {
      if (emptyState) emptyState.hidden = true;
      gridContainer.innerHTML = articlesToDisplayInGrid.map((article, index) => `
        <article class="blog-card reveal-on-scroll stagger-${(index % 3) + 1}">
          <div class="blog-card-image-wrap">
            <img src="${article.image}" alt="${article.imageAlt || article.title}" class="blog-card-img" loading="lazy">
            <span class="blog-card-category-badge">${article.category}</span>
          </div>

          <div class="blog-card-body">
            <h3 class="blog-card-title">
              <a href="blog-details.html?slug=${article.slug}">${article.title}</a>
            </h3>
            <p class="blog-card-excerpt">${article.excerpt}</p>

            <div class="blog-card-footer">
              <div class="blog-card-meta">
                <span class="blog-card-meta-author">${article.author.name}</span>
                <span class="meta-dot-sep" aria-hidden="true">&bull;</span>
                <time datetime="${article.publishedAt}">${article.publishedDisplay}</time>
              </div>
              <a href="blog-details.html?slug=${article.slug}" class="read-more-link" aria-label="Read full article: ${article.title}">
                <span>Read</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `).join('');
    }

    updateFilterStatusUI(matched.length);
    initScrollReveals();
  }

  /**
   * Update the filter status bar (result count and clear filters button)
   */
  function updateFilterStatusUI(count) {
    const statusRow = document.getElementById('blog-filter-status');
    const statusText = document.getElementById('blog-status-text');
    if (!statusRow || !statusText) return;

    const isFiltering = (currentCategory !== 'All Articles') || (searchQuery.trim().length > 0);

    if (isFiltering) {
      statusRow.hidden = false;
      const parts = [];
      if (currentCategory !== 'All Articles') {
        parts.push(`category "${currentCategory}"`);
      }
      if (searchQuery.trim().length > 0) {
        parts.push(`query "${searchQuery.trim()}"`);
      }
      statusText.textContent = `Found ${count} article${count === 1 ? '' : 's'} matching ${parts.join(' and ')}`;
    } else {
      statusRow.hidden = true;
    }
  }

  /**
   * Trigger filtering cycle
   */
  function updateFilterResults() {
    renderBlogGrid();
  }

  /**
   * 4. Bind Search Input Events
   */
  function bindSearchEvents() {
    const searchInput = document.getElementById('blog-search-input');
    const clearBtn = document.getElementById('blog-search-clear-btn');
    const resetStatusBtn = document.getElementById('blog-reset-all-btn');
    const resetEmptyBtn = document.getElementById('blog-empty-reset-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearBtn) {
          clearBtn.hidden = searchQuery.length === 0;
        }
        updateFilterResults();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchQuery = '';
        clearBtn.hidden = true;
        updateFilterResults();
      });
    }

    function resetAll() {
      if (searchInput) searchInput.value = '';
      if (clearBtn) clearBtn.hidden = true;
      searchQuery = '';
      currentCategory = 'All Articles';

      // Update pills
      const pillsContainer = document.getElementById('blog-category-pills');
      if (pillsContainer) {
        pillsContainer.querySelectorAll('.category-pill-btn').forEach(b => {
          const active = b.getAttribute('data-category') === 'All Articles';
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
      }

      updateFilterResults();
    }

    if (resetStatusBtn) resetStatusBtn.addEventListener('click', resetAll);
    if (resetEmptyBtn) resetEmptyBtn.addEventListener('click', resetAll);
  }

  /**
   * 5. Newsletter Form Handling with Truthful Feedback
   */
  function bindNewsletterForm() {
    const form = document.getElementById('blog-newsletter-form');
    const emailInput = document.getElementById('blog-newsletter-email');
    const feedback = document.getElementById('blog-newsletter-feedback');
    if (!form || !emailInput || !feedback) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        feedback.className = 'blog-newsletter-feedback is-error';
        feedback.textContent = 'Please enter a valid corporate email address.';
        emailInput.focus();
        return;
      }

      // Truthful message: no live subscription API is connected yet
      feedback.className = 'blog-newsletter-feedback is-notice';
      feedback.textContent = 'Thank you for your interest. The VENORA newsletter integration is currently in development mode. For immediate event inquiries, please contact contact@venora-venues.example.com.';
      emailInput.value = '';
    });
  }

  /**
   * 6. Scroll Reveal Observer
   */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.blog-hero-section .reveal-on-scroll):not(.is-revealed)');
    if (revealElements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
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
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogListing);
  } else {
    initBlogListing();
  }
})();
