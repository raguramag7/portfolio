import { useState } from 'react'
import { contactAPI } from '../services/api'

const contactInfo = [
  { icon: '✉️', label: 'Email', value: 'raguramgiritharaprasad@email.com', href: 'mailto:raguramgiritharaprasad@email.com' },
  { icon: '📱', label: 'Phone', value: '+91 6383160681', href: 'tel:+916383160681' },
  { icon: '💼', label: 'LinkedIn', value: 'www.linkedin.com/in/raguram7', href: 'https://www.linkedin.com/in/raguram7' },
  { icon: '🐙', label: 'GitHub', value: 'https://github.com/raguramag7', href: 'https://github.com/raguramag7' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error:Please fill in all required fields.')
      return
    }
    setSending(true)
    setStatus('')
    try {
      await contactAPI.send(form)
      setStatus('success:Message sent! I\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error:Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const [statusType, statusMsg] = status.split(':')

  return (
    <div className="page-enter" style={{ paddingTop: 80 }}>
      <section className="section">
        <div className="container">
          <p className="section-label">Contact</p>
          <h1 className="section-title">Let's work together</h1>
          <p className="section-sub" style={{ marginBottom: 64 }}>
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
            {/* Contact info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>
                Get in touch
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                {contactInfo.map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="card"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', padding: '14px 18px' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>
                Send a message
              </h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {status && (
                  <div className={`alert alert-${statusType}`}>{statusMsg}</div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Name *</label>
                    <input className="form-input" placeholder="Your name"
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input className="form-input" type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input className="form-input" placeholder="What's this about?"
                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea className="form-input" rows={5} placeholder="Tell me about your project or idea..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>

                <button type="submit" className="btn btn-primary" disabled={sending}
                  style={{ alignSelf: 'flex-end', padding: '11px 28px' }}>
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
