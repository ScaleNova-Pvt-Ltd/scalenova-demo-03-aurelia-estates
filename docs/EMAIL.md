# Transactional Email Notification Specification — Aurelia Estates

## 1. Sender Identity
- **Configured Sender**: `demo@scalenovasys.com`
- **Authorized Transport**: Google Apps Script MailApp / GmailApp via authorized account

## 2. Dual Notification Paths
### A. Internal Hot Lead Alert (ScaleNova Team)
- **Subject**: `NEW LEAD ALERT: [Aurelia Estates] {Service} — Ref #{SubmissionID}`
- **Latency**: Dispatched within 60 seconds
- **Features**: Full 23-column data breakdown, direct WhatsApp click-to-chat link.

### B. Branded Customer Confirmation (Aurelia Estates)
- **Subject**: `Thank You for Contacting Aurelia Estates — Ref #{SubmissionID}`
- **Features**: Branded header in `#141312`, professional greeting, next steps, link to `https://demo3.scalenovasys.com`.
