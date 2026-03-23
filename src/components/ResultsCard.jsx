function ResultsCard({ results }) {
  return (
    <section className="card results-card">
      <div className="section-heading">
        <h2>Results</h2>
        <p>This estimate combines absenteeism-related salary loss and injury-related cost exposure.</p>
      </div>

      {results ? (
        <div className="results-stack">
          <div className="metric-card accent">
            <span className="metric-label">Estimated Annual Loss</span>
            <strong className="metric-value">{results.formattedEstimatedAnnualLoss}</strong>
            <p className="metric-support">
              This estimate combines absenteeism-related salary loss and injury-related cost exposure.
            </p>
          </div>

          <div className="results-grid">
            <div className="metric-card">
              <span className="metric-label">Risk Score</span>
              <strong className="metric-value">{results.riskScore}/100</strong>
            </div>
            <div className="metric-card">
              <span className="metric-label">Risk Band</span>
              <strong className={`risk-pill risk-${results.riskBand.toLowerCase()}`}>
                {results.riskBand}
              </strong>
            </div>
          </div>

          <div className="signal-strip">
            <div className="signal-item">
              <span className="signal-label">Absenteeism signal</span>
              <strong>{results.absenteeismScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Injury signal</span>
              <strong>{results.injuryScore}/100</strong>
            </div>
          </div>

          <div className="results-grid">
            <div className="detail-row">
              <span>Absenteeism Cost</span>
              <strong>{results.formattedAbsenteeismCost}</strong>
            </div>
            <div className="detail-row">
              <span>Injury Cost</span>
              <strong>{results.formattedInjuryCost}</strong>
            </div>
          </div>

          <div className="intervention-card">
            <span className="metric-label">Suggested Morph Intervention</span>
            <p className="intervention-text">{results.intervention}</p>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-title">Ready for a live estimate</p>
          <p>Your calculated risk summary will appear here after you submit the form.</p>
        </div>
      )}
    </section>
  );
}

export default ResultsCard;
