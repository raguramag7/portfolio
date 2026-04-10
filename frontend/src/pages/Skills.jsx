const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Vite', 'Tailwind CSS', 'Axios']
  },
  {
    category: 'Backend',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'REST API', 'JPA / Hibernate', 'Maven']
  },
  {
    category: 'Database',
    skills: ['MySQL', 'MariaDB', 'PostgreSQL', 'SQL Queries', 'DB Design']
  },
  {
    category: 'DevOps & Tools',
    skills: ['Git & GitHub', 'Docker (basics)', 'Linux CLI', 'Postman', 'VS Code', 'IntelliJ IDEA']
  },
  {
    category: 'Concepts',
    skills: ['System Design', 'MVC Pattern', 'JWT Auth', 'CORS / Security', 'Agile / Scrum', 'Clean Code']
  },
]

export default function Skills() {
  return (
    <div className="page-enter" style={{ paddingTop: 80 }}>
      <section className="section">
        <div className="container">
          <p className="section-label">Skills</p>
          <h1 className="section-title">Technologies I work with</h1>
          <p className="section-sub" style={{ marginBottom: 64 }}>
            A growing toolkit built through real projects and constant learning.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {skillGroups.map(({ category, skills }) => (
              <div key={category} className="card">
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 16
                }}>
                  {category}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skills.map(skill => (
                    <span key={skill} style={{
                      padding: '5px 12px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      transition: 'border-color 0.2s, color 0.2s',
                      cursor: 'default'
                    }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.color = 'var(--text-primary)'
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.color = 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Learning section */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
              Currently learning
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Kubernetes', 'GraphQL', 'TypeScript', 'AWS Basics'].map(t => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
