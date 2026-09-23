# Claude Code Guidelines for This Project

## Code Comments Policy

**CRITICAL: DO NOT ADD COMMENTS TO CODE**

When writing or modifying code in this project, you are STRICTLY FORBIDDEN from adding comments, including:

- Inline comments (`// ...`)
- Block comments (`/* ... */`)
- JSDoc comments (`/** ... */`)
- Function/method documentation comments
- Explanatory comments above code blocks
- TODOs, FIXMEs, or similar annotations

### Rationale

Code should be self-documenting through:
- Clear, descriptive variable and function names
- Well-structured, readable logic
- Proper separation of concerns
- Meaningful component and module organization

### Exceptions (Rare)

Comments are ONLY acceptable in these specific cases:
1. Complex algorithmic logic that cannot be simplified
2. Workarounds for known bugs in third-party libraries (with issue references)
3. Regex patterns that require explanation
4. Non-obvious performance optimizations

Even in these cases, first attempt to refactor the code to be self-explanatory before adding a comment.

### Enforcement

- Do not add comments when creating new code
- Do not add comments when refactoring existing code
- If code needs explanation, refactor it to be clearer instead
- Assume all developers can read and understand clean, well-written code

---

## Props Convention

Always accept `props` as the parameter and destructure inside the function body:

```jsx
export default function MyComponent(props) {
  const { foo, bar, baz } = props;
  // ...
}
```

Do NOT destructure in the function signature.

## Other Guidelines

Do not add `fontFamily: 'Roboto'` to sx props — the theme already sets Roboto as the default font globally.

---

## Codebase Audit Findings (April 2026)

### 1. Dead Code — Files to Delete

- [ ] `src/pages/OldRegistryIgnore.jsx` — 442 lines, no route
- [ ] `src/pages/PractitionerWorkExamplePage.jsx` — 213 lines, no route
- [ ] `src/components/baseComponents/SecondaryButton.jsx` — zero imports
- [ ] `src/components/baseComponents/AltButton.jsx` — zero imports
- [ ] `src/components/baseComponents/FilterRemove.jsx` — zero imports
- [ ] `src/components/baseComponents/HomeDefault.jsx` — zero imports
- [ ] `src/assets/CSCI_logo.png` — unused
- [ ] `src/assets/EcoAdapt_logo.jpg` — unused
- [ ] `src/assets/EcoAdapt_logo_web.jpg` — unused
- [ ] `src/assets/Registry_Logo_primary_CMYK.jpg` — unused
- [ ] `src/assets/Registry_Logo_primary_RGB.jpg` — unused
- [ ] `src/assets/climate_prac.png` — unused

### 2. Dead Code — In-File Cleanup

- [ ] `src/util/api.js` — remove unused `fetchFilteredSpecialist()`, `sortAndRandomize()`, and `Category` import
- [ ] `src/pages/UpdateDataPage.jsx` — remove 2 console.logs (lines ~110, ~137) and commented-out mock data (lines ~34-100)
- [ ] `src/theme.jsx` — remove unused tokens `primary.main2` and `primary.lightBlueHover`
- [ ] `src/components/CommunityPane.jsx` — remove commented-out code (lines ~90, ~111-120)
- [ ] `src/components/PractitionerPane.jsx` — remove commented-out code (lines ~262-275)
- [ ] `src/components/ProfilePopper.jsx` — remove commented-out code (lines ~100-131)
- [ ] `src/components/updateData/NewPractitionerLayout.jsx` — remove commented-out code (lines ~184-273)
- [ ] `src/components/updateData/UpdateData.jsx` — remove commented-out code (lines ~276-286)
- [ ] `src/util/urlStateManagement.js` — remove commented-out code (line ~49)
- [ ] `src/config/api.js` — remove dead `API_ENDPOINTS` object (overridden by hardcoded URLs)

### 3. Props Convention Violations

- [x] All 15 components fixed

### 4. React Anti-Patterns

- [ ] `PractitionerPage.jsx:97` — `useLayoutEffect` missing `practitionerId` dependency
- [ ] `PractitionerWorkExamplePage.jsx:202` — `useLayoutEffect` missing `practitionerId` dependency
- [ ] `ComparePractitioners.jsx:108` — `useEffect` with empty `[]` but reads `searchParams`
- [ ] `ComparisonBoard.jsx:121` — index-only key for practitioners (use `airtableRecId`)
- [ ] `RegistryComponent.jsx:56` — index-only key for practitioner cards (use `airtableRecId`)
- [ ] `PractitionerCard.jsx:149` — index-only key for services chips (use service name)
- [ ] `NewPractitionerLayout.jsx:34` — index-only key for chips
- [ ] `PractitionerWorkExamplePage.jsx:16-20` — redundant URLSearchParams creation

### 5. Componentization Opportunities

- [ ] Extract shared `SectionHeader` to `baseComponents/` — duplicated in `UpdateData.jsx`, `WorkExampleForm.jsx`, `NewPractitionerLayout.jsx`, `NewWorkExampleLayout.jsx`
- [ ] Extract `FilterChipGroup` from `UpdateData.jsx` — same chip+add/clear pattern repeated 7 times

### 6. Styling Inconsistencies

- [ ] Add theme tokens for common grays: `#E5E7EB` (~15 uses), `#E1F5FE` (~8 uses), `#101828` (~20 uses)
- [ ] Replace ~30+ hardcoded `#FFFFFF` with `primary.white`
- [ ] Replace remaining hardcoded `#0066CC` in border shorthands (can't use palette path in CSS shorthand strings — needs `theme.palette.primary.linkBlue` callback pattern or template literals)
- [ ] Standardize `bgcolor` vs `backgroundColor` — use `bgcolor` consistently in sx props
- [ ] Fix `SearchBar.jsx:9` placeholder typo: `'to be fillllled'`

### 7. Import Consistency

- [ ] Standardize `.jsx` extension in imports — mixed usage across codebase
- [ ] Decide: use `baseComponents/index.js` barrel export consistently, or remove it
