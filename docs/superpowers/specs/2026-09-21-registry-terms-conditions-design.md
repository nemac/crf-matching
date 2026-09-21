# Registry Terms & Conditions Page

## Goal

Add a static page at `/Registry-terms-conditions` containing the Registry of Adaptation Practitioners Terms & Conditions, currently hosted at https://climatesmartcommunity.org/registry/registry-terms-conditions/. Link to it from the header and footer, and repoint the existing external link on the How to Apply page.

## Constraints

- Match the visual styling of `AboutPage.jsx` and `HowToApplyPage.jsx` exactly by reproducing their `Box`/`Typography`/`sx` structure verbatim. No new components are extracted and no new style values are introduced.
- Only the terms text from the source page, not its header or footer, and no `ContactUs` or `IncludedInRegistry` sections.

## Page: `src/pages/RegistryTermsConditionsPage.jsx`

- `ThemeProvider` > `NavBar` > hero block > content block > `Footer`.
- Hero block copied from AboutPage: eyebrow "TERMS & CONDITIONS", h1 "Registry of Adaptation Practitioners Terms & Conditions", no subtitle.
- Content block uses the same wrapper Box as the other pages (`px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF'`).
- Sections, each an `h3` followed by `body1` paragraphs:
  1. Agreement (opening sentence bold)
  2. Definitions (four bullets using the `FiberManualRecordIcon` pattern from HowToApplyPage, defined term in `<strong>`)
  3. Limited License and Publicity Release to CSCI Partners
  4. Compliance with Laws
  5. Liability & Indemnification
  6. Disclaimer of Warranties
  7. Dispute Resolution (four paragraphs, the last in all caps as written)
  8. Waiver & Severability
  9. Changes to Terms
  10. Date of Agreement ("Effective as of: 20 March 2025", "Last Updated: 19 March 2025")
- Text is taken verbatim from the source page.

## Routing: `src/main.jsx`

Add `{ path: '/Registry-terms-conditions', element: <RegistryTermsConditionsPage /> }`.

## Header: `src/components/NavBar.jsx`

Insert `{ name: 'Terms & Conditions', url: '/Registry-terms-conditions', matches: ['/Registry-terms-conditions'], resetParams: true }` into `navItems` between How to Apply and About.

## Footer: `src/components/Footer.jsx`

Insert `{ name: 'Terms & Conditions', url: '/Registry-terms-conditions' }` into `resourceLinks` after How to apply.

## How to Apply: `src/pages/HowToApplyPage.jsx`

Replace the external anchor to climatesmartcommunity.org with a react-router `Link` to `/Registry-terms-conditions`, keeping the same `Typography` styling and dropping `target`/`rel`.

## Out of scope

- The "Terms and conditions" toggle in `UpdateData.jsx` has no link today and is left unchanged.
- The untracked `test.yml` and `src/__tests__/` files on develop are not part of this work.

## Verification

- `npm run test` and `npm run build` pass.
- In the browser preview: page renders with matching hero and section styling, header chip shows active state on the new route, mobile drawer lists the new item, footer link navigates, How to Apply link navigates internally, header does not wrap at the `md` breakpoint.
