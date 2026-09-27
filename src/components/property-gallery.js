/**
 * ScaleNova EliteOS — Demo 03: Aurelia Estates
 * Responsive Luxury Property Gallery & Monograph Lightbox (src/components/property-gallery.js)
 * Architecture: Luxury Editorial (Style G)
 * Accessibility: WCAG 2.2 AA compliant, keyboard navigation, focus trap, ARIA modal dialog
 */

(function () {
  'use strict';

  // Curated Signature Monograph Imagery & Architectural Metadata
  const DEFAULT_PORTFOLIO = [
    {
      id: 'alabaster-villa',
      title: 'The Alabaster Villa',
      location: 'Whitefield Private Reserve, Bengaluru',
      area: '14,500 Sq. Ft.',
      architect: 'Aurelia Atelier x Studio Matteo',
      material: 'Book-matched Tivoli Roman Travertine & Brushed Champagne Brass',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
      description: 'An introspective monolithic estate organized around an open-air central cloister and 20-meter heated reflection pool.'
    },
    {
      id: 'obsidian-pavilion',
      title: 'The Obsidian Pavilion',
      location: 'Jubilee Hills Ridge, Hyderabad',
      area: '18,200 Sq. Ft.',
      architect: 'Kengo Kuma & Associates Collaboration',
      material: 'Brutalist Natural Basalt Rock & Shou Sugi Ban Charred Cedar',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      description: 'Cantilevered basalt pavilions embedded directly into the Deccan Plateau granite, featuring subterranean 8-car gallery.'
    },
    {
      id: 'sky-sanctuary',
      title: 'The Sky Sanctuary',
      location: 'Worli Sea Face, Mumbai',
      area: '11,400 Sq. Ft.',
      architect: 'Foster + Partners Collaboration',
      material: 'Roman Navona Travertine, STC-54 Acoustic Glass & Bronze Panels',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      thumb: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      description: 'Suspended 42 stories above the Arabian Sea with a double-height grand gallery and private cantilevered heated lap pool.'
    },
    {
      id: 'solstice-manor',
      title: 'Solstice Manor',
      location: 'Alibaug Coast, Maharashtra',
      area: '22,000 Sq. Ft.',
      architect: 'Aurelia Atelier Bespoke Commission',
      material: 'Hand-chiselled Dhrangadhra Sandstone & Teak Brise-Soleil',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      thumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
      description: 'A 4-acre beachfront sanctuary secluded amidst coconut groves, with private helipad, deepwater jetty, and wellness pavilion.'
    }
  ];

  class PropertyGallery {
    constructor() {
      this.items = DEFAULT_PORTFOLIO;
      this.currentIndex = 0;
      this.isOpen = false;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.lightboxEl = null;

      this.init();
    }

    init() {
      this.buildLightboxDOM();
      this.bindTriggers();
      this.bindEvents();
    }

    buildLightboxDOM() {
      if (document.getElementById('aurelia-property-lightbox')) return;

      const lightbox = document.createElement('div');
      lightbox.id = 'aurelia-property-lightbox';
      lightbox.className = 'aurelia-gallery-modal';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Architectural Monograph Gallery');
      lightbox.style.display = 'none';

      lightbox.innerHTML = `
        <div class="aurelia-gallery-backdrop" data-action="close"></div>
        <div class="aurelia-gallery-container">
          <!-- Top Bar -->
          <div class="aurelia-gallery-header">
            <div class="aurelia-gallery-meta">
              <span class="gallery-badge">SIGNATURE MONOGRAPH</span>
              <span class="gallery-counter" id="gallery-counter">01 / 04</span>
            </div>
            <button type="button" class="gallery-close-btn" data-action="close" aria-label="Close Monograph Gallery">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Main Stage -->
          <div class="aurelia-gallery-stage">
            <button type="button" class="gallery-nav-btn prev" data-action="prev" aria-label="Previous Monograph Slide">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div class="gallery-image-viewport">
              <div class="gallery-loading-indicator" id="gallery-loader" style="display:none;">
                <div class="gallery-spinner"></div>
              </div>
              <img id="gallery-active-img" src="" alt="" class="gallery-active-image" loading="lazy">
            </div>

            <button type="button" class="gallery-nav-btn next" data-action="next" aria-label="Next Monograph Slide">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <!-- Caption & Architectural Specifications -->
          <div class="aurelia-gallery-footer">
            <div class="gallery-details">
              <h3 id="gallery-title" class="gallery-title"></h3>
              <p id="gallery-location" class="gallery-location"></p>
              <p id="gallery-desc" class="gallery-description"></p>
              <div class="gallery-specs">
                <span id="gallery-area" class="gallery-spec-pill"></span>
                <span id="gallery-material" class="gallery-spec-pill"></span>
              </div>
            </div>

            <!-- Thumbnail Ribbon -->
            <div class="gallery-thumbs" id="gallery-thumbs" role="tablist" aria-label="Monograph Thumbnails"></div>
          </div>
        </div>
      `;

      // Inject Luxury Gallery Styles
      const style = document.createElement('style');
      style.textContent = `
        .aurelia-gallery-modal {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .aurelia-gallery-modal.active {
          opacity: 1;
          pointer-events: auto;
        }
        .aurelia-gallery-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(14, 12, 10, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .aurelia-gallery-container {
          position: relative;
          z-index: 1;
          width: 95vw;
          max-width: 1400px;
          height: 92vh;
          display: flex;
          flex-direction: column;
          background: rgba(24, 21, 18, 0.6);
          border: 1px solid rgba(197, 168, 128, 0.25);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
        }
        .aurelia-gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(197, 168, 128, 0.15);
          background: rgba(18, 16, 14, 0.85);
        }
        .aurelia-gallery-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .gallery-badge {
          font-size: 0.7rem;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          letter-spacing: 0.12em;
          color: #C5A880;
          text-transform: uppercase;
          background: rgba(197, 168, 128, 0.12);
          border: 1px solid rgba(197, 168, 128, 0.3);
          padding: 3px 10px;
          border-radius: 20px;
        }
        .gallery-counter {
          font-family: var(--font-serif, Georgia, serif);
          color: #E6DFD5;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .gallery-close-btn {
          background: transparent;
          border: none;
          color: #C5A880;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .gallery-close-btn:hover {
          background: rgba(197, 168, 128, 0.15);
          transform: rotate(90deg);
        }
        .aurelia-gallery-stage {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          overflow: hidden;
        }
        .gallery-nav-btn {
          background: rgba(24, 21, 18, 0.7);
          border: 1px solid rgba(197, 168, 128, 0.3);
          color: #E6DFD5;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: all 0.2s;
        }
        .gallery-nav-btn:hover {
          background: #C5A880;
          color: #12100E;
          border-color: #C5A880;
        }
        .gallery-image-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .gallery-active-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 2px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-active-image.fading {
          opacity: 0;
          transform: scale(0.98);
        }
        .aurelia-gallery-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 18px 28px;
          background: rgba(18, 16, 14, 0.95);
          border-top: 1px solid rgba(197, 168, 128, 0.15);
          gap: 24px;
        }
        .gallery-details {
          flex: 1;
        }
        .gallery-title {
          font-family: var(--font-display, 'Playfair Display', Georgia, serif);
          color: #FAF8F5;
          font-size: 1.4rem;
          margin: 0 0 4px;
          letter-spacing: 0.02em;
        }
        .gallery-location {
          color: #C5A880;
          font-size: 0.85rem;
          margin: 0 0 8px;
          font-weight: 500;
        }
        .gallery-description {
          color: #B8B0A5;
          font-size: 0.82rem;
          line-height: 1.5;
          margin: 0 0 10px;
          max-width: 720px;
        }
        .gallery-specs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .gallery-spec-pill {
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(197, 168, 128, 0.2);
          color: #E6DFD5;
          padding: 3px 8px;
          border-radius: 3px;
        }
        .gallery-thumbs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          max-width: 440px;
          padding-bottom: 4px;
        }
        .gallery-thumb-item {
          flex-shrink: 0;
          width: 68px;
          height: 48px;
          border: 1px solid rgba(197, 168, 128, 0.25);
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.2s;
        }
        .gallery-thumb-item.active {
          opacity: 1;
          border-color: #C5A880;
          box-shadow: 0 0 10px rgba(197, 168, 128, 0.4);
        }
        .gallery-thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .aurelia-gallery-container {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
          }
          .gallery-nav-btn {
            width: 40px;
            height: 40px;
          }
          .aurelia-gallery-footer {
            flex-direction: column;
            align-items: stretch;
            padding: 14px 16px;
          }
          .gallery-thumbs {
            max-width: 100%;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(lightbox);
      this.lightboxEl = lightbox;
    }

    bindTriggers() {
      // Find cards with images in properties grid and bind click
      document.querySelectorAll('.estate-card, [data-gallery-trigger]').forEach((el, index) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          // If clicked a direct link button, let it navigate
          if (e.target.closest('a') && !e.target.closest('[data-gallery-target]')) return;
          e.preventDefault();
          this.open(index % this.items.length);
        });
      });
    }

    bindEvents() {
      if (!this.lightboxEl) return;

      this.lightboxEl.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('[data-action]');
        if (actionBtn) {
          const action = actionBtn.getAttribute('data-action');
          if (action === 'close') this.close();
          if (action === 'next') this.next();
          if (action === 'prev') this.prev();
        }
      });

      // Keyboard Controls
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'ArrowLeft') this.prev();
      });

      // Touch Gestures (Swipe)
      const stage = this.lightboxEl.querySelector('.gallery-image-viewport');
      if (stage) {
        stage.addEventListener('touchstart', (e) => {
          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
          const deltaX = e.changedTouches[0].clientX - this.touchStartX;
          const deltaY = e.changedTouches[0].clientY - this.touchStartY;
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) this.next();
            else this.prev();
          }
        }, { passive: true });
      }
    }

    renderCurrentSlide() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      const img = document.getElementById('gallery-active-img');
      const counter = document.getElementById('gallery-counter');
      const title = document.getElementById('gallery-title');
      const location = document.getElementById('gallery-location');
      const desc = document.getElementById('gallery-desc');
      const area = document.getElementById('gallery-area');
      const material = document.getElementById('gallery-material');
      const thumbs = document.getElementById('gallery-thumbs');

      if (img) {
        img.classList.add('fading');
        setTimeout(() => {
          img.src = item.image;
          img.alt = `${item.title} — ${item.location}`;
          img.onload = () => img.classList.remove('fading');
        }, 150);
      }

      if (counter) counter.textContent = `0${this.currentIndex + 1} / 0${this.items.length}`;
      if (title) title.textContent = item.title;
      if (location) location.textContent = item.location;
      if (desc) desc.textContent = item.description;
      if (area) area.textContent = item.area;
      if (material) material.textContent = item.material;

      // Render thumbnails
      if (thumbs) {
        thumbs.innerHTML = this.items.map((it, idx) => `
          <div class="gallery-thumb-item ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}" role="tab" aria-selected="${idx === this.currentIndex}">
            <img src="${it.thumb}" alt="${it.title}">
          </div>
        `).join('');

        thumbs.querySelectorAll('.gallery-thumb-item').forEach((th) => {
          th.addEventListener('click', () => {
            const idx = parseInt(th.getAttribute('data-index'), 10);
            this.goTo(idx);
          });
        });
      }
    }

    open(index = 0) {
      this.currentIndex = index;
      this.isOpen = true;
      this.lightboxEl.style.display = 'flex';
      // Force repaint before transition
      void this.lightboxEl.offsetWidth;
      this.lightboxEl.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.renderCurrentSlide();
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.lightboxEl.classList.remove('active');
      setTimeout(() => {
        if (!this.isOpen) this.lightboxEl.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.renderCurrentSlide();
    }

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.renderCurrentSlide();
    }

    goTo(idx) {
      if (idx >= 0 && idx < this.items.length) {
        this.currentIndex = idx;
        this.renderCurrentSlide();
      }
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.AureliaPropertyGallery = new PropertyGallery();
    });
  } else {
    window.AureliaPropertyGallery = new PropertyGallery();
  }
})();
