# Aurelia Estates — Technical Architecture

Aurelia Estates is part of ScaleNova's **EliteOS Tier**, tailored for bespoke luxury architecture firms, turnkey villa developers, and high-end real estate enterprises.

## System Topology

```
[Luxury Patron / Family Office Client]
         │ (HTTPS / TLS 1.3)
         ▼
[Aurelia Estates Static Web Engine] (Cloudflare Pages CDN Edge)
   - Architectural Identity: Ivory (#FBFBF9) + Champagne Gold (#C5A059) + Charcoal (#18181A)
   - Interactive Axonometric Elevation Canvas: Smooth isometric projection and layer tracking
   - Private Viewing Engine: Comprehensive high-value lead capture
         │
         │ POST JSON (Zero-Secret Client API)
         ▼
[ScaleNova Master Integration Gateway] (Google Apps Script Web App)
   - Request routing via `demoId = "DEMO-03"`
   - 22-Column ISO Schema Formatting
         ├──> [Master Google Sheet CRM] -> Tab: `Demo3_RealEstate` (22 Columns)
         ├──> [Dual Transactional Email via Gmail Service]
         │       ├── Managing Partner Alert (High net worth alert + details)
         │       └── Patron Viewing Dossier Confirmation (`SN-AUR-XXXXXX`)
         └──> [ScaleNova Frappe CRM / ERPNext]
                 └── POST https://demo.scalenovasys.com/api/resource/Lead
                 └── Fail-safe asynchronous logging
```
