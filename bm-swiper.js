/**
 * ByteMetrica Modular Swiper Controller (bm-swiper.js)
 * High-performance, touch-friendly, platform-responsive swiper module.
 *
 * Features:
 *  - Modular & Encapsulated (Multiple instances per page supported)
 *  - Elegant SVG navigation controls
 *  - Visual time-interval progress bar
 *  - Built by ByteMetrica watermark & branding
 *  - Seamless Swiper.js integration
 *
 * Built by ByteMetrica (https://bytemetrica.com)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ByteMetricaSwiper = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class ByteMetricaSwiper {
    /**
     * @param {string|HTMLElement} target - Container selector or DOM element (.bm-swiper-module)
     * @param {Object} options - Custom configuration options
     */
    constructor(target, options = {}) {
      this.container = typeof target === 'string' ? document.querySelector(target) : target;
      if (!this.container) {
        console.warn(`[ByteMetricaSwiper] Target element not found:`, target);
        return;
      }

      // Check if Swiper.js core is available
      if (typeof Swiper === 'undefined') {
        console.error('[ByteMetricaSwiper] Swiper.js library is not loaded. Please include Swiper 10+ or 11 bundle before this script.');
        return;
      }

      // Merge HTML data-attributes with JS options and defaults
      const dataset = this.container.dataset || {};
      this.config = Object.assign({
        autoplayInterval: parseInt(dataset.interval, 10) || options.autoplayInterval || 4500,
        speed: parseInt(dataset.speed, 10) || options.speed || 600,
        pauseOnHover: dataset.pauseHover !== undefined ? dataset.pauseHover === 'true' : (options.pauseOnHover ?? true),
        loop: dataset.loop !== undefined ? dataset.loop === 'true' : (options.loop ?? true),
        touchAngle: 45,
        threshold: 8,
        showProgressBar: true,
      }, options);

      this.swiper = null;
      this.progressBarFill = this.container.querySelector('.bm-progress-bar-fill');
      this.init();
    }

    init() {
      const swiperElement = this.container.querySelector('.swiper');
      if (!swiperElement) {
        console.warn('[ByteMetricaSwiper] No .swiper element found inside module container.');
        return;
      }

      // Sync or render slides if options.slides is configured
      if (this.config.slides && Array.isArray(this.config.slides) && this.config.slides.length > 0) {
        this.syncSlides(this.config.slides);
      }

      const prevBtn = this.container.querySelector('.bm-nav-prev');
      const nextBtn = this.container.querySelector('.bm-nav-next');
      const paginationEl = this.container.querySelector('.swiper-pagination');

      const self = this;

      this.swiper = new Swiper(swiperElement, {
        loop: this.config.loop,
        speed: this.config.speed,
        grabCursor: true,
        centeredSlides: true,
        autoHeight: false,
        observer: true,         // Recalculates automatically when container DOM changes
        observeParents: true,   // Recalculates automatically when parent container resizes

        // Time-interval based page change
        autoplay: {
          delay: this.config.autoplayInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: this.config.pauseOnHover,
        },

        // Touch & Swipe gestures
        touchRatio: 1,
        touchAngle: this.config.touchAngle,
        threshold: this.config.threshold,
        resistance: true,
        resistanceRatio: 0.85,
        touchReleaseOnEdges: true,
        passiveListeners: true,
        simulateTouch: true,
        preventClicks: true,
        followFinger: true,

        // Keyboard navigation (Desktop)
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        // Navigation controls scoped to this module instance
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },

        // Dynamic pagination bullets
        pagination: {
          el: paginationEl,
          clickable: true,
          dynamicBullets: true,
        },

        // Responsive breakpoints
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        },

        // Lifecycle & Progress Bar Events
        on: {
          autoplayTimeLeft(s, time, progress) {
            if (self.progressBarFill) {
              // Smooth hardware-accelerated time countdown
              const scale = 1 - progress;
              self.progressBarFill.style.transform = `scaleX(${scale.toFixed(4)})`;
            }
          },
          slideChange() {
            // Reset progress bar on slide change
            if (self.progressBarFill) {
              self.progressBarFill.style.transform = 'scaleX(0)';
            }
          },
        },
      });

      return this.swiper;
    }

    /**
     * Synchronizes existing slides with file paths from options.slides,
     * or dynamically constructs slides if container is empty.
     * @param {Array<Object>} slides
     */
    syncSlides(slides) {
      const wrapper = this.container.querySelector('.swiper-wrapper');
      if (!wrapper) return;

      const existingSlideEls = wrapper.querySelectorAll('.swiper-slide');
      
      // If slides are already present in markup, update source attributes
      if (existingSlideEls.length > 0) {
        existingSlideEls.forEach((slideEl, idx) => {
          if (!slides[idx]) return;
          const slideData = slides[idx];
          
          const sourceEl = slideEl.querySelector('source');
          if (sourceEl && slideData.mobile) {
            sourceEl.setAttribute('srcset', slideData.mobile);
          }

          const imgEl = slideEl.querySelector('img');
          if (imgEl) {
            if (slideData.desktop) imgEl.setAttribute('src', slideData.desktop);
            if (slideData.alt) imgEl.setAttribute('alt', slideData.alt);
          }

          if (slideData.tag) {
            const tagEl = slideEl.querySelector('.bm-slide-tag');
            if (tagEl) tagEl.textContent = slideData.tag;
          }
          if (slideData.title) {
            const titleEl = slideEl.querySelector('.bm-slide-title');
            if (titleEl) titleEl.textContent = slideData.title;
          }
          if (slideData.desc) {
            const descEl = slideEl.querySelector('.bm-slide-description');
            if (descEl) descEl.textContent = slideData.desc;
          }
        });
      } else {
        // Construct slide DOM elements dynamically
        slides.forEach((item, idx) => {
          const slideDiv = document.createElement('div');
          slideDiv.className = 'swiper-slide';
          slideDiv.innerHTML = `
            <picture class="bm-picture">
              <source media="(max-width: 768px)" srcset="${item.mobile}" />
              <img src="${item.desktop}" alt="${item.alt || 'Slide ' + (idx + 1)}" class="bm-slide-img" loading="${idx === 0 ? 'eager' : 'lazy'}" decoding="async" />
            </picture>
            <div class="bm-slide-overlay">
              <div class="bm-slide-content">
                ${item.tag ? `<span class="bm-slide-tag">${item.tag}</span>` : ''}
                <h2 class="bm-slide-title">${item.title || ''}</h2>
                <p class="bm-slide-description">${item.desc || ''}</p>
              </div>
            </div>
          `;
          wrapper.appendChild(slideDiv);
        });
      }
    }

    /**
     * Programmatic API methods
     */
    next() {
      if (this.swiper) this.swiper.slideNext();
    }

    prev() {
      if (this.swiper) this.swiper.slidePrev();
    }

    pause() {
      if (this.swiper?.autoplay) this.swiper.autoplay.stop();
    }

    resume() {
      if (this.swiper?.autoplay) this.swiper.autoplay.start();
    }

    destroy() {
      if (this.swiper) {
        this.swiper.destroy(true, true);
        this.swiper = null;
      }
    }

    /**
     * Auto-initializes all instances with [data-bm-swiper] on the page
     * @param {string} selector
     * @param {Object} options
     * @returns {Array<ByteMetricaSwiper>}
     */
    static initAll(selector = '[data-bm-swiper]', options = {}) {
      const elements = document.querySelectorAll(selector);
      const instances = [];
      elements.forEach(el => {
        instances.push(new ByteMetricaSwiper(el, options));
      });
      return instances;
    }
  }

  return ByteMetricaSwiper;
}));
