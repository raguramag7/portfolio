import { useState, useEffect } from 'react'
import { blogsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import BlogCard from '../components/ui/BlogCard'
import Modal from '../components/ui/Modal'

const emptyForm = { title: '', content: '' }

export default function Blog() {
  const { isAdmin } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = async () => {
    try {
      const res = await blogsAPI.getAll()
      setPosts(res.data)
    } catch {
      setError('Failed to load blog posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditTarget(null)
    setForm(emptyForm)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (post) => {
    setEditTarget(post)
    setForm({ title: post.title, content: post.content })
    setFormError('')
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return
    try {
      await blogsAPI.delete(id)
      setPosts(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Failed to delete post.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setFormError('Title is required.'); return }
    if (!form.content.trim()) { setFormError('Content is required.'); return }
    setSaving(true)
    setFormError('')
    try {
      if (editTarget) {
        const res = await blogsAPI.update(editTarget.id, form)
        setPosts(prev => prev.map(p => p.id === editTarget.id ? res.data : p))
      } else {
        const res = await blogsAPI.create(form)
        setPosts(prev => [res.data, ...prev])
      }
      setModalOpen(false)
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to save post.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page-enter" style={{ paddingTop: 80 }}>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 56 }}>
            <div>
              <p className="section-label">Blog</p>
              <h1 className="section-title" style={{ marginBottom: 8 }}>Thoughts &amp; writings</h1>
              <p className="section-sub">Notes on development, design, and building things.</p>
            </div>
            {isAdmin && (
              <button className="btn btn-primary" onClick={openCreate} style={{ alignSelf: 'flex-end' }}>
                + New Post
              </button>
            )}
          </div>

          {loading && <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Loading posts…</div>}
          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No posts yet.{isAdmin && ' Write your first one!'}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            {posts.map(post => (
              <BlogCard key={post.id} post={post} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Post' : 'New Blog Post'}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {formError && <div className="alert alert-error">{formError}</div>}

          <div className="form-group">
            <label>Title *</label>
            <input className="form-input" placeholder="Post title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea className="form-input" rows={12} placeholder="Write your post content here..."
              style={{ minHeight: 240 }}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Publish Post'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
