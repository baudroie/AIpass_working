# Landing page maintenance

Preserve the shared components, approved typography, photos, logo, colors,
seven FAQs, copyright-only footer, and section order. The audience is selected
in pages.config.json. Build with npm run build and commit docs/ with source
updates for GitHub Pages.

All primary CTAs link to #application-form. The shared form uses the LP colors
and type styles. Schedule choices come from the configured GAS endpoint.
Calendar dates are followed by next-dates then consultation, fixed at the end.
Completed sessions leave the visible choices; historical records remain.

The form makes a native POST to GAS. Show real server confirmation only after
storage succeeds. Do not simulate success from an opaque response. Google
Forms is no longer part of the LP submission path. Keep pending-condition
placeholders out of the public copy.

Do not commit node_modules, credentials, environment files, spreadsheet IDs,
backend administration details, local QA screenshots, or conversation records.
