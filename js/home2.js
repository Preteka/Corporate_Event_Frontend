/**
 * VENORA - Home 2: Niche-Specific Venue Booking Experience
 * Scoped JavaScript Logic: Scroll Reveals, Parallax & Testimonial Carousel
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. Scroll-Triggered Reveal Engine
   */
  function initScrollObserver() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length === 0) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
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
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * 2. Testimonials Carousel
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
      void quoteMark.offsetWidth; // force reflow
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
   * 3. Subtle Hero Visual Parallax
   */
  function initHeroParallax() {
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const heroCard = document.querySelector('.h2-hero-visual-card');
    if (!heroCard) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            heroCard.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /**
   * Bootstrap Home 2
   */
  function init() {
    initScrollObserver();
    initTestimonialsCarousel();
    initHeroParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
