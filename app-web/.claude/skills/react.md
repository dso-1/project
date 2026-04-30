# React Best Practices

## Component Design

### Functional Components
- Use function components, not class components
- Simpler syntax and easier to test
- Better performance with hooks

```typescript
export function MyComponent({ title, onAction }) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### Component Composition
- Break UI into small, focused components
- Compose larger components from smaller ones
- Props for configuration, not logic

```typescript
// Good: Composed components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Bad: Monolithic component
<div className="card">
  <div className="header">
    <h2>Title</h2>
  </div>
  <div className="content">Content</div>
</div>
```

### Props Design
- Keep props minimal and focused
- Use object destructuring
- Provide sensible defaults
- Document prop types with TypeScript

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary', 
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

## Hooks

### useState
- Manage component state
- Each state variable is independent
- Triggers re-render on state change

```typescript
const [count, setCount] = useState(0);
const [name, setName] = useState('');

return (
  <>
    <p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </>
);
```

### useEffect
- Handle side effects
- Runs after render
- Cleanup function for subscriptions

```typescript
useEffect(() => {
  // Subscribe to data
  const unsubscribe = subscribe(data);
  
  // Cleanup
  return () => unsubscribe();
}, [dependency]); // Only re-run if dependency changes
```

### useCallback
- Memoize callback functions
- Prevent unnecessary re-renders of child components
- Use when passing callbacks to optimized children

```typescript
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]); // Re-create only if value changes
```

### useMemo
- Memoize expensive computations
- Prevent unnecessary recalculations
- Use sparingly - measure performance impact

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### useContext
- Access context values
- Avoid prop drilling
- Use for global state (auth, theme, etc.)

```typescript
const { user } = useContext(AuthContext);
```

### Custom Hooks
- Extract reusable logic
- Encapsulate state and effects
- Naming convention: `use[HookName]`

```typescript
function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    validateUser().then(setUser).finally(() => setIsLoading(false));
  }, []);
  
  return { user, isLoading };
}
```

## Performance Optimization

### React.memo
- Memoize components to prevent unnecessary re-renders
- Use when component receives same props frequently
- Measure performance impact

```typescript
const MyComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});
```

### Code Splitting
- Lazy load components with React.lazy
- Use Suspense for loading state
- Split by route or feature

```typescript
const Dashboard = React.lazy(() => import('./Dashboard'));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

### Dependency Array Best Practices
- Include all dependencies
- Use ESLint rule: `exhaustive-deps`
- Avoid unnecessary dependencies

```typescript
// Good: Only necessary dependencies
useEffect(() => {
  fetchData(id);
}, [id]);

// Bad: Missing dependency
useEffect(() => {
  fetchData(id); // id is used but not in dependency array
}, []);
```

## State Management

### Local State
- Use useState for component-local state
- Simplest solution for most cases
- No prop drilling needed

### Lifted State
- Move state up to common parent
- Share state between sibling components
- Pass callbacks down

```typescript
function Parent() {
  const [value, setValue] = useState('');
  
  return (
    <>
      <Child1 value={value} onChange={setValue} />
      <Child2 value={value} />
    </>
  );
}
```

### Context API
- Use for global state (auth, theme)
- Avoid overuse - can cause unnecessary re-renders
- Combine with useReducer for complex state

```typescript
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### React Query (TanStack Query)
- Manage server state
- Automatic caching and synchronization
- Built-in loading and error states

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['rooms'],
  queryFn: () => fetchRooms(),
});
```

## Forms

### Controlled Components
- React state controls input value
- Predictable behavior
- Easy to validate

```typescript
const [email, setEmail] = useState('');

return (
  <input 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
  />
);
```

### Form Libraries
- Use React Hook Form for complex forms
- Reduces re-renders
- Built-in validation support

```typescript
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      <button type="submit">Login</button>
    </form>
  );
}
```

## Conditional Rendering

### Ternary Operator
- Simple if/else logic
- Readable for simple conditions

```typescript
{isLoading ? <Spinner /> : <Content />}
```

### Logical AND
- Render if condition is true
- Don't use for false case

```typescript
{isAdmin && <AdminPanel />}
```

### Early Return
- Return different JSX based on conditions
- Cleaner for complex logic

```typescript
if (isLoading) return <Spinner />;
if (error) return <Error message={error} />;
return <Content data={data} />;
```

## Event Handling

### Event Handlers
- Use arrow functions or bind
- Pass event object or custom data
- Prevent default behavior when needed

```typescript
const handleClick = (id) => {
  deleteItem(id);
};

const handleSubmit = (e) => {
  e.preventDefault();
  submitForm();
};

return (
  <>
    <button onClick={() => handleClick(123)}>Delete</button>
    <form onSubmit={handleSubmit}>...</form>
  </>
);
```

## Lists and Keys

### Keys
- Use unique, stable identifiers
- Never use array index as key
- Helps React identify which items have changed

```typescript
// Good: Unique ID
{items.map((item) => (
  <Item key={item.id} {...item} />
))}

// Bad: Array index
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

## Error Boundaries

### Error Boundary Component
- Catch errors in child components
- Prevent entire app from crashing
- Show fallback UI

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

## Accessibility

### Semantic HTML
- Use semantic elements
- Improves accessibility and SEO

```typescript
<header>
  <nav>Navigation</nav>
</header>
<main>
  <article>Content</article>
</main>
<footer>Footer</footer>
```

### ARIA Labels
- Add labels for screen readers
- Use for interactive elements

```typescript
<button aria-label="Close menu" onClick={closeMenu}>
  ✕
</button>
```

### Keyboard Navigation
- Support keyboard interaction
- Focus management
- Tab order

```typescript
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleClick();
  }}
>
  Click me
</button>
```
