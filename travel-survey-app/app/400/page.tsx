// app/404/page.tsx (for app router)
// or app/not-found.tsx (alternative for app router)

export default function Custom404() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}