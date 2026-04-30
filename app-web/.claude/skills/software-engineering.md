# Software Engineering Principles

## SOLID Principles

### Single Responsibility Principle (SRP)
- Each module/component has one reason to change
- Separate concerns: UI, business logic, data access
- Example: `useAuth()` handles auth logic, components use it

### Open/Closed Principle (OCP)
- Open for extension, closed for modification
- Use composition over inheritance
- Use props and hooks for customization

### Liskov Substitution Principle (LSP)
- Subtypes must be substitutable for base types
- Consistent interfaces across implementations
- Don't break expected behavior in overrides

### Interface Segregation Principle (ISP)
- Clients shouldn't depend on interfaces they don't use
- Create focused, specific interfaces
- Avoid "fat" interfaces with many methods

### Dependency Inversion Principle (DIP)
- Depend on abstractions, not concrete implementations
- Inject dependencies rather than creating them
- Use hooks and context for dependency injection

## Code Quality

### DRY (Don't Repeat Yourself)
- Extract repeated code into functions/components
- Use custom hooks for shared logic
- Create reusable utility functions

### KISS (Keep It Simple, Stupid)
- Avoid over-engineering
- Choose clarity over cleverness
- Simple solutions are easier to maintain

### YAGNI (You Aren't Gonna Need It)
- Don't add features you don't need yet
- Don't create abstractions for hypothetical use cases
- Refactor when actual needs emerge

## Testing Strategy

### Test Pyramid
- Many unit tests (fast, isolated)
- Some integration tests (components + hooks)
- Few end-to-end tests (full user flows)

### What to Test
- Business logic and edge cases
- User interactions and form submissions
- Error states and loading states
- API integration points

### What NOT to Test
- Implementation details
- Third-party library behavior
- Trivial getters/setters

## Version Control

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- Be descriptive: "fix: prevent race condition in reservation booking"
- Reference issues: "fixes #123"

### Branch Strategy
- Feature branches from main
- Branch naming: `feature/user-auth`, `fix/reservation-bug`
- Keep branches focused on single feature/fix

### Code Review
- Review for correctness, not style (Biome handles style)
- Check for security issues
- Verify tests are included
- Ensure documentation is updated

## Documentation

### Code Comments
- Explain WHY, not WHAT
- Document complex algorithms
- Add comments for non-obvious decisions
- Keep comments up-to-date with code

### README and Guides
- Setup instructions
- Architecture overview
- Common development tasks
- Troubleshooting guide

### Type Definitions
- Use TypeScript for self-documenting code
- Export types for public APIs
- Use meaningful type names
