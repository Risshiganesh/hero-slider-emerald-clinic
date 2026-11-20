/**
 * Demo Controller (script.js)
 * Initializes the ByteMetricaSwiper module and updates live responsive diagnostics.
 */

// Dermatology Clinic slide definitions mapped to images/desktop/ and images/mobile/
const BYTE_METRICA_SLIDES = [
  {
    desktop: 'images/desktop/slide-1.jpg',
    mobile: 'images/mobile/slide-1.jpg',
    tag: 'Dermatology',
    title: 'Dr. Ram Consulting',
    desc: 'In-depth dermatological consultation and personalized skin health evaluation with Dr. Ram.',
    alt: 'Dr. Ram Consulting'
  },
  {
    desktop: 'images/desktop/slide-2.jpg',
    mobile: 'images/mobile/slide-2.jpg',
    tag: 'Skin Treatment',
    title: 'Dr. Ram Diagnosing Skin Treatment',
    desc: 'Precision clinical diagnosis and targeted dermatological care planning for optimal skin recovery.',
    alt: 'Dr. Ram Diagnosing Skin Treatment'
  },
  {
    desktop: 'images/desktop/slide-3.jpg',
    mobile: 'images/mobile/slide-3.jpg',
    tag: 'Hair Treatment',
    title: 'Dr. Vennilaa Doing Hair Treatment',
    desc: 'Advanced clinical hair restoration therapies and comprehensive scalp health procedures.',
    alt: 'Dr. Vennilaa Doing Hair Treatment'
  },
  {
    desktop: 'images/desktop/slide-4.jpg',
    mobile: 'images/mobile/slide-4.jpg',
    tag: 'Consultation',
    title: 'Dr. Vennilaa Consulting',
    desc: 'Personalized medical and aesthetic consultations tailored to individual patient care goals.',
    alt: 'Dr. Vennilaa Consulting'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize ByteMetrica Swiper module with verified slide filenames
  const swiperInstances = ByteMetricaSwiper.initAll('[data-bm-swiper]', {
    autoplayInterval: 4000,      // 4-second page change interval
    speed: 650,                  // Smooth transition speed in ms
    pauseOnHover: true,          // Pause autoplay on mouse hover (desktop)
    slides: BYTE_METRICA_SLIDES, // Configured slide images
  });

  // Initialize live demo diagnostics for showcase
  initLiveDiagnostics();
});

/**
 * Updates diagnostic pills to reflect live viewport width and active folder
 */
function initLiveDiagnostics() {
  const vpElem = document.getElementById('demoViewport');
  const modeElem = document.getElementById('demoMode');
  const folderElem = document.getElementById('demoFolder');

  const update = () => {
    const width = window.innerWidth;
    const isMobile = width <= 768;

    if (vpElem) vpElem.textContent = `Viewport: ${width}px`;
    if (modeElem) modeElem.textContent = isMobile ? 'Mobile Platform' : 'Desktop Platform';
    if (folderElem) folderElem.textContent = isMobile ? 'Active: images/mobile/' : 'Active: images/desktop/';
  };

  window.addEventListener('resize', update);
  update();
}
