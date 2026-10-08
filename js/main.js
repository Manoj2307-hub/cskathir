/**
 * CS KATHIR — Traditional Tamarind Brand
 * Main JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navigation Bar ---
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Menu Drawer ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navDrawer = document.getElementById('navDrawer');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeNavDrawer = () => {
    if (navDrawer && navDrawer.classList.contains('open')) {
      navDrawer.classList.remove('open');
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const openNavDrawer = () => {
    if (navDrawer) {
      navDrawer.classList.add('open');
      if (mobileToggle) {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (mobileToggle && navDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navDrawer.classList.contains('open')) {
        closeNavDrawer();
      } else {
        openNavDrawer();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNavDrawer);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeNavDrawer);
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (navDrawer.classList.contains('open') && !navDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeNavDrawer();
      }
    });

    // Auto-close if resized to desktop viewport
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        closeNavDrawer();
      }
    });
  }

  // --- 3. Active Nav Link on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --- 4. Product Modal Data & Interactions ---
  const productData = {
    '250g': {
      title: 'CS KATHIR 250g Tamarind',
      tamilTitle: 'சிஎஸ் கதிர் 250கி புளி',
      weight: '250 Grams Pack',
      image: 'assets/product_250g.jpg',
      origin: 'Dindigul, Tamil Nadu',
      tagline: 'புளியின் பாரம்பரிய சுவை — Authentic Tamarind',
      description: 'Hand-selected, seed-cleaned traditional tamarind packed to maintain natural moisture, rich tanginess, and authentic aroma. Perfectly sized for everyday culinary requirements in Tamil households.',
      features: [
        'Naturally matured and hand-cleaned tamarind',
        'Traditional rich aroma and tangy depth',
        'Sealed hygienically for long-lasting freshness',
        'Zero artificial additives or chemical preservatives',
        'Manufactured by C.S.K. Traders, Dindigul'
      ]
    },
    '500g': {
      title: 'CS KATHIR 500g Tamarind',
      tamilTitle: 'சிஎஸ் கதிர் 500கி புளி',
      weight: '500 Grams Pack',
      image: 'assets/product_500g.jpg',
      origin: 'Dindigul, Tamil Nadu',
      tagline: 'புளியின் பாரம்பரிய சுவை — Authentic Tamarind',
      description: 'Our signature generous family pack featuring premium grade traditional tamarind slabs. Selected from mature orchards, naturally processed, and packed with extreme care to retain pure essence.',
      features: [
        'Optimal dark mahogany texture and richness',
        'Ideal for traditional Sambar, Rasam, and Kulambu',
        'Protected against moisture and external air',
        'Authentic Tamil Nadu agricultural heritage',
        'Manufactured by C.S.K. Traders, Dindigul'
      ]
    }
  };

  const productModal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalProductImg');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalTamil = document.getElementById('modalProductTamil');
  const modalWeight = document.getElementById('modalProductWeight');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalFeatures = document.getElementById('modalProductFeatures');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalEnquireBtn = document.getElementById('modalEnquireBtn');

  window.openProductModal = (key) => {
    const data = productData[key];
    if (!data || !productModal) return;

    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
    }
    modalTitle.textContent = data.title;
    modalTamil.textContent = data.tamilTitle;
    modalWeight.textContent = data.weight;
    modalDesc.textContent = data.description;

    modalFeatures.innerHTML = data.features.map(f => `
      <li style="display:flex; align-items:center; gap:8px; margin-bottom:8px; font-size:0.9rem; color:var(--c-text-secondary);">
        <svg style="width:16px; height:16px; color:var(--c-gold-600); flex-shrink:0;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>${f}</span>
      </li>
    `).join('');

    modalEnquireBtn.onclick = () => {
      closeModal();
      scrollToEnquiry(data.title);
    };

    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (productModal) {
      productModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeModal();
    });
  }

  // --- 5. Direct WhatsApp Product Enquiry ---
  window.enquireProduct = (productName) => {
    const defaultMsg = 'Hello CS Kathir, I would like to make a business enquiry. Please share more details.';
    const msg = productName 
      ? `Hello CS Kathir, I would like to make a business enquiry regarding ${productName}. Please share more details.`
      : defaultMsg;
    const url = `https://wa.me/919751292890?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // --- 6. Gallery Filtering & Lightbox ---
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const title = item.querySelector('.gallery-item-title');
      if (lightboxModal && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title ? title.textContent : 'CS KATHIR Tamarind Showcase';
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Escape key closes modals and mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
      closeNavDrawer();
    }
  });


});
