# React Performance Tips Every Dev Should Know

React is fast by default — but as your app grows, small mistakes compound into sluggish UIs. The good news: most performance problems come from a handful of patterns, and fixing them is straightforward once you know what to look for.

This post covers the practical techniques I use on every project.

---

## 1. Understand When React Re-renders

Before optimizing, understand the rule: **a component re-renders when its state or props change, or when its parent re-renders.**

That last part is the trap. Even if your props didn't change, if the parent re-renders, so do all its children — by default.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveChild /> {/* re-renders every time count changes — even though it doesn't use count */}
    </>
  );
}
```

The React DevTools **Profiler** tab is your best friend here — it highlights which components re-rendered and why.

---

## 2. `React.memo` — Skip Unnecessary Re-renders

Wrap a component in `React.memo` to skip re-rendering when its props haven't changed (shallow comparison).

```jsx
const ExpensiveChild = React.memo(function ExpensiveChild({ title }) {
  console.log('rendered');
  return <h2>{title}</h2>;
});
```

Now `ExpensiveChild` only re-renders when `title` actually changes.

> **When NOT to use it:** On cheap components, `memo` adds overhead (the comparison itself costs time). Use it for components that are expensive to render or render very frequently.

---

## 3. `useCallback` — Stable Function References

Functions defined inside a component are recreated on every render. If you pass them as props to a memoized child, `memo` will see a new reference and re-render anyway.

```jsx
// ❌ New function reference every render — breaks memo
function Parent() {
  const handleClick = () => console.log('clicked');
  return <MemoizedChild onClick={handleClick} />;
}

// ✅ Stable reference — memo works correctly
function Parent() {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <MemoizedChild onClick={handleClick} />;
}
```

The dependency array works exactly like `useEffect` — list every value from the component scope that the function uses.

---

## 4. `useMemo` — Cache Expensive Calculations

If a computation is expensive and its inputs don't change often, cache the result:

```jsx
function ProductList({ products, filterText }) {
  // ❌ Filters the entire list on every render
  const filtered = products.filter(p => p.name.includes(filterText));

  // ✅ Only recalculates when products or filterText changes
  const filtered = useMemo(
    () => products.filter(p => p.name.includes(filterText)),
    [products, filterText]
  );

  return filtered.map(p => <ProductCard key={p.id} product={p} />);
}
```

**Don't overuse it.** `useMemo` itself has a cost. Only memoize calculations that are measurably slow (sorting/filtering 10,000+ items, complex transforms, etc.).

---

## 5. Lazy Loading with `React.lazy` + `Suspense`

Don't ship your entire app in one bundle. Split it at the route level:

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));
const Reports   = lazy(() => import('./pages/Reports'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/reports"   element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

Each route now loads its JavaScript only when the user navigates to it. This can cut your initial bundle size dramatically.

---

## 6. Virtualize Long Lists

Rendering 1,000 DOM nodes is slow. If you have long lists, only render what's visible on screen using `@tanstack/react-virtual`:

```bash
npm install @tanstack/react-virtual
```

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56, // estimated row height in px
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(vItem => (
          <div
            key={vItem.key}
            style={{ position: 'absolute', top: vItem.start, width: '100%', height: vItem.size }}
          >
            {items[vItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

The DOM always contains only ~10–15 visible rows, regardless of list size.

---

## 7. Avoid Object and Array Literals in JSX

Every render creates a new object `{}` or array `[]` literal — which means new references, which breaks memoization.

```jsx
// ❌ New object reference on every render
<MyComponent style={{ color: 'red', fontSize: 14 }} />

// ✅ Stable reference — defined outside the component
const labelStyle = { color: 'red', fontSize: 14 };
function Parent() {
  return <MyComponent style={labelStyle} />;
}

// ✅ Or memoize if it depends on props/state
const style = useMemo(() => ({ color: isError ? 'red' : 'green' }), [isError]);
```

---

## 8. Debounce Expensive Operations

Don't fire an API call or heavy filter on every keystroke. Debounce it:

```jsx
import { useState, useEffect } from 'react';

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 350); // wait 350ms after user stops typing

    return () => clearTimeout(timer); // cancel on next keystroke
  }, [query]);

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search…"
    />
  );
}
```

---

## 9. Move State Down (or Up) to Reduce Re-render Scope

If only one part of the tree needs a piece of state, keep it there — don't lift it higher than necessary.

```jsx
// ❌ Lifting state causes the entire App to re-render on every keystroke
function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyDashboard /> {/* re-renders on every keystroke */}
    </>
  );
}

// ✅ State lives only in SearchBar — HeavyDashboard is unaffected
function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

function App() {
  return (
    <>
      <SearchBar />
      <HeavyDashboard />
    </>
  );
}
```

---

## 10. Use the React Profiler

All the tips above are useless without measurement. Before optimizing anything:

1. Open **Chrome DevTools → Profiler** tab (React DevTools extension required)
2. Click **Record**, interact with your app, click **Stop**
3. Look for components with long render times or that render too often
4. Fix the actual bottleneck — not what you assume is slow

```jsx
// You can also wrap specific trees in the Profiler API
import { Profiler } from 'react';

<Profiler id="ProductList" onRender={(id, phase, duration) => {
  console.log(`${id} took ${duration.toFixed(2)}ms (${phase})`);
}}>
  <ProductList />
</Profiler>
```

---

## Quick Reference

| Technique | Use When |
|---|---|
| `React.memo` | Component renders often but props rarely change |
| `useCallback` | Passing functions as props to memoized children |
| `useMemo` | Expensive calculations with infrequent input changes |
| `React.lazy` + `Suspense` | Route-level or component-level code splitting |
| Virtualization | Lists with 100+ items |
| Debounce | Search inputs, resize handlers, scroll events |
| Move state down | State is only used in a small subtree |

---

## Key Takeaway

Performance optimization in React is a **measure-first** discipline. Use the Profiler to find real bottlenecks, then apply the right tool. Premature optimization with `memo` and `useMemo` everywhere often makes code harder to read without a meaningful speed improvement.

Fix what's actually slow. Profile. Repeat.