/**
 * VENORA - Blog Detail Controller (blog-details.js)
 * Parses URL query parameters, dynamically renders article headers,
 * structured body content, author profile, sidebar widgets, and related posts.
 */

(function () {
  'use strict';

  function initBlogDetailsPage() {
    if (!window.VenoraBlogs) {
      console.error('[VENORA] VenoraBlogs data module not loaded.');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug') || urlParams.get('id');

    const notFoundEl = document.getElementById('article-not-found-view');
    const loadedEl = document.getElementById('article-loaded-view');

    // 1. Validate Article Existence
    const article = window.VenoraBlogs.getBySlug(slug);

    if (!article) {
      if (loadedEl) loadedEl.hidden = true;
      if (notFoundEl) notFoundEl.hidden = false;
      document.title = 'Article Not Found | The VENORA Journal';
      return;
    }

    if (notFoundEl) notFoundEl.hidden = true;
    if (loadedEl) loadedEl.hidden = false;

    // 2. Set Document Metadata
    document.title = `${article.title} | The VENORA Journal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

    // 3. Render Header Details
    const crumbTitle = document.getElementById('article-crumb-title');
    if (crumbTitle) crumbTitle.textContent = article.title;

    const catLabel = document.getElementById('article-category-label');
    if (catLabel) catLabel.textContent = article.category;

    const titleEl = document.getElementById('article-title-text');
    if (titleEl) titleEl.textContent = article.title;

    const leadEl = document.getElementById('article-lead-text');
    if (leadEl) leadEl.textContent = article.excerpt;

    // Author meta in header
    const authorAvatar = document.getElementById('author-avatar-img');
    if (authorAvatar) authorAvatar.src = article.author.photo;

    const authorName = document.getElementById('author-name-text');
    if (authorName) authorName.textContent = article.author.name;

    const authorRole = document.getElementById('author-role-text');
    if (authorRole) authorRole.textContent = article.author.role;

    const dateEl = document.getElementById('article-date-text');
    if (dateEl) {
      dateEl.textContent = article.publishedDisplay;
      dateEl.setAttribute('datetime', article.publishedAt);
    }

    const readingTimeEl = document.getElementById('article-reading-time-text');
    if (readingTimeEl) readingTimeEl.textContent = `${article.readingTime} min read`;

    // 4. Render Cover Image
    const coverImg = document.getElementById('article-cover-image');
    if (coverImg) {
      coverImg.src = article.image;
      coverImg.alt = article.imageAlt || article.title;
    }

    // 5. Render Structured Body Content
    const bodyContainer = document.getElementById('article-body-container');
    if (bodyContainer && article.content) {
      bodyContainer.innerHTML = article.content.map(block => {
        switch (block.type) {
          case 'heading':
            return `<h2>${escapeHtml(block.text)}</h2>`;
          case 'subheading':
            return `<h3>${escapeHtml(block.text)}</h3>`;
          case 'paragraph':
            return `<p>${escapeHtml(block.text)}</p>`;
          case 'quote':
            return `<blockquote><p>${escapeHtml(block.text)}</p></blockquote>`;
          case 'list':
            return `
              <ul>
                ${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            `;
          case 'ordered-list':
            return `
              <ol>
                ${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
              </ol>
            `;
          default:
            return '';
        }
      }).join('');
    }

    // 6. Render Tags
    const tagsContainer = document.getElementById('article-tags-container');
    if (tagsContainer && article.tags) {
      const tagBadges = article.tags.map(tag => `
        <a href="blog.html" class="article-tag-item">#${escapeHtml(tag)}</a>
      `).join('');
      tagsContainer.innerHTML = `<span class="tags-label">Tags:</span>${tagBadges}`;
    }

    // 7. Render Author Card
    const authorCardImg = document.getElementById('author-card-img');
    if (authorCardImg) authorCardImg.src = article.author.photo;

    const authorCardName = document.getElementById('author-card-name');
    if (authorCardName) authorCardName.textContent = article.author.name;

    const authorCardRole = document.getElementById('author-card-role');
    if (authorCardRole) authorCardRole.textContent = article.author.role;

    const authorCardBio = document.getElementById('author-card-bio');
    if (authorCardBio) authorCardBio.textContent = article.author.bio;

    // 8. Render Sidebar Modules
    renderSidebar(article);

    // 9. Render Related Posts
    renderRelatedPosts(article.slug);

    // 10. Reading Progress Bar & Scroll Reveals
    initReadingProgressBar();
    initScrollReveals();
  }

  /**
   * Safe HTML Escaping for rendered text
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Render Sidebar Categories and Recent Posts
   */
  function renderSidebar(currentArticle) {
    const all = window.VenoraBlogs.getAll();

    // Categories list with counts
    const catList = document.getElementById('sidebar-categories-list');
    if (catList) {
      const counts = {};
      all.forEach(b => {
        counts[b.category] = (counts[b.category] || 0) + 1;
      });

      catList.innerHTML = Object.entries(counts).map(([cat, count]) => `
        <li>
          <a href="blog.html" class="sidebar-category-link">
            <span>${cat}</span>
            <span class="sidebar-cat-count">${count}</span>
          </a>
        </li>
      `).join('');
    }

    // Recent Posts list (excluding current)
    const recentList = document.getElementById('sidebar-recent-list');
    if (recentList) {
      const recent = all
        .filter(b => b.slug !== currentArticle.slug)
        .slice(0, 4);

      recentList.innerHTML = recent.map(post => `
        <li class="sidebar-recent-item">
          <img src="${post.image}" alt="" class="sidebar-recent-thumb" aria-hidden="true" loading="lazy">
          <div class="sidebar-recent-info">
            <a href="blog-details.html?slug=${post.slug}" class="sidebar-recent-title">
              ${post.title}
            </a>
            <span class="sidebar-recent-date">${post.publishedDisplay}</span>
          </div>
        </li>
      `).join('');
    }
  }

  /**
   * Render Related Articles Section
   */
  function renderRelatedPosts(currentSlug) {
    const container = document.getElementById('related-posts-container');
    if (!container) return;

    const related = window.VenoraBlogs.getRelated(currentSlug, 3);

    container.innerHTML = related.map((post, idx) => `
      <article class="blog-card reveal-on-scroll stagger-${idx + 1}">
        <div class="blog-card-image-wrap">
          <img src="${post.image}" alt="${post.imageAlt || post.title}" class="blog-card-img" loading="lazy">
          <span class="blog-card-category-badge">${post.category}</span>
        </div>
        <div class="blog-card-body">
          <h3 class="blog-card-title">
            <a href="blog-details.html?slug=${post.slug}">${post.title}</a>
          </h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-footer">
            <span class="blog-card-meta-author">${post.author.name}</span>
            <a href="blog-details.html?slug=${post.slug}" class="read-more-link" aria-label="Read full article: ${post.title}">
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

  /**
   * Reading Progress Bar
   */
  function initReadingProgressBar() {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /**
   * Scroll Reveal Observer
   */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
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

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogDetailsPage);
  } else {
    initBlogDetailsPage();
  }
})();
