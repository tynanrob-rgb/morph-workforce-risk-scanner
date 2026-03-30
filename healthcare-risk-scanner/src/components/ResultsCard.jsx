function ResultsCard({ results }) {
  return (
    <section className="card results-card">
      <div className="section-heading">
        <h2>Healthcare estimate</h2>
        <p>
          This estimate combines absence pressure, staffing instability, fatigue, musculoskeletal
          risk, and wellbeing gaps to support a stronger workforce conversation in healthcare.
        </p>
      </div>

      {results ? (
        <div className="results-stack">
          <div className="metric-card accent">
            <div className="metric-header">
              <span className="metric-label">Estimated annual workforce pressure cost</span>
              <span className={`risk-pill risk-${results.riskBand.toLowerCase()}`}>
                {results.riskBand} risk
              </span>
            </div>
            <strong className="metric-value">{results.formattedEstimatedAnnualLoss}</strong>
            <p className="metric-support">
              A directional view of how absence, staffing instability, and workforce strain may be
              affecting cost and service resilience.
            </p>
          </div>

          <div className="results-grid">
            <div className="metric-card">
              <span className="metric-label">Healthcare risk score</span>
              <strong className="metric-value">{results.riskScore}/100</strong>
              <p className="metric-support">
                Weighted 30% staffing pressure, 25% fatigue, 25% MSK, and 20% wellbeing support.
              </p>
            </div>
            <div className="metric-card">
              <span className="metric-label">Recommended Morph focus</span>
              <strong className="metric-value metric-value-small">{results.interventionTitle}</strong>
              <p className="metric-support">
                Tailored around staff resilience, fatigue support, and healthier workforce performance.
              </p>
            </div>
          </div>

          <div className="signal-strip signal-strip-four">
            <div className="signal-item">
              <span className="signal-label">Staffing pressure signal</span>
              <strong>{results.staffingScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Fatigue signal</span>
              <strong>{results.fatigueScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">MSK signal</span>
              <strong>{results.mskScore}/100</strong>
            </div>
            <div className="signal-item">
              <span className="signal-label">Wellbeing support signal</span>
              <strong>{results.wellbeingScore}/100</strong>
            </div>
          </div>

          <div className="results-grid">
            <div className="detail-row">
              <span>Absence-related salary loss</span>
              <strong>{results.formattedAbsenceCost}</strong>
            </div>
            <div className="detail-row">
              <span>Staffing pressure exposure</span>
              <strong>{results.formattedStaffingPressureCost}</strong>
            </div>
            <div className="detail-row">
              <span>Modifiable absence pressure</span>
              <strong>{results.formattedModifiableAbsenceCost}</strong>
            </div>
            <div className="detail-row">
              <span>Indicative presenteeism pressure</span>
              <strong>{results.formattedPresenteeismPressureCost}</strong>
            </div>
          </div>

          <div className="logic-note">
            <span className="metric-label">How these figures are calculated</span>
            <p>
              <strong>Absence-related salary loss</strong>
              {' '}=
              {' '}
              workforce size x average sickness days x average daily salary.
            </p>
            <p>
              <strong>Staffing pressure exposure</strong>
              {' '}=
              {' '}
              staffing incidents x average incident cost for the selected care setting.
            </p>
            <p>
              <strong>Modifiable absence pressure</strong>
              {' '}=
              {' '}
              absence-related salary loss x 52.5%.
            </p>
            <p>
              This uses the midpoint of the evidence that MSK and mental health account for roughly
              50% to 55% of NHS sickness absence.
            </p>
            <p>
              <strong>Indicative presenteeism pressure</strong>
              {' '}=
              {' '}
              absence-related salary loss x 2.5.
            </p>
            <p>
              This uses the midpoint of the evidence that presenteeism may cost 2 to 3 times more
              than sickness absence.
            </p>
            <p>
              These are whole-workforce annual estimates across all {results.locationsIncluded} location
              {results.locationsIncluded === 1 ? '' : 's'} in scope.
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
            <span className="metric-label">Why this matters in healthcare</span>
            <ul className="evidence-list">
              {results.ukHealthcareEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="opportunity-panel opportunity-panel-strong">
            <span className="metric-label">Annual opportunity if fatigue improves by 10%</span>
            <p className="opportunity-copy">
              This is a whole-workforce, one-year scenario across {results.locationsIncluded} location
              {results.locationsIncluded === 1 ? '' : 's'}. It is not per person.
            </p>

            <div className="metric-card accent">
              <span className="metric-label">Why this matters to leadership</span>
              <strong className="metric-value metric-value-small">{results.formattedModifiableAbsenceCost}</strong>
              <p className="metric-support">
                That is the annual share of absence salary pressure tied to conditions we can often
                reduce, using the 50% to 55% NHS evidence range for MSK and mental health.
              </p>
            </div>

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
                  Conservative value based on salary cost only.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="metric-card">
                <span className="metric-label">Lost staff-day cost protected per year</span>
                <strong className="metric-value">{results.formattedOperationalValueProtected}</strong>
                <p className="metric-support">
                  Based on your estimate of what one lost staff day usually costs to absorb or cover.
                </p>
              </div>
              <div className="metric-card">
                <span className="metric-label">Extra cover cost pressure protected</span>
                <strong className="metric-value">{results.formattedCoverCostProtected}</strong>
                <p className="metric-support">
                  Based on the extra premium you expect when covering lost shifts.
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="metric-card">
                <span className="metric-label">Potential disruption days avoided</span>
                <strong className="metric-value">{results.disruptionDaysAvoided.toFixed(1)} days</strong>
                <p className="metric-support">Directional estimate based on rota sensitivity.</p>
              </div>
              <div className="metric-card">
                <span className="metric-label">Potential disruption cost avoided</span>
                <strong className="metric-value">{results.formattedDisruptionCostAvoided}</strong>
                <p className="metric-support">
                  Uses your service disruption cost per day and rota sensitivity.
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

            <details className="learn-more learn-more-deep">
              <summary>Learn more about this calculation</summary>
              <div className="deep-explainer">
                <p>
                  We reduce the fatigue score by 10%, then recalculate the full weighted risk score
                  using the same category weights.
                </p>
                <p>
                  Total days lost = workforce size x average sickness days. We then assume 22% of
                  those lost days are linked to fatigue, recovery, and strain in this directional
                  model.
                </p>
                <p>
                  A 10% fatigue improvement is applied to that fatigue-linked share to estimate days
                  protected. Those days are then used to estimate salary value, lost staff-day cost
                  protected, cover pressure, and service disruption impact.
                </p>
                <p>
                  We also show modifiable absence pressure using 52.5% of absence salary loss,
                  because the evidence says MSK and mental health account for roughly 50% to 55% of
                  NHS absence. Presenteeism pressure uses 2.5 x absence salary loss, which is the
                  midpoint of the evidence that presenteeism costs 2 to 3 times more than absence.
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
          <p className="empty-title">Ready for a healthcare estimate</p>
          <p>Your healthcare workforce summary will appear here after you submit the form.</p>
          <ul className="empty-checklist">
            <li>Enter workforce and care setting details</li>
            <li>Capture shift, handling, and support conditions</li>
            <li>Review the risk, cost, and opportunity view</li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default ResultsCard;
