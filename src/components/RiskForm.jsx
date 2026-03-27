const SITE_PROFILE_OPTIONS = [
  'Main contractor',
  'Civils / infrastructure',
  'Fit-out / specialist trades',
];

const SITE_TYPE_OPTIONS = ['New build', 'Refurbishment', 'Maintenance', 'Demolition'];

const WORK_AT_HEIGHT_OPTIONS = [
  { value: 'low', label: 'Low', hint: 'Rare or tightly controlled work at height' },
  { value: 'medium', label: 'Medium', hint: 'Regular exposure for parts of the workforce' },
  { value: 'high', label: 'High', hint: 'Frequent work at height across the site' },
];

const FATIGUE_OPTIONS = [
  { value: 'low', label: 'Low', hint: 'Shifts and recovery patterns look stable' },
  { value: 'medium', label: 'Medium', hint: 'Some overtime, travel, or schedule pressure' },
  { value: 'high', label: 'High', hint: 'Heavy overtime, long shifts, or clear fatigue concerns' },
];

const SCENARIOS = [
  {
    label: 'Regional contractor',
    values: {
      workforceSize: '240',
      siteProfile: 'Main contractor',
      siteType: 'New build',
      injuryFrequency: '11',
      absenteeism: '6',
      workAtHeightExposure: 'medium',
      fatigueRisk: 'medium',
      mentalHealthSupport: 'yes',
      wellbeingScreeningOffered: 'no',
    },
  },
  {
    label: 'Major civils site',
    values: {
      workforceSize: '480',
      siteProfile: 'Civils / infrastructure',
      siteType: 'Maintenance',
      injuryFrequency: '19',
      absenteeism: '7',
      workAtHeightExposure: 'high',
      fatigueRisk: 'high',
      mentalHealthSupport: 'no',
      wellbeingScreeningOffered: 'no',
    },
  },
  {
    label: 'Fast-track fit-out',
    values: {
      workforceSize: '160',
      siteProfile: 'Fit-out / specialist trades',
      siteType: 'Refurbishment',
      injuryFrequency: '8',
      absenteeism: '5',
      workAtHeightExposure: 'medium',
      fatigueRisk: 'high',
      mentalHealthSupport: 'yes',
      wellbeingScreeningOffered: 'yes',
    },
  },
];

function SegmentedOptions({ name, options, value, onChange }) {
  return (
    <div className="segmented-grid" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            className={active ? 'segment-button active' : 'segment-button'}
            type="button"
            onClick={() => onChange(option.value)}
          >
            <strong>{option.label}</strong>
            <span>{option.hint}</span>
          </button>
        );
      })}
    </div>
  );
}

function BinaryOptions({ name, value, onChange }) {
  return (
    <div className="binary-row" role="radiogroup" aria-label={name}>
      {[
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ].map((option) => (
        <button
          key={option.value}
          className={value === option.value ? 'binary-button active' : 'binary-button'}
          type="button"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function RiskForm({ formData, errors, onChange, onSubmit, onReset, onApplyScenario }) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section className="card">
      <div className="section-heading">
        <h2>Construction input details</h2>
        <p>Model the likely cost of absence, injuries, fatigue, and wellbeing gaps across a construction workforce.</p>
      </div>

      <div className="quick-start-panel">
        <div>
          <span className="side-label">Quick start</span>
          <p className="quick-start-copy">
            Start with a realistic contractor profile, then refine it using your own site data.
          </p>
        </div>

        <div className="scenario-row">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.label}
              className="scenario-button"
              type="button"
              onClick={() => onApplyScenario(scenario.values)}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      {hasErrors ? (
        <div className="form-alert" role="alert">
          Please fix the highlighted construction inputs to generate the estimate.
        </div>
      ) : null}

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <label className="field">
          <div className="field-head">
            <span className="field-label">Workforce size</span>
            <span className="field-hint">Employees included in the programme scope</span>
          </div>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="250"
            value={formData.workforceSize}
            onChange={(event) => onChange('workforceSize', event.target.value)}
            aria-invalid={Boolean(errors.workforceSize)}
          />
          <span className="help-text">Example: direct site staff, project teams, or one operating region.</span>
          {errors.workforceSize ? <span className="error-text">{errors.workforceSize}</span> : null}
        </label>

        <label className="field">
          <div className="field-head">
            <span className="field-label">Construction profile</span>
            <span className="field-hint">Adjusts assumptions within a construction context</span>
          </div>
          <select
            value={formData.siteProfile}
            onChange={(event) => onChange('siteProfile', event.target.value)}
            aria-invalid={Boolean(errors.siteProfile)}
          >
            <option value="">Select construction profile</option>
            {SITE_PROFILE_OPTIONS.map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
          <span className="help-text">Choose the closest delivery model for your workforce mix and site exposure.</span>
          {errors.siteProfile ? <span className="error-text">{errors.siteProfile}</span> : null}
        </label>

        <label className="field">
          <div className="field-head">
            <span className="field-label">Site type</span>
            <span className="field-hint">Used for exposure and recommendation context</span>
          </div>
          <select
            value={formData.siteType}
            onChange={(event) => onChange('siteType', event.target.value)}
            aria-invalid={Boolean(errors.siteType)}
          >
            <option value="">Select site type</option>
            {SITE_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className="help-text">Refurbishment, demolition, and maintenance can carry additional legacy exposure concerns.</span>
          {errors.siteType ? <span className="error-text">{errors.siteType}</span> : null}
        </label>

        <label className="field">
          <div className="field-head">
            <span className="field-label">Reportable injuries per year</span>
            <span className="field-hint">Use the last 12 months if possible</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="12"
            value={formData.injuryFrequency}
            onChange={(event) => onChange('injuryFrequency', event.target.value)}
            aria-invalid={Boolean(errors.injuryFrequency)}
          />
          <span className="help-text">Include incidents that materially affect productivity, cost, or duty of care.</span>
          {errors.injuryFrequency ? <span className="error-text">{errors.injuryFrequency}</span> : null}
        </label>

        <label className="field">
          <div className="field-head">
            <span className="field-label">Average sick days per employee</span>
            <span className="field-hint">Annual average across the selected workforce</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="6"
            value={formData.absenteeism}
            onChange={(event) => onChange('absenteeism', event.target.value)}
            aria-invalid={Boolean(errors.absenteeism)}
          />
          <span className="help-text">A clear baseline helps estimate productivity drag and hidden cost exposure.</span>
          {errors.absenteeism ? <span className="error-text">{errors.absenteeism}</span> : null}
        </label>

        <div className="field">
          <div className="field-head">
            <span className="field-label">Work at height exposure</span>
            <span className="field-hint">Falls from height remain a major construction risk</span>
          </div>
          <SegmentedOptions
            name="Work at height exposure"
            options={WORK_AT_HEIGHT_OPTIONS}
            value={formData.workAtHeightExposure}
            onChange={(value) => onChange('workAtHeightExposure', value)}
          />
          {errors.workAtHeightExposure ? (
            <span className="error-text">{errors.workAtHeightExposure}</span>
          ) : null}
        </div>

        <div className="field">
          <div className="field-head">
            <span className="field-label">Fatigue risk</span>
            <span className="field-hint">Long shifts, travel, and overtime can impair judgement</span>
          </div>
          <SegmentedOptions
            name="Fatigue risk"
            options={FATIGUE_OPTIONS}
            value={formData.fatigueRisk}
            onChange={(value) => onChange('fatigueRisk', value)}
          />
          {errors.fatigueRisk ? <span className="error-text">{errors.fatigueRisk}</span> : null}
        </div>

        <div className="field">
          <div className="field-head">
            <span className="field-label">Mental health support pathway in place</span>
            <span className="field-hint">Include policy, signposting, or support access</span>
          </div>
          <BinaryOptions
            name="Mental health support pathway"
            value={formData.mentalHealthSupport}
            onChange={(value) => onChange('mentalHealthSupport', value)}
          />
          {errors.mentalHealthSupport ? (
            <span className="error-text">{errors.mentalHealthSupport}</span>
          ) : null}
        </div>

        <div className="field">
          <div className="field-head">
            <span className="field-label">Wellbeing screening currently offered</span>
            <span className="field-hint">Diagnostics, baseline testing, or structured health checks</span>
          </div>
          <BinaryOptions
            name="Wellbeing screening offered"
            value={formData.wellbeingScreeningOffered}
            onChange={(value) => onChange('wellbeingScreeningOffered', value)}
          />
          {errors.wellbeingScreeningOffered ? (
            <span className="error-text">{errors.wellbeingScreeningOffered}</span>
          ) : null}
        </div>

        <div className="button-group">
          <button className="primary-button" type="submit">
            Calculate construction risk
          </button>
          <button className="secondary-button" type="button" onClick={onReset}>
            Reset inputs
          </button>
        </div>
      </form>
    </section>
  );
}

export default RiskForm;
