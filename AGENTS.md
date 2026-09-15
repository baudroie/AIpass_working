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


## LP-styled application form and internal CTAs (2026-09-16; latest user revision)

All primary CTAs A01-A05 now link to #application-form, overriding the earlier direct Google Forms requirement. The skip link uses the same target. Preserve the other internal content/FAQ/conditions links.

Replace the Google iframe with the shared ApplicationForm component, using existing ink/lime/paper colors and Noto Sans JP. Keep the existing six required questions and the verified Google Form field IDs in applicationFields.js. Submit as a native HTML POST to the existing form's observed action; Google displays the actual receipt or validation result. Do not simulate success after an opaque fetch or iframe load, introduce a new response Sheet, or submit a test response during QA. The linked response Sheet remains unchanged. Dates/times use local calendar components and the form's existing year/month/day/hour/minute fields, without UTC conversion.

Keep the form inside finalRef so the mobile sticky CTA cannot cover it. Preserve all unrelated copy, seven FAQs, imagery, typography and layout. Both ConoHa and existing GitHub Pages destinations remain authorized.
