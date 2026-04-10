export default function About() {
  return (
    <div className="page-enter" style={{ paddingTop: 80 }}>
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <p className="section-label">About Me</p>
            <h1 className="section-title">Crafting full-stack systems with<br />purpose &amp; precision</h1>
            <p className="section-sub" style={{ maxWidth: '100%', marginBottom: 48 }}>
              I'm a Computer Science undergraduate and Java full-stack developer with a passion for
              building scalable, reliable, and high-performance software — from robust Spring Boot
              backends to clean, responsive React interfaces.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 64 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
                  Background
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
                  I started programming in college and fell in love with building end-to-end systems.
                  From designing REST APIs and microservices in Spring Boot to crafting responsive
                  UIs in React — I enjoy owning the full stack.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>
                  Currently focused on Java full-stack development, with a growing interest in
                  distributed systems, scalable architecture, and system design. I actively
                  practice DSA on LeetCode and enjoy problem-solving as much as the building.
                </p>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
                  Education
                </h2>
                {[
                  { degree: 'B.E. Computer Science & Engineering', school: 'AVS Engineering College, Anna University', year: '2023–2027' },
                ].map(({ degree, school, year }) => (
                  <div key={degree} style={{
                    padding: '14px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 10
                  }}>
                    <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{degree}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{school} · {year}</div>
                  </div>
                ))}

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '24px 0 16px', color: 'var(--text-primary)' }}>
                  Experience
                </h2>
                {[
                  { role: 'Software Development Intern', company: 'Aurotech Company', year: '2024' },
                ].map(({ role, company, year }) => (
                  <div key={role} style={{
                    padding: '14px 16px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 10
                  }}>
                    <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{role}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{company} · {year}</div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="divider" />

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, marginBottom: 24, color: 'var(--text-primary)' }}>
              What I value
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: '☕', title: 'Java First', desc: 'Spring Boot APIs, clean architecture, and solid backend foundations.' },
                { icon: '🎨', title: 'Full Stack', desc: 'From REST endpoints to React UIs — I own the entire product.' },
                { icon: '🏗️', title: 'Scalability', desc: 'Distributed systems thinking built into every architecture decision.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card" style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}