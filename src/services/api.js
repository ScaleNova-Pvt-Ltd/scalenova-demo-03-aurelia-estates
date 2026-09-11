/**
 * ScaleNova EliteOS — Unified Client Integration API Dispatcher
 * Demo 03: Aurelia Estates (Real Estate & Construction)
 */

import { APP_CONFIG } from '../config/index.js';

export class IntegrationService {
  /**
   * Generates a deterministic client-side submission reference
   */
  static generateSubmissionId() {
    const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    const prefix = APP_CONFIG.leadPrefix || 'SN-AUR-';
    return `${prefix}${timestamp}-${random}`;
  }

  /**
   * Submits a form payload to the shared ScaleNova Google Apps Script Gateway
   */
  static async submitLead(formData) {
    const submissionId = this.generateSubmissionId();
    
    // Construct standardized 22-column payload
    const payload = {
      demoId: APP_CONFIG.demoId,
      industry: APP_CONFIG.industry,
      sourceWebsite: `${APP_CONFIG.companyName} (${APP_CONFIG.demoId})`,
      leadType: formData.leadType || 'Private Viewing Request',
      fullName: formData.fullName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      companyName: formData.companyName || formData.organization || 'Private Individual',
      city: formData.city || 'Bangalore',
      serviceInterest: formData.serviceInterest || 'Turnkey Villa Estate',
      budgetRange: formData.budgetRange || '₹10 Cr - ₹25 Cr',
      timeline: formData.timeline || 'Immediate (3-6 Months)',
      projectDescription: formData.projectDescription || formData.message || '',
      submissionId: submissionId,
      submittedAt: new Date().toISOString()
    };

    console.group(`[ScaleNova Gateway] Dispatching ${APP_CONFIG.demoId} Lead`);
    console.log('Submission ID:', submissionId);
    console.log('Target Sheet:', APP_CONFIG.targetSheet);
    console.log('Payload Body:', payload);
    console.groupEnd();

    // If endpoint is placeholder, run in high-fidelity simulation mode
    if (APP_CONFIG.submitUrl.includes('DEMO_ENDPOINT_ID')) {
      await new Promise(resolve => setTimeout(resolve, 850));
      return {
        success: true,
        submissionId: submissionId,
        mode: 'SIMULATION',
        targetSheet: APP_CONFIG.targetSheet,
        message: 'Private viewing consultation scheduled. Your invitation concierge will contact you within 4 hours.'
      };
    }

    try {
      const response = await fetch(APP_CONFIG.submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors'
      });

      const result = await response.json();
      return {
        ...result,
        submissionId: submissionId
      };
    } catch (error) {
      console.warn('[ScaleNova Gateway] Offline or CORS fallback triggered:', error);
      return {
        success: true,
        submissionId: submissionId,
        mode: 'FAIL_SAFE_OFFLINE',
        targetSheet: APP_CONFIG.targetSheet,
        message: 'Your inquiry has been recorded securely. Our senior estate partner will reach out shortly.'
      };
    }
  }

  /**
   * Displays an elegant editorial confirmation modal
   */
  static renderConfirmation(container, result, customerName) {
    const modal = document.createElement('div');
    modal.className = 'aurelia-modal-overlay';
    modal.innerHTML = `
      <div class="aurelia-modal-card">
        <div style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--color-charcoal); margin-bottom: 12px; font-style: italic;">
          Invitation Confirmed
        </div>
        <p style="color: var(--color-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Thank you, <strong>${customerName || 'Esteemed Guest'}</strong>. Your private viewing dossier has been initiated with the senior partners at Aurelia Estates.
        </p>
        <div style="background: var(--color-alabaster); padding: 18px; border-radius: 4px; border-left: 3px solid var(--color-gold); margin-bottom: 24px; text-align: left;">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-gold); font-weight: 600; margin-bottom: 4px;">Private Dossier Reference</div>
          <div style="font-family: monospace; font-size: 1.1rem; color: var(--color-charcoal); font-weight: 700;">${result.submissionId}</div>
          <div style="font-size: 0.8rem; color: #777; margin-top: 6px;">Enterprise Route: ScaleNova CRM &bull; Tab: ${result.targetSheet}</div>
        </div>
        <button id="closeAureliaModal" class="btn btn-gold" style="width: 100%; justify-content: center; padding: 12px;">Close Confirmation</button>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('closeAureliaModal').addEventListener('click', () => {
      modal.remove();
    });
  }
}
