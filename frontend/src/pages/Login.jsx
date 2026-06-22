import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [lockId, setLockId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!lockId.trim()) { setError('Please enter your Lock ID.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await authAPI.login({ lockId })
      login(res.data.token)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid Lock ID.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(200,169,110,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 22
          }}>
            🔐
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Admin Login
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Enter your Lock ID to access the admin panel.
          </p>
        </div>

        <div className="card" style={{ padding: '28px 24px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label>Lock ID</label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your secret Lock ID"
                value={lockId}
                onChange={e => setLockId(e.target.value)}
                autoFocus
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ padding: '12px', justifyContent: 'center', marginTop: 4 }}>
              {loading ? 'Verifying…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
