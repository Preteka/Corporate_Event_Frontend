/**
 * VENORA - Home 1 Main Script & Animation Choreographer
 * Handles: Hero entrance, continuous curved marquee loop, progressive scroll illumination
 * for the About section, section reveals, Testimonials carousel, and Reduced Motion compliance.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. Hero Entrance Sequence
   */
  function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.hero-ref-section .reveal-on-scroll');

    if (prefersReducedMotion) {
      heroElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    // Staggered reveal of hero content elements
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, 120 + index * 120);
    });
  }


  /**
   * 2. Full-Width Inverted-U 3D Panoramic Hero Gallery
   * Recreates the reference video's defining inverted-U stage geometry:
   * - Full-width span (100% of hero width, edge-to-edge).
   * - Inverted-U perspective: Center of gallery sits slightly farther back,
   *   while left and right portions curve FORWARD toward the viewer.
   * - Left-to-Right Continuous Motion:
   *     1. Image enters from the left edge of the gallery.
   *     2. Becomes progressively prominent as it approaches the center.
   *     3. Moves through the central foreground viewing region.
   *     4. Continues toward the right edge and exits cleanly at the front-facing edge.
   *     5. The next image enters from the left without visible jumps.
   * - Front-facing only: Images flow through the foreground, never around the back of a cylinder.
   * - Tight, constant panel spacing with zero center gaps.
   * - Direct 1:1 touch / mouse drag with smooth inertia damping.
   * - Respects prefers-reduced-motion with static inverted-U composition.
   */
  function init3DCylinderGallery() {
    const galleryContainer = document.getElementById('hero-3d-gallery');
    if (!galleryContainer) return;

    const viewport = galleryContainer.querySelector('.gallery-3d-viewport');
    const cylinder = document.getElementById('gallery-3d-cylinder');
    const panels = galleryContainer.querySelectorAll('.gallery-3d-panel');
    if (!cylinder || panels.length === 0) return;

    const numPanels = panels.length; // 10 architectural panels

    // Motion state
    let scrollOffset = 0; // Horizontal pixel offset of continuous strip
    const baseSpeed = 70; // Pixels per second (smooth, continuous left-to-right glide)
    let currentSpeed = baseSpeed;
    let isHovered = false;
    let isDragging = false;
    let startX = 0;
    let lastDragX = 0;
    let dragVelocity = 0;
    let lastTimestamp = performance.now();
    let animFrameId = null;
    let isVisible = true;

    // Full-width responsive layout parameters
    let panelWidth = 320;
    let gap = 24;
    let step = 344;
    let totalLength = numPanels * step;
    let zCenter = -130; // Center sits farther back
    let zForward = 160; // Ends curve forward toward the viewer (+30px at edges)
    let maxAngleDeg = 26; // Tangent inward rotation toward stage center

    function updateDimensions() {
      const w = window.innerWidth;
      const firstPanel = panels[0];

      if (w >= 1400) {
        panelWidth = 320;
        gap = 24;
        zCenter = -130;
        zForward = 160;
        maxAngleDeg = 26;
      } else if (w >= 1024) {
        panelWidth = 280;
        gap = 20;
        zCenter = -110;
        zForward = 140;
        maxAngleDeg = 24;
      } else if (w >= 768) {
        panelWidth = 240;
        gap = 16;
        zCenter = -90;
        zForward = 110;
        maxAngleDeg = 20;
      } else {
        panelWidth = 200;
        gap = 12;
        zCenter = -60;
        zForward = 80;
        maxAngleDeg = 16;
      }

      if (firstPanel && firstPanel.offsetWidth) {
        panelWidth = firstPanel.offsetWidth;
      }

      step = panelWidth + gap;
      totalLength = numPanels * step;
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });

    // Render 3D Inverted-U coordinates for all panels
    function render() {
      const halfTotal = totalLength / 2;
      const halfViewport = window.innerWidth / 2;

      panels.forEach((panel, i) => {
        // Continuous horizontal position along the moving strip
        // Decreasing scrollOffset drives movement in the +X direction (Left to Right)
        let x = (i * step - scrollOffset) % totalLength;
        if (x < 0) x += totalLength;
        // Center x around 0 (screen center)
        if (x > halfTotal) x -= totalLength;

        // Normalized horizontal coordinate relative to screen half-width
        const u = x / Math.max(300, halfViewport);
        const clampedU = Math.max(-1.4, Math.min(1.4, u));

        // INVERTED-U 3D CURVE:
        // Center (x = 0): sits farther back (z = zCenter, e.g. -130px)
        // Left & Right sides: curve FORWARD toward the viewer (z increases to +30px)
        const curveRatio = Math.min(1.5, Math.pow(clampedU, 2));
        const z = zCenter + zForward * curveRatio;

        // Rotation around Y axis:
        // Left side (u < 0): rotY > 0, turns inward toward center stage
        // Right side (u > 0): rotY < 0, turns inward toward center stage
        // Center (u = 0): rotY = 0, faces viewer directly
        const rotYDeg = -clampedU * maxAngleDeg;

        // Prominence & Scale hierarchy:
        // Center panels are largest, most prominent, and crisp
        const centerProminence = Math.max(0, 1 - Math.abs(u));
        const scale = (0.95 + 0.10 * centerProminence).toFixed(3);

        // Z-Index: Front foreground center panels cleanly render on top
        panel.style.zIndex = Math.round(500 + centerProminence * 400 + z * 0.5);

        // Clean edge fading outside the visible hero screen boundary
        const absX = Math.abs(x);
        const visibleBoundary = halfViewport + 80;
        let opacity = 1;
        if (absX > visibleBoundary) {
          opacity = Math.max(0, 1 - (absX - visibleBoundary) / 160);
        }
        panel.style.opacity = opacity.toFixed(3);

        // Subtle photographic edge lighting
        const edgeDarkness = Math.min(0.20, Math.abs(clampedU) * 0.16);
        panel.style.filter = `brightness(${(1 - edgeDarkness).toFixed(2)})`;

        // Apply authentic full-width inverted-U 3D transformation
        panel.style.transform = `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${rotYDeg.toFixed(2)}deg) scale(${scale})`;
      });
    }

    // Continuous time-driven animation loop
    function animate(currentTime) {
      if (isVisible) {
        const deltaSeconds = Math.min((currentTime - lastTimestamp) / 1000, 0.1);
        lastTimestamp = currentTime;

        // Motion physics: drag momentum vs continuous left-to-right auto-glide
        if (!isDragging) {
          if (Math.abs(dragVelocity) > 0.05) {
            scrollOffset -= dragVelocity;
            dragVelocity *= 0.92; // Friction decay
          } else {
            dragVelocity = 0;
            // Smooth speed dampening when hovered
            const targetSpeed = isHovered ? baseSpeed * 0.25 : baseSpeed;
            currentSpeed += (targetSpeed - currentSpeed) * 0.08;
            // Continuous LEFT TO RIGHT motion: decreasing scrollOffset increases x
            scrollOffset -= currentSpeed * deltaSeconds;
          }
        }

        // Keep scrollOffset within [0, totalLength]
        scrollOffset = (scrollOffset % totalLength + totalLength) % totalLength;

        render();
      } else {
        lastTimestamp = currentTime;
      }

      animFrameId = requestAnimationFrame(animate);
    }

    // Interactive pointer drag / touch swiping
    function onPointerDown(e) {
      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      lastDragX = startX;
      dragVelocity = 0;
      cylinder.style.cursor = 'grabbing';
      panels.forEach(p => p.style.cursor = 'grabbing');
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = currentX - lastDragX;
      lastDragX = currentX;

      // 1:1 direct finger-tracking horizontal drag
      scrollOffset -= deltaX * 1.05;
      dragVelocity = deltaX * 0.6;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      cylinder.style.cursor = 'grab';
      panels.forEach(p => p.style.cursor = 'grab');
    }

    // Attach listeners
    if (viewport) {
      viewport.addEventListener('mousedown', onPointerDown);
      viewport.addEventListener('touchstart', onPointerDown, { passive: true });
      viewport.addEventListener('mouseenter', () => { isHovered = true; });
      viewport.addEventListener('mouseleave', () => { isHovered = false; });
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Pause loop when scrolled out of view or tab is hidden
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(galleryContainer);
    }

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) lastTimestamp = performance.now();
    });

    // prefers-reduced-motion: render static inverted-U composition without auto-glide
    if (prefersReducedMotion) {
      render();
      return;
    }

    // Start continuous left-to-right glide
    animFrameId = requestAnimationFrame(animate);
  }

  /**
   * 2. Progressive Scroll Illumination for the About Paragraph
   * Recreates the reference's white-to-gray text transition following scroll progress.
   */
  function initAboutScrollIllumination() {
    const paragraph = document.getElementById('about-paragraph');
    if (!paragraph) return;

    const chunks = paragraph.querySelectorAll('.txt-chunk');
    if (chunks.length === 0) return;

    if (prefersReducedMotion) {
      chunks.forEach(chunk => {
        chunk.style.opacity = '1';
      });
      return;
    }

    let ticking = false;

    function updateIllumination() {
      const rect = paragraph.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start brightening when paragraph enters lower third of viewport,
      // reach full illumination when centered in viewport
      const start = windowH * 0.85;
      const end = windowH * 0.32;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      chunks.forEach((chunk, i) => {
        const chunkThreshold = i / chunks.length;
        if (progress >= chunkThreshold) {
          // Proportionally bright from 0.45 to 1.0
          const localProgress = Math.min(1, (progress - chunkThreshold) * chunks.length * 0.5 + 0.45);
          chunk.style.opacity = localProgress.toFixed(2);
        } else {
          // Muted state
          chunk.style.opacity = '0.28';
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateIllumination);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    updateIllumination();
  }

  /**
   * 3. IntersectionObserver for Below-the-Fold Section Reveals
   */
  function initScrollObserver() {
    const targets = document.querySelectorAll('.reveal-on-scroll:not(.hero-ref-section .reveal-on-scroll)');

    if (prefersReducedMotion) {
      targets.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
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
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.1
    });

    targets.forEach(target => observer.observe(target));
  }

  /**
   * 4. Testimonials Accessible Carousel
   */
  function initTestimonialsCarousel() {
    const wrapper = document.querySelector('.testimonials-carousel-wrapper');
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.testimonial-card');
    const prevBtn = wrapper.querySelector('[data-carousel="prev"]');
    const nextBtn = wrapper.querySelector('[data-carousel="next"]');
    const dotsContainer = wrapper.querySelector('.carousel-dots');
    const quoteMark = wrapper.querySelector('.testi-quote-mark');

    if (cards.length === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isTransitioning = false;
    const transitionDuration = 450;
    const autoPlayInterval = 7000;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'is-active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          if (currentIndex === i || isTransitioning) return;
          goToSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function animateQuoteMark() {
      if (!quoteMark || prefersReducedMotion) return;
      quoteMark.classList.remove('is-animating');
      void quoteMark.offsetWidth; // Force reflow to retrigger animation
      quoteMark.classList.add('is-animating');
    }

    function updateCarousel() {
      cards.forEach((card, i) => {
        if (i === currentIndex) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.classList.remove('is-active');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
          const isActive = i === currentIndex;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      animateQuoteMark();
    }

    function goToSlide(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      if (index < 0) {
        currentIndex = cards.length - 1;
      } else if (index >= cards.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateCarousel();

      setTimeout(() => {
        isTransitioning = false;
      }, transitionDuration);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      });
    }

    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (isTransitioning) return;
        goToSlide(document.documentElement.getAttribute('dir') === 'rtl' ? currentIndex + 1 : currentIndex - 1);
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        if (isTransitioning) return;
        goToSlide(document.documentElement.getAttribute('dir') === 'rtl' ? currentIndex - 1 : currentIndex + 1);
        resetAutoPlay();
      }
    });

    function startAutoPlay() {
      if (prefersReducedMotion) return;
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, autoPlayInterval);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
    wrapper.addEventListener('focusin', stopAutoPlay);
    wrapper.addEventListener('focusout', startAutoPlay);

    updateCarousel();
    startAutoPlay();
  }

  /**
   * 5. Card 3D Tilt Micro-Physics (Subtle, desktop only)
   */
  function initCardTilt() {
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const cards = document.querySelectorAll('.service-editorial-panel, .venue-card');

    cards.forEach(card => {
      let bounds;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      card.addEventListener('mouseenter', updateBounds);

      card.addEventListener('mousemove', (e) => {
        if (!bounds) return;
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;

        const tiltX = -yPct * 3.0;
        const tiltY = xPct * 3.0;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /**
   * 6. Curated Spaces Editorial Motion & Progressive Text Reveal
   */
  function initCuratedSpacesMotion() {
    const venuesSection = document.getElementById('featured-venues');
    if (!venuesSection) return;

    const track = document.getElementById('venues-track');
    const descChunks = venuesSection.querySelectorAll('.venues-chunk');

    // 1. Progressive Text Illumination via IntersectionObserver
    if (descChunks.length > 0 && 'IntersectionObserver' in window) {
      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            descChunks.forEach((chunk, index) => {
              setTimeout(() => {
                chunk.style.opacity = '1';
                chunk.style.color = document.documentElement.getAttribute('data-theme') === 'dark' ? '#FFFFFF' : '#1A1A1A';
              }, index * 220);
            });
            textObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });

      const venuesDesc = document.getElementById('venues-desc');
      if (venuesDesc) textObserver.observe(venuesDesc);
    }

    // 2. Interactive Expanding 3-Card Gallery Controller
    const gallery = document.getElementById('curated-spaces-gallery');
    if (!gallery) return;

    const cards = gallery.querySelectorAll('.space-card');
    if (cards.length === 0) return;

    function activateCard(targetCard) {
      if (!targetCard) return;
      cards.forEach(c => {
        const isActive = (c === targetCard);
        c.classList.toggle('is-active', isActive);
        c.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    }

    cards.forEach(card => {
      // Hover interaction (desktop): smoothly expands the card under pointer
      card.addEventListener('mouseenter', () => {
        activateCard(card);
      });

      // Keyboard focus: accessible activation when tabbing
      card.addEventListener('focus', () => {
        activateCard(card);
      });

      // Click / Touch interaction
      card.addEventListener('click', (e) => {
        // If clicking directly on a CTA link or inner anchor, let normal navigation happen
        if (e.target.closest('a')) {
          return;
        }

        // If card is already active, navigate to its destination
        if (card.classList.contains('is-active')) {
          const href = card.getAttribute('data-href');
          if (href) {
            window.location.href = href;
          }
        } else {
          // If inactive (especially on mobile/touch), expand it first
          activateCard(card);
        }
      });

      // Keyboard activation via Enter or Space
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          if (card.classList.contains('is-active')) {
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
          } else {
            activateCard(card);
          }
        }
      });
    });
  }

  /**
   * Bootstrap Home 1 features
   */
  function init() {
    initHeroAnimation();
    init3DCylinderGallery();
    initAboutScrollIllumination();
    initScrollObserver();
    initTestimonialsCarousel();
    initCardTilt();
    initCuratedSpacesMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
