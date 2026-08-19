export function About() {
  return (
    <section id="about" className="panel split">
      <div>
        <p className="eyebrow">About Kupendra Venkatesh</p>
        <h2>Engineering AI systems for measurable ROI</h2>
        <p className="lede">
          Most AI engineering stops at building expensive wrappers. I engineer end-to-end AI systems and automated workflows that drive revenue—reducing operational drag, intercepting customer churn, and accelerating productivity by 2-3x. Every decision is grounded in unit economics.
        </p>
        <ul className="bullets">
          <li><b>End-to-End AI Systems:</b> Designed predictive ML platforms for churn interception, agentic workflows for task automation, and cost-optimized inference pipelines—each with measurable ROI metrics.</li>
          <li><b>System Architecture:</b> Built resilient architectures integrating legacy workflows with modern AI—API orchestration, data pipeline optimization, and machine-to-machine automation layers that scale.</li>
          <li><b>Production ML Ops:</b> Deployed ML models to production at scale—monitoring, versioning, cost modeling, and real-time inference infrastructure designed for reliability and cost efficiency.</li>
          <li><b>Business-Driven Engineering:</b> Technical choices filtered through ROI: does this reduce inference costs? Does it ship faster? Does it solve the core problem or just look impressive?</li>
        </ul>
      </div>
      <div className="stack-card">
        <p className="eyebrow">Toolbox</p>

        <h4 className="stack-title">Languages</h4>
        <div className="chip-grid">
          {['Python', 'TypeScript', 'JavaScript', 'SQL'].map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>

        <h4 className="stack-title">AI / ML Stack</h4>
        <div className="chip-grid">
          {['LLMs', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'].map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>

        <h4 className="stack-title">Frameworks & Tools</h4>
        <div className="chip-grid">
          {['React', 'Node.js', 'FastAPI', 'PostgreSQL', 'Anthropic SDK'].map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>

        <h4 className="stack-title">Production & Ops</h4>
        <div className="chip-grid">
          {['Docker', 'CI/CD', 'Monitoring', 'Cost Optimization', 'System Architecture'].map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
