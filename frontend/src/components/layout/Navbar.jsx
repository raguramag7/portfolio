import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          portfolio
          <span className="navbar__logo-bracket">/&gt;</span>
        </Link>

        <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`navbar__link ${location.pathname === '/admin' ? 'navbar__link--active' : ''}`}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar__actions">
          {isAdmin ? (
            <button className="btn btn-ghost" onClick={handleLogout} style={{ fontSize: 13, padding: '7px 16px' }}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline" style={{ fontSize: 13, padding: '7px 16px' }}>
              Admin
            </Link>
          )}

          <button
            className={`navbar__hamburger ${open ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
