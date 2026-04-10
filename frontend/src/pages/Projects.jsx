import { useState, useEffect } from 'react'
import { projectsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import ProjectCard from '../components/ui/ProjectCard'
import Modal from '../components/ui/Modal'

const emptyForm = { title: '', description: '', techStack: '', githubLink: '', liveLink: '' }

export default function Projects() {
  const { isAdmin } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = async () => {
    try {
      const res = await projectsAPI.getAll()
      setProjects(res.data)
    } catch {
      setError('Failed to load projects.')
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

  const openEdit = (p) => {
    setEditTarget(p)
    setForm({
      title: p.title,
      description: p.description,
      techStack: p.techStack?.join(', ') || '',
      githubLink: p.githubLink || '',
      liveLink: p.liveLink || '',
    })
    setFormError('')
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await projectsAPI.delete(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Failed to delete project.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setFormError('Title is required.'); return }
    setSaving(true)
    setFormError('')
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean)
    }
    try {
      if (editTarget) {
        const res = await projectsAPI.update(editTarget.id, payload)
        setProjects(prev => prev.map(p => p.id === editTarget.id ? res.data : p))
      } else {
        const res = await projectsAPI.create(payload)
        setProjects(prev => [res.data, ...prev])
      }
      setModalOpen(false)
    } catch (err) {
      setFormError(err.response?.data?.error || 'Failed to save project.')
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
              <p className="section-label">Projects</p>
              <h1 className="section-title" style={{ marginBottom: 8 }}>Things I've built</h1>
              <p className="section-sub">A selection of projects from my work and personal experiments.</p>
            </div>
            {isAdmin && (
              <button className="btn btn-primary" onClick={openCreate} style={{ alignSelf: 'flex-end' }}>
                + Add Project
              </button>
            )}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Loading projects…</div>
          )}
          {error && <div className="alert alert-error">{error}</div>}

          {!loading && !error && projects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No projects yet.{isAdmin && ' Add your first one!'}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Project' : 'New Project'}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {formError && <div className="alert alert-error">{formError}</div>}

          <div className="form-group">
            <label>Title *</label>
            <input className="form-input" placeholder="My Awesome Project" value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" rows={4} placeholder="What does this project do?"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Tech Stack (comma-separated)</label>
            <input className="form-input" placeholder="React, Spring Boot, MySQL"
              value={form.techStack}
              onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>GitHub Link</label>
            <input className="form-input" type="url" placeholder="https://github.com/..."
              value={form.githubLink}
              onChange={e => setForm(f => ({ ...f, githubLink: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Live Link</label>
            <input className="form-input" type="url" placeholder="https://..."
              value={form.liveLink}
              onChange={e => setForm(f => ({ ...f, liveLink: e.target.value }))} />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
