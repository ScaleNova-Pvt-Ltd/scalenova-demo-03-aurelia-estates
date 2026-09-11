# Integration Guide — Aurelia Estates

## Gateway Routing
- **Demo Identifier:** `DEMO-03`
- **Lead Prefix:** `SN-AUR-`
- **Target Sheet:** `Demo3_RealEstate`
- **Target Frappe Source:** `Aurelia Estates Web Dossier`

### Payload Sample
```json
{
  "demoId": "DEMO-03",
  "industry": "Real Estate & Construction",
  "sourceWebsite": "Aurelia Estates & Architecture (DEMO-03)",
  "leadType": "Private Viewing Request",
  "fullName": "Vikramaditya Singhal",
  "email": "v.singhal@familyoffice.in",
  "phone": "+91 98200 88990",
  "companyName": "Singhal Family Office",
  "city": "Bengaluru (Whitefield / Sadashivanagar)",
  "serviceInterest": "Turnkey Villa Estate",
  "budgetRange": "₹25 Cr - ₹50 Cr",
  "timeline": "Immediate (Within 90 Days)",
  "projectDescription": "Private pavilion villa with monolithic travertine and wine vault.",
  "submissionId": "SN-AUR-K9F2-4182"
}
```
Routed automatically to `Demo3_RealEstate` and Frappe CRM.
