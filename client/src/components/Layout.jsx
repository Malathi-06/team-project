import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              NEXUS <span style={{ color: 'hsl(var(--primary))' }}>COMMERCE</span>
            </h1>
          </Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" style={{ opacity: 0.8 }}>Home</Link>
            <Link to="/catalog" style={{ opacity: 0.8 }}>Catalog</Link>
            <Link to="/login" style={{ opacity: 0.8 }}>Login</Link>
            <Link to="/register" style={{ opacity: 0.8 }}>Register</Link>
            <Link to="/cart" style={{ opacity: 0.8 }}>Cart</Link>
            <Link to="/profile" style={{ opacity: 0.8 }}>Profile</Link>
          </div>
        </div>
      </nav>
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <Outlet />
      </main>
      <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
        <p>&copy; 2026 Nexus Commerce</p>
      </footer>
    </div>
  );
}

export default Layout;
