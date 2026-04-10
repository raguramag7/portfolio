import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function BlogCard({ post, onEdit, onDelete }) {
  const { isAdmin } = useAuth()
  const preview = post.content?.replace(/<[^>]+>/g, '').slice(0, 160) + '...'

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <Link to={`/blog/${post.id}`}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 17,
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            transition: 'color 0.2s'
          }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
          >
            {post.title}
          </h3>
        </Link>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>
        {preview}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {formatDate(post.createdAt)}
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <span> · updated {formatDate(post.updatedAt)}</span>
          )}
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/blog/${post.id}`} className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }}>
            Read →
          </Link>
          {isAdmin && (
            <>
              <button onClick={() => onEdit(post)} className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }}>
                Edit
              </button>
              <button onClick={() => onDelete(post.id)} className="btn btn-danger" style={{ fontSize: 12, padding: '5px 12px' }}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
