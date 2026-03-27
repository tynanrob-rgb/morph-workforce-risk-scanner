function ResultsCard({ results }) {
  return (
    <section className="card results-card">
      <div className="section-heading">
        <h2>Construction estimate</h2>
        <p>
          This estimate combines absence-related salary loss, injury exposure, fatigue, and
          wellbeing gaps across {results ? results.sitesIncluded : 'your selected'} site
          {results && results.sitesIncluded === 1 ? '' : 's'} to support a stronger commercial
          conversation with construction leadership.
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

          <div className="logic-note">
            <span className="metric-label">How these figures are calculated</span>
            <p>
              <strong>Absence-related salary loss</strong>
              {' '}=
              {' '}
              workforce size x average sick days x average daily salary.
            </p>
            <p>
              <strong>Injury-related exposure</strong>
              {' '}=
              {' '}
              reportable injuries x average injury cost for the selected construction profile.
            </p>
            <p>
              These are whole-workforce annual estimates. They show salary and exposure cost, not
              full revenue or profit impact, and they cover all {results.sitesIncluded} site
              {results.sitesIncluded === 1 ? '' : 's'} in scope.
            </p>
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

          <div className="opportunity-panel opportunity-panel-strong">
            <span className="metric-label">Annual opportunity if fatigue improves by 10%</span>
            <p className="opportunity-copy">
              This is a whole-workforce, one-year scenario across {results.sitesIncluded} site
              {results.sitesIncluded === 1 ? '' : 's'}. It is not per person.
            </p>

            <div className="results-grid">
              <div className="metric-card accent">
                <span className="metric-label">Protected working days per year</span>
                <strong className="metric-value">{results.protectedDays} days</strong>
                <p className="metric-support">
                  Estimated working days protected across the assessed workforce over one year.
                </p>
              </div>
              <div className="metric-card accent">
                <span className="metric-label">Direct salary value protected per year</span>
                <strong className="metric-value">{results.formattedProtectedValue}</strong>
                <p className="metric-support">
                  Conservative value based on salary cost only, not revenue or margin.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="metric-card">
                <span className="metric-label">Operational value protected per year</span>
                <strong className="metric-value">{results.formattedOperationalValueProtected}</strong>
                <p className="metric-support">
                  Based on your estimated value of one productive worker day.
                </p>
              </div>
              <div className="metric-card">
                <span className="metric-label">Overtime / cover cost pressure protected</span>
                <strong className="metric-value">
                  {results.formattedOvertimeReplacementCostProtected}
                </strong>
                <p className="metric-support">
                  Based on the extra premium you expect when replacing lost labour time.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="metric-card">
                <span className="metric-label">Potential delay days avoided</span>
                <strong className="metric-value">{results.delayDaysAvoided.toFixed(1)} days</strong>
                <p className="metric-support">
                  Directional estimate based on critical path sensitivity.
                </p>
              </div>
              <div className="metric-card">
                <span className="metric-label">Potential delay / disruption cost avoided</span>
                <strong className="metric-value">{results.formattedDelayCostAvoided}</strong>
                <p className="metric-support">
                  Uses your estimated cost per delay day and labour disruption sensitivity.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="metric-card">
                <span className="metric-label">New fatigue score</span>
                <strong className="metric-value">{results.improvedFatigueScore}/100</strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">Risk points reduced</span>
                <strong className="metric-value">{results.riskReduction}</strong>
              </div>
            </div>

            <div className="opportunity-note">
              <p>
                In this example,{' '}
                <strong>{results.protectedDays} protected days</strong>
                {' '}means{' '}
                <strong>
                  {results.protectedDays} working days across the full assessed workforce over one
                  year
                </strong>
                , not for each employee.
              </p>
              <p>
                The{' '}
                <strong>{results.formattedProtectedValue}</strong>
                {' '}figure comes from{' '}
                <strong>
                  {results.protectedDays} x {results.formattedProtectedValuePerDay}
                </strong>
                {' '}average daily salary value.
              </p>
              <p>
                This is a conservative annual estimate. It does not include overtime cover, delay
                costs, rework, commercial loss, or revenue upside.
              </p>
              <p>
                The broader construction upside comes from the extra commercial inputs you entered:
                productive day value, overtime premium, delay cost per day, and critical path
                sensitivity.
              </p>
            </div>

            <details className="learn-more learn-more-deep">
              <summary>Learn more about this calculation</summary>
              <div className="deep-explainer">
                <p>
                  We start with your current fatigue score and model a 10% improvement. That gives
                  us a lower fatigue score, which then lowers the total weighted risk score.
                </p>
                <p>
                  We also estimate total days lost by multiplying workforce size by average sick
                  days. Then we assume 20% of those lost days are linked to fatigue, recovery, and
                  strain in this directional model.
                </p>
                <p>
                  A 10% fatigue improvement is then applied to that fatigue-linked share to estimate
                  days protected. Those protected days are multiplied by the daily salary assumption
                  for the selected construction profile to estimate direct salary value protected.
                </p>
                <p>
                  We then calculate broader construction impact in three more layers. First,
                  protected days x productive day value = operational value protected. Second,
                  protected days x average daily salary x overtime premium = extra cover cost
                  pressure protected. Third, protected days x critical-path factor = potential delay
                  days avoided, which are then multiplied by delay cost per day.
                </p>
                <p>
                  In this case:
                  {' '}
                  {results.totalDaysLost.toFixed(0)}
                  {' '}
                  total days lost x
                  {' '}
                  {(results.fatigueLinkedAbsenceShare * 100).toFixed(0)}
                  % fatigue-linked share =
                  {' '}
                  {results.fatigueLinkedDays.toFixed(0)}
                  {' '}
                  fatigue-linked days.
                  Then
                  {' '}
                  {results.fatigueLinkedDays.toFixed(0)}
                  {' '}
                  x
                  {' '}
                  {(results.fatigueImprovementRate * 100).toFixed(0)}
                  % =
                  {' '}
                  {results.protectedDays}
                  {' '}
                  protected days over one year across the full assessed workforce.
                </p>
                <p>
                  In this case, operational value protected =
                  {' '}
                  {results.protectedDays}
                  {' '}x{' '}
                  {results.formattedProductiveDayValue}
                  . Overtime / cover cost pressure protected =
                  {' '}
                  {results.protectedDays}
                  {' '}x{' '}
                  {results.formattedProtectedValuePerDay}
                  {' '}x{' '}
                  {results.overtimePremiumPercent}
                  %. Delay / disruption cost avoided uses a{' '}
                  {(results.criticalPathFactor * 100).toFixed(0)}
                  % critical-path conversion factor and{' '}
                  {results.formattedDelayCostPerDay}
                  {' '}per delay day.
                </p>
                <p>
                  This is a directional opportunity estimate, not a guaranteed saving.
                </p>
              </div>
            </details>
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
