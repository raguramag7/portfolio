import { useState, useEffect } from 'react'
import { projectsAPI, blogsAPI, contactAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function StatCard({ label, value, icon, color }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-sm)',
        background: color + '18',
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0 })
  const [messages, setMessages] = useState([])
  const [loadingMsgs, setLoadingMsgs] = useState(true)

  useEffect(() => {
    Promise.all([
      projectsAPI.getAll(),
      blogsAPI.getAll(),
      contactAPI.getMessages(),
    ]).then(([proj, blog, msgs]) => {
      setStats({ projects: proj.data.length, blogs: blog.data.length, messages: msgs.data.length })
      setMessages(msgs.data.slice(0, 5))
    }).catch(console.error)
      .finally(() => setLoadingMsgs(false))
  }, [])

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="section-label">Admin Panel</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
              Dashboard
            </h1>
          </div>
          <button className="btn btn-ghost" onClick={() => { logout(); navigate('/') }}>
            Logout
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          <StatCard label="Projects" value={stats.projects} icon="🗂️" color="#c8a96e" />
          <StatCard label="Blog Posts" value={stats.blogs} icon="✍️" color="#7eb8c8" />
          <StatCard label="Messages" value={stats.messages} icon="✉️" color="#7ec87e" />
        </div>

        {/* Quick actions */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/projects')}>
              + Add Project
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/blog')}>
              + Write Post
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/projects')}>
              Manage Projects →
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/blog')}>
              Manage Blog →
            </button>
          </div>
        </div>

        {/* Recent messages */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            Recent Contact Messages
          </h2>
          {loadingMsgs ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading messages…</div>
          ) : messages.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No messages yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map(msg => (
                <div key={msg.id} className="card" style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-primary)' }}>{msg.name}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{msg.email}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {msg.sentAt ? new Date(msg.sentAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  {msg.subject && (
                    <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 4 }}>{msg.subject}</div>
                  )}
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {msg.message.slice(0, 200)}{msg.message.length > 200 ? '…' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
