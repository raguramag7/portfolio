import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { blogsAPI } from '../services/api'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function BlogPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    blogsAPI.getById(id)
      .then(res => setPost(res.data))
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ paddingTop: 140, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
  )

  if (error || !post) return (
    <div style={{ paddingTop: 140, textAlign: 'center' }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>{error || 'Post not found.'}</p>
      <Link to="/blog" className="btn btn-ghost">← Back to Blog</Link>
    </div>
  )

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 100px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-muted)', marginBottom: 40, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          ← Back to Blog
        </Link>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: 16
          }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
            <span>Published {formatDate(post.createdAt)}</span>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <span>· Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>
        </header>

        <hr className="divider" />

        <div style={{
          color: 'var(--text-secondary)',
          fontSize: 16,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          marginTop: 32
        }}>
          {post.content}
        </div>
      </article>
    </div>
  )
}
