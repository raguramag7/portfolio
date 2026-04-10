import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__status-dot" />
              Available for opportunities
            </div>

            <h1 className="hero__title">
              Raguram A G<br />
              <span className="hero__title-accent">Java Full-Stack<br />Developer</span>
            </h1>

            <p className="hero__sub">
              Passionate about building robust, scalable full-stack systems.
              Focused on clean Spring Boot APIs, responsive React UIs, and high-performance databases.
            </p>

            <div className="hero__cta">
              <Link to="/projects" className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ fontSize: 15, padding: '12px 28px' }}>
                Get in touch
              </Link>
            </div>

            <div style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: 16,
              marginTop: 8
            }}>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 15,
                fontStyle: 'italic',
                lineHeight: 1.7
              }}>
                "Code is not just instructions for machines —<br />
                it's a craft, and I take pride in every line."
              </p>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__code-window">
              <div className="hero__code-bar">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
                <span className="hero__code-filename">portfolio.java</span>
              </div>
              <pre className="hero__code-body"><code>{`@RestController
public class PortfolioController {

  @GetMapping("/developer")
  public Developer getMe() {
    return Developer.builder()
      .name("Raguram A G")
      .role("Java Full-Stack Dev")
      .stack(List.of(
        "Spring Boot", "React",
        "PostgreSQL", "Redis"
      ))
      .available(true)
      .build();
  }
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="home__nav-grid">
            {[
              { to: '/about',    icon: '👤', title: 'About Me',  desc: 'Background, education, and what drives me.'         },
              { to: '/skills',   icon: '☕', title: 'Skills',    desc: 'Java, Spring Boot, React, and more.'                },
              { to: '/projects', icon: '🗂️', title: 'Projects',  desc: 'Distributed systems, streaming backends & more.'   },
              { to: '/blog',     icon: '✍️', title: 'Blog',      desc: 'Thoughts on Java, system design, and engineering.' },
            ].map(({ to, icon, title, desc }) => (
              <Link key={to} to={to} className="home__nav-card card">
                <span className="home__nav-icon">{icon}</span>
                <h3 className="home__nav-title">{title}</h3>
                <p className="home__nav-desc">{desc}</p>
                <span className="home__nav-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}