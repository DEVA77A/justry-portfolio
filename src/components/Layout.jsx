import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import CinematicLoader from './CinematicLoader';
import logoUrl from '../assets/logo.jpg';

const Footer = () => (
  <footer style={{ padding: '80px 5% 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '80px', position: 'relative' }}>
    <img src={logoUrl} alt="Justry Logo" style={{ width: '80px', height: 'auto', marginBottom: '15px' }} />
    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--text-primary)', letterSpacing: '2px' }}>JUSTRY TECH SOLUTIONS</h2>
    <p style={{ color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} Justry Tech Solutions. All rights reserved.</p>
  </footer>
);

export default function Layout() {
  return (
    <>
      <CinematicLoader />
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
