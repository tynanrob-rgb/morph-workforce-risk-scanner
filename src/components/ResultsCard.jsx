function ResultsCard({ results }) {
  return (
    <section className="card results-card">
      <div className="section-heading">
        <h2>Construction estimate</h2>
        <p>
          This estimate combines absence-related salary loss, injury exposure, fatigue, and
          wellbeing gaps to support a stronger commercial conversation with construction leadership.
        </p>
      </div>

      {results ? (
        <div className="results-stack">
          <div className="metric-card accent">
            <div className="metric-header">
              <span className="metric-label">Estimated annual productivity drag</span>
              <span className={`risk-pill risk-${results.riskBand.toLowerCase()}`}>
                {results.riskBand} risk
              </span>
            </div>
            <strong className="metric-value">{results.formattedEstimatedAnnualLoss}</strong>
            <p className="metric-support">
              A directional view of how workforce health and site risk can affect productivity,
              absence, and cost control.
            </p>
          </div>

          <div className="results-grid">
            <div className="metric-card">
              <span className="metric-label">Construction risk score</span>
              <strong className="metric-value">{results.riskScore}/100</strong>
              <p className="metric-support">
                Weighted 35% safety, 25% absence, 20% fatigue, and 20% wellbeing support.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Recommended Morph focus</span>
              <strong className="metric-value metric-value-small">{results.interventionTitle}</strong>
              <p className="metric-support">
                Tailored around diagnostics, care, and sustainable workforce performance.
              </p>
            </div>
          </div>

          <div className="signal-strip signal-strip-four">
            <div className="signal-item">
              <span className="signal-label">Safety signal</span>
              <strong>{results.injuryScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Absence signal</span>
              <strong>{results.absenteeismScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Fatigue signal</span>
              <strong>{results.fatigueScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Wellbeing support signal</span>
              <strong>{results.wellbeingScore}/100</strong>
            </div>
          </div>

          <div className="results-grid">
            <div className="detail-row">
              <span>Absence-related salary loss</span>
              <strong>{results.formattedAbsenteeismCost}</strong>
            </div>
            <div className="detail-row">
              <span>Injury-related exposure</span>
              <strong>{results.formattedInjuryCost}</strong>
            </div>
          </div>

          <div className="driver-panel">
            <span className="metric-label">Top risk drivers</span>
            <div className="driver-list">
              {results.riskDrivers.map((driver) => (
                <div className="driver-item" key={driver.label}>
                  <div className="driver-head">
                    <strong>{driver.label}</strong>
                    <span>{driver.score}/100</span>
                  </div>
                  <p>{driver.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="intervention-card">
            <span className="metric-label">Why Morph</span>
            <p className="intervention-text">{results.intervention}</p>
            <ul className="recommendation-list">
              {results.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="evidence-panel">
            <span className="metric-label">Why this matters in UK construction</span>
            <ul className="evidence-list">
              {results.ukConstructionEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-title">Ready for a construction estimate</p>
          <p>Your site-focused risk summary will appear here after you submit the form.</p>
          <ul className="empty-checklist">
            <li>Choose a site profile and site type</li>
            <li>Enter workforce size, injuries, and sick days</li>
            <li>Capture exposure, fatigue, and support gaps</li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default ResultsCard;
