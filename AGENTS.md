Preserve the shared LP components, approved typography, photos, logo, colors, seven FAQs and Google Forms URL. The audience is selected in pages.config.json. Build with npm run build and commit docs/ with source updates for GitHub Pages. Do not commit node_modules, environment files, local QA screenshots or conversation records.


## Embedded application form (2026-09-16)

The user requested the existing Google Form at the bottom of both LPs, with the
same linked response spreadsheet. Render its official embedded=true URL in the
shared Final component before the copyright footer. Keep the existing five CTA
URLs and all other approved content, images, typography and layout intact. The
form remains inside finalRef so the mobile sticky CTA stays hidden while it is
visible. Use width 100% with a title and lazy loading; preserve default iframe
scrolling so all fields remain reachable if Google changes the form.

The form editor's response-sheet action was verified to open spreadsheet
1N9Hew0qn1SO2NVnA50Oiv64IweIKsedAidzG5KwprgU, sheet 533414373. No response-sheet
relinking, new form, or test submission is needed. The existing ConoHa LP paths
remain /lp/seiseiai_college/ and /lp/seiseiai_working/.
