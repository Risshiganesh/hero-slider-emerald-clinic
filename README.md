# ByteMetrica Modular Responsive Swiper

A drop-in, zero-dependency-conflict carousel component built for client websites.

- **Developer:** Built by **ByteMetrica** ([bytemetrica.com](https://bytemetrica.com))
- **Engine:** Swiper.js (v10 / v11)
- **Features:** 
  - **100% Container-Fluid:** Automatically fills 100% width and 100% height of whatever container `<div>` you insert it into (`width: 100%; height: 100%`).
  - Dynamic folder-based responsive asset switching (`images/desktop/` vs `images/mobile/`)
  - Elegant glassmorphic Left & Right SVG navigation buttons
  - Time-interval auto page change with visual countdown progress bar
  - Touch-calibrated 45° angle filter (no vertical scroll locking on mobile)
  - 100% scoped CSS (`.bm-swiper-module`) to prevent styling conflicts on client sites

---

## 🚀 Quick Client Integration (3 Steps)

### Step 1: Add stylesheets in `<head>`
```html
<!-- Swiper.js Core CSS (CDN) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<!-- ByteMetrica Modular Stylesheet -->
<link rel="stylesheet" href="bm-swiper.css" />
```

---

### Step 2: Paste the HTML snippet
Paste this wherever you want the carousel on your client's page:

```html
<div class="bm-swiper-module" data-bm-swiper data-interval="4000" data-speed="650">
  <div class="bm-slider-frame">

    <!-- Time-Interval Progress Bar -->
    <div class="bm-progress-bar-wrapper" aria-hidden="true">
      <div class="bm-progress-bar-fill"></div>
    </div>

    <!-- Built by ByteMetrica Badge -->
    <a href="https://bytemetrica.com" target="_blank" rel="noopener noreferrer" class="bm-credit-badge">
      <span class="bm-credit-dot"></span>
      <span>Built by</span>
      <span class="bm-credit-brand">ByteMetrica</span>
    </a>

    <!-- Swiper Core -->
    <div class="swiper">
      <div class="swiper-wrapper">

        <!-- Slide 1 -->
        <div class="swiper-slide">
          <picture class="bm-picture">
            <source media="(max-width: 768px)" srcset="images/mobile/slide-1.jpg" />
            <img src="images/desktop/slide-1.jpg" alt="Slide 1" class="bm-slide-img" loading="eager" />
          </picture>
          <div class="bm-slide-overlay">
            <div class="bm-slide-content">
              <span class="bm-slide-tag">Category</span>
              <h2 class="bm-slide-title">Slide Title 1</h2>
              <p class="bm-slide-description">Your slide description goes here.</p>
            </div>
          </div>
        </div>

        <!-- Add more slides as needed... -->

      </div>

      <!-- Pagination Bullets -->
      <div class="swiper-pagination"></div>
    </div>

    <!-- Elegant Left & Right Navigation Buttons -->
    <button type="button" class="bm-nav-btn bm-nav-prev" aria-label="Previous Slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button type="button" class="bm-nav-btn bm-nav-next" aria-label="Next Slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

  </div>
</div>
```

---

### Step 3: Add scripts before `</body>`
```html
<!-- Swiper.js Core Bundle (CDN) -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- ByteMetrica Modular Engine -->
<script src="bm-swiper.js"></script>

<script>
  // Initializes all [data-bm-swiper] carousels on the page
  ByteMetricaSwiper.initAll();
</script>
```

---

## ⚙️ Customization Options

### 1. Adjust Time Interval
Change the time interval (in milliseconds) directly in HTML or JavaScript:
```html
<div class="bm-swiper-module" data-bm-swiper data-interval="5000"> <!-- 5 seconds -->
```
Or via JavaScript:
```javascript
new ByteMetricaSwiper('.bm-swiper-module', {
  autoplayInterval: 5000,
  speed: 700,
  pauseOnHover: true
});
```

### 2. Client Brand Colors (CSS Variables)
In your client's stylesheet or inline, you can override any variable:
```css
.bm-swiper-module {
  --bm-primary: #ec4899;        /* Active bullet & glow color */
  --bm-btn-bg: rgba(0, 0, 0, 0.6); /* Button background */
  --bm-radius: 12px;            /* Corner roundness */
}
```

---

## 📁 Image Asset Structure
- `images/desktop/` $\rightarrow$ Landscape orientation (e.g. 16:9, 1920x1080 or 1200x675)
- `images/mobile/`  $\rightarrow$ Portrait/square orientation (e.g. 4:5, 800x1000 or 600x800)
