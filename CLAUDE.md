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

## Other Guidelines

*Add additional project-specific guidelines here as needed*