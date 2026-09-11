window.DEMO_CONFIG = {
  demoId: 'DEMO-03',
  industry: 'Real Estate & Construction',
  clientName: 'Aurelia Estates',
  appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec'
};

/**
 * ScaleNova EliteOS — Demo 03: Aurelia Estates Configuration
 */

export const APP_CONFIG = {
  demoId: 'DEMO-03',
  industry: 'Real Estate & Construction',
  companyName: 'Aurelia Estates & Architecture',
  tagline: 'Architectural Eminence • Bespoke Residential & Commercial Estates',
  targetSheet: 'Demo3_RealEstate',
  leadPrefix: 'SN-AUR-',
  
  // Public Gateway URL (Shared ScaleNova Google Apps Script Web App)
  submitUrl: window.__SCALENOVA_CONFIG__?.appsScriptUrl || 
             'https://script.google.com/macros/s/DEMO_ENDPOINT_ID_REPLACE_IN_PRODUCTION/exec',
  
  // Demo Fallback / Simulation Settings
  simulationMode: true,
  
  contactDetails: {
    atelierBangalore: 'Lavelle Road, Shanthala Nagar, Bangalore, Karnataka 560001',
    atelierHyderabad: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    atelierMumbai: 'Altamount Road, Cumballa Hill, Mumbai, Maharashtra 400026',
    phone: '+91 (80) 4122-8900',
    email: 'private@aurelia-estates.demo'
  }
};
