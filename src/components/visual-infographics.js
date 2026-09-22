/**
 * Visual Infographics, KPI Counters & Luxury 3D Tilt Engine
 * Demo 03: Aurelia Estates (src/components/visual-infographics.js)
 */

(function () {
  'use strict';

  // 1. Luxury KPI Count-Up Animation
  function initKpiCounters() {
    const kpiElements = document.querySelectorAll('[data-kpi-target]');
    if (!kpiElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.kpiAnimated) return;
          el.dataset.kpiAnimated = 'true';

          const target = parseFloat(el.getAttribute('data-kpi-target'));
          const prefix = el.getAttribute('data-kpi-prefix') || '';
          const suffix = el.getAttribute('data-kpi-suffix') || '';
          const duration = parseInt(el.getAttribute('data-kpi-duration') || '1800', 10);
          const isDecimal = target % 1 !== 0;

          let startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target}${suffix}`;
            }
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    kpiElements.forEach((el) => observer.observe(el));
  }

  // 2. Interactive Penthouse Floorplan / Acquisition Process Switcher
  function initProcessRoadmap() {
    const wrappers = document.querySelectorAll('.process-roadmap-wrapper, .penthouse-spec-wrapper');
    wrappers.forEach((wrapper) => {
      const stepButtons = wrapper.querySelectorAll('.roadmap-step-btn, .spec-tab-btn');
      const contentPanels = wrapper.querySelectorAll('.roadmap-step-panel, .spec-panel');

      stepButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-step-target') || btn.getAttribute('data-spec-target');
          if (!targetId) return;

          stepButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          contentPanels.forEach((panel) => {
            if (panel.id === targetId) {
              panel.classList.add('active');
            } else {
              panel.classList.remove('active');
            }
          });
        });
      });
    });
  }

  // 3. Subtle Luxury 3D Card Tilt
  function initCard3DTilt() {
    const tiltCards = document.querySelectorAll('.card-3d-tilt');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initKpiCounters();
      initProcessRoadmap();
      initCard3DTilt();
    });
  } else {
    initKpiCounters();
    initProcessRoadmap();
    initCard3DTilt();
  }
})();
