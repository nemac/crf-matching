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

*Add additional project-specific guidelines here as needed*

---

## Codebase Audit Findings (March 2026)

### 1. Dead / Unused Code to Remove

**Unused pages (not in router, safe to delete):**
- `src/pages/OldRegistryIgnore.jsx` — 442 lines, not referenced anywhere
- `src/pages/PractitionerWorkExamplePage.jsx` — 213 lines, not referenced anywhere

**Unused function & import in `src/util/api.js`:**
- `sortAndRandomize` function (lines ~206-232) — defined but never called
- `import { Category } from '@mui/icons-material'` (line 2) — never used

**Unused assets in `src/assets/` (safe to delete):**
- `CSCI_logo.png`
- `EcoAdapt_logo.jpg`
- `EcoAdapt_logo_web.jpg`
- `Registry_Logo_primary_CMYK.jpg`
- `Registry_Logo_primary_RGB.jpg`
- `climate_prac.png`

**Unused base components in `src/components/baseComponents/` (never imported):**
- `SecondaryButton` — hardcoded text, zero imports
- `AltButton` — hardcoded text, zero imports
- `FilterRemove` — hardcoded text, zero imports
- `HomeDefault` — zero imports

**Commented-out code blocks to remove:**
- `src/pages/UpdateDataPage.jsx` lines ~34-100 (mock test data)
- `src/components/Section.jsx` lines ~48-63 (DropDownSelector block)
- `src/components/CommunityPane.jsx` lines ~111-120 (ScoreSection)
- `src/components/PractitionerPane.jsx` line ~11 and lines ~262-275 (ScoreSection)
- `src/util/urlStateManagement.js` line ~49

---

### 3. Base Component Misuse

**Props convention violations (must accept `props` and destructure inside body):**
- `src/components/baseComponents/MultiLineFormTextField.jsx` — destructures in function signature
- `src/components/baseComponents/FormSelect.jsx` — destructures in function signature
- `src/components/baseComponents/ToggleSwitch.jsx` — destructures in function signature

**Raw MUI components used where base components should be used instead:**
- `CompareBar.jsx` (lines ~129-149) — raw `Button` with `#0066CC` bg, should use `CallToActionButton`
- `RequestMagicLink.jsx` (lines ~133-167) — raw `Button` with `#003366` bg, should use `CallToActionButton`
- `RequestMagicLink.jsx` (lines ~99-130) — raw `TextField`, should use `FormTextField`
- `AddPractitionerModal.jsx` (lines ~110-139) — raw `InputBase`, should use `SearchBar`
- `ComparisonBoard.jsx` (lines ~86-104) — raw `Button` white+border, should use `TertiaryButton`
- `RecommendSpecialistCard.jsx` (lines ~101-126, ~153-170) — raw `Button`, could use base components

**Hardcoded base components that should accept props for reusability:**
- `SpecialistLabel` — hardcoded "Specialist" text, should accept a `label` prop
- `BroadServiceProvider` — hardcoded "Broad service provider" text, should accept a `label` prop