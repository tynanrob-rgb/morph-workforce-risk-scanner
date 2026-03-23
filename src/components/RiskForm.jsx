const INDUSTRY_OPTIONS = [
  'Construction',
  'Logistics',
  'Healthcare',
  'Office / Corporate',
  'Manufacturing',
];

function RiskForm({ formData, errors, onChange, onSubmit, onReset }) {
  return (
    <section className="card">
      <div className="section-heading">
        <h2>Input details</h2>
        <p>Enter a few workforce metrics to generate a sample risk estimate.</p>
      </div>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span className="field-label">Workforce Size</span>
          <input
            type="number"
            min="1"
            placeholder="250"
            value={formData.workforceSize}
            onChange={(event) => onChange('workforceSize', event.target.value)}
          />
          {errors.workforceSize ? <span className="error-text">{errors.workforceSize}</span> : null}
        </label>

        <label className="field">
          <span className="field-label">Industry</span>
          <select
            value={formData.industry}
            onChange={(event) => onChange('industry', event.target.value)}
          >
            <option value="">Select industry</option>
            {INDUSTRY_OPTIONS.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry ? <span className="error-text">{errors.industry}</span> : null}
        </label>

        <label className="field">
          <span className="field-label">Number of reportable injuries per year</span>
          <input
            type="number"
            min="0"
            placeholder="12"
            value={formData.injuryFrequency}
            onChange={(event) => onChange('injuryFrequency', event.target.value)}
          />
          {errors.injuryFrequency ? (
            <span className="error-text">{errors.injuryFrequency}</span>
          ) : null}
        </label>

        <label className="field">
          <span className="field-label">Average sick days per employee per year</span>
          <input
            type="number"
            min="0"
            placeholder="6"
            value={formData.absenteeism}
            onChange={(event) => onChange('absenteeism', event.target.value)}
          />
          {errors.absenteeism ? <span className="error-text">{errors.absenteeism}</span> : null}
        </label>

        <div className="button-group">
          <button className="primary-button" type="submit">
            Calculate My Risk
          </button>
          <button className="secondary-button" type="button" onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default RiskForm;
