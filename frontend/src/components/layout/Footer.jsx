import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--accent)' }}>&lt;</span>
          Portfolio
          <span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </span>

        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          © {year} · Built with React &amp; Spring Boot
        </p>

        <nav style={{ display: 'flex', gap: 20 }}>
          {[['/', 'Home'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} style={{ color: 'var(--text-muted)', fontSize: 13, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
