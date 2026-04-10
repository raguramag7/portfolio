import { useAuth } from '../../context/AuthContext'

export default function ProjectCard({ project, onEdit, onDelete }) {
  const { isAdmin } = useAuth()

  return (
    <div className="card project-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 8,
          color: 'var(--text-primary)'
        }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>
          {project.description}
        </p>
      </div>

      {project.techStack?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.map((tech, i) => (
            <span key={i} className="badge">{tech}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto' }}>
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost" style={{ fontSize: 13, padding: '7px 14px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ fontSize: 13, padding: '7px 14px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Live Demo
          </a>
        )}
        {isAdmin && (
          <>
            <button onClick={() => onEdit(project)} className="btn btn-ghost" style={{ fontSize: 13, padding: '7px 14px', marginLeft: 'auto' }}>
              Edit
            </button>
            <button onClick={() => onDelete(project.id)} className="btn btn-danger" style={{ fontSize: 13, padding: '7px 14px' }}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
