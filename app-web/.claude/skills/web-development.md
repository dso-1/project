# Web Development Skills

## Core Principles

### Semantic HTML
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Improves accessibility and SEO
- Screen readers understand document structure better

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Use breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple screen sizes

### Accessibility (a11y)
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios (WCAG AA minimum)
- Form labels associated with inputs
- Alt text for images

### Performance
- Lazy load images and components
- Code splitting with route-based splitting
- Minimize bundle size
- Use React.memo for expensive components
- Optimize re-renders with proper dependency arrays

## Go Reserve Specifics

### Component Structure
```
Feature/
├── components/
│   ├── FeatureName.tsx (main component)
│   ├── FeatureForm.tsx (forms)
│   └── FeatureCard.tsx (reusable pieces)
├── hooks/
│   └── useFeature.ts
└── api/
    └── feature.server.ts
```

### Styling with Tailwind + Shadcn
- Use Shadcn components for consistency
- Extend with Tailwind utilities
- Avoid inline styles
- Use CSS variables for theming

### Form Handling
- Use React Hook Form for complex forms
- Validate on both client and server
- Show clear error messages
- Disable submit during loading

## Common Patterns

### Data Fetching
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetchResource(id),
});
```

### Protected Routes
- Check `useAuth()` hook
- Redirect to login if not authenticated
- Check role with `useIsAdmin()` for admin routes

### Error Handling
- Catch errors at component level with error boundaries
- Show user-friendly messages
- Log errors for debugging
- Don't expose sensitive error details to users
