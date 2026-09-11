# Testing Guide — Aurelia Estates

## Verification Suite
Run validation:
```bash
npm test
# or
node test/validate-system.js
```

## Manual Verification
1. Run local preview: `npx -y serve . -l 3003`.
2. Open `http://localhost:3003/schedule-visit.html`.
3. Submit a high-value private inquiry.
4. Verify console logs with payload and generated `SN-AUR-` reference.
5. Verify the elegant editorial confirmation modal renders without UI glitches.
