/**
 * Accessible Modal Window & Viewing Drawer Controller
 * Demo 03: Aurelia Estates (src/components/modal-controller.js)
 */

(function () {
  'use strict';

  class ModalController {
    constructor() {
      this.activeModal = null;
      this.init();
    }

    init() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
          e.preventDefault();
          const targetId = trigger.getAttribute('data-open-modal');
          this.open(targetId);
        }

        const closeBtn = e.target.closest('[data-close-modal]');
        if (closeBtn) {
          e.preventDefault();
          this.close();
        }

        if (e.target.classList.contains('modal-overlay')) {
          this.close();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.activeModal) {
          this.close();
        }
      });
    }

    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      this.close();
      this.activeModal = modal;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const focusable = modal.querySelector('button, [href], input, select, textarea');
      if (focusable) {
        setTimeout(() => focusable.focus(), 50);
      }
    }

    close() {
      if (!this.activeModal) return;
      this.activeModal.classList.remove('active');
      document.body.style.overflow = '';
      this.activeModal = null;
    }
  }

  window.aureliaModalController = new ModalController();
})();
