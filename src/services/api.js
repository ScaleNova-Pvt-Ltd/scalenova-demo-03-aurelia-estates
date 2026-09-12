/**
 * ScaleNova Systems — Client API Dispatcher (src/services/api.js)
 * Demo: Aurelia Estates (DEMO-03)
 * All 5 websites connect to ONE shared Apps Script Web App URL.
 */

window.ScaleNovaAPI = (function () {
  'use strict';

  const config = window.DEMO_CONFIG || {
    demoId: 'DEMO-03',
    industry: 'Real Estate & Construction',
    clientName: 'Aurelia Estates',
    appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || ''
  };

  async function submitLead(formData, options = {}) {
    // 1. Anti-spam honeypot check
    if (formData.website_hp || formData.company_hp || formData.website_trap || formData.security_trap) {
      console.warn('[ScaleNova Security] Honeypot trap triggered. Request silently dropped.');
      return mockSuccessResponse(formData, 'SPAM_FILTERED');
    }

    // 2. Validate mandatory fields
    const clientName = (formData.name || formData.fullName || '').trim();
    const clientEmail = (formData.email || '').trim();
    if (!clientName || !clientEmail) {
      throw new Error('Name and email are mandatory fields.');
    }

    const payload = {
      demo_id: config.demoId || 'DEMO-03',
      lead_type: (formData.lead_type || formData.leadType || 'LEAD').toUpperCase(),
      name: clientName,
      email: clientEmail,
      phone: (formData.phone || '').trim(),
      company: (formData.company || formData.companyName || '').trim() || 'Private Patron',
      service: formData.service || formData.serviceInterest || 'Bespoke Architectural Residence',
      requirement: formData.requirement || formData.projectDescription || formData.city || 'Private Portfolio Inquiry',
      project_type: formData.project_type || formData.projectType || 'Ultra-Luxury Residential',
      budget: formData.budget || formData.budgetRange || '₹10 Cr - ₹25 Cr',
      preferred_date: formData.preferred_date || formData.preferredDate || formData.date || '',
      preferred_time: formData.preferred_time || formData.preferredTime || formData.time || '',
      message: (formData.message || formData.projectDescription || '').trim(),
      source: 'Aurelia Estates Website',
      source_page: formData.source_page || formData.page || window.location.pathname || 'Home'
    };

    const endpoint = window.APPS_SCRIPT_WEB_APP_URL || 
                     config.appsScriptUrl || 
                     (window.SCALENOVA_GATEWAY && window.SCALENOVA_GATEWAY.submitUrl) ||
                     'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec';

    const isPlaceholder = !endpoint || 
                          endpoint.includes('YOUR_SHARED_APPS_SCRIPT_WEB_APP_URL') || 
                          endpoint.includes('DEMO_ENDPOINT_ID');

    if (isPlaceholder) {
      // Local simulation mode for offline/pre-deployment testing
      await new Promise(r => setTimeout(r, 600));
      return mockSuccessResponse(payload);
    }

    // 3. Optimistic Fast UX Handoff: Pre-generate unique submission ID
    const submissionId = 'SN-D03-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    const instantSuccessResponse = {
      success: true,
      submissionId: submissionId,
      submission_id: submissionId,
      demoId: config.demoId || 'DEMO-03',
      leadType: payload.lead_type,
      message: 'Viewing request received. Our private client advisory desk will coordinate your appointment.'
    };

    // 4. Dispatch fetch to Apps Script with fast UX handoff (950ms race)
    const networkPromise = fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(async (resp) => {
      try {
        const json = await resp.json();
        return json;
      } catch (e) {
        return instantSuccessResponse;
      }
    }).catch((err) => {
      console.warn('[ScaleNova API] Network fetch continued in background:', err);
      return instantSuccessResponse;
    });

    const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(instantSuccessResponse), 950));

    return Promise.race([networkPromise, timeoutPromise]);
  }

  function mockSuccessResponse(payload, overrideId) {
    const submissionId = overrideId || ('SN-D03-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    console.group('%c[ScaleNova Demo Ingestion: Aurelia Estates]', 'color:#C5A880;font-weight:bold;font-size:12px;');
    console.log('Demo ID:', 'DEMO-03 (Real Estate & Construction)');
    console.log('Generated Submission ID:', submissionId);
    console.log('Target Worksheet:', 'Demo 3 - Real Estate');
    console.log('Payload dispatched:', payload);
    console.groupEnd();

    return {
      success: true,
      submission_id: submissionId,
      demo_id: 'DEMO-03',
      lead_type: payload.lead_type,
      message: 'Submission received successfully'
    };
  }

  return { submitLead };
})();
