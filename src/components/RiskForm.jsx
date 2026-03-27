const SITE_PROFILE_OPTIONS = [
  'Main contractor',
  'Civils / infrastructure',
  'Fit-out / specialist trades',
  'GroundWorks Specialists',
];

const SITE_TYPE_OPTIONS = ['New build', 'Refurbishment', 'Maintenance', 'Demolition'];
const CRITICAL_PATH_OPTIONS = ['Low', 'Medium', 'High'];

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

function LearnMore({ children }) {
  return (
    <details className="learn-more">
      <summary>Learn more</summary>
      <p>{children}</p>
    </details>
  );
}

function RiskForm({ formData, errors, onChange, onSubmit, onReset }) {
  const hasErrors = Object.keys(errors).length > 0;
  const getFieldClassName = (error) => (error ? 'field field-error' : 'field');

  return (
    <section className="card">
      <div className="section-heading">
        <h2>Construction input details</h2>
        <p>Model the likely cost of absence, injuries, fatigue, and wellbeing gaps across a construction workforce.</p>
      </div>

      {hasErrors ? (
        <div className="form-alert" role="alert">
          Complete the highlighted questions to generate your construction risk estimate.
        </div>
      ) : null}

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <label className={getFieldClassName(errors.workforceSize)}>
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
          <LearnMore>
            This should cover the people across all sites included in this assessment.
          </LearnMore>
          {errors.workforceSize ? <span className="error-text">{errors.workforceSize}</span> : null}
        </label>

        <label className={getFieldClassName(errors.sitesIncluded)}>
          <div className="field-head">
            <span className="field-label">How many sites are included in this assessment?</span>
            <span className="field-hint">Use 1 for one site, or enter the total number in scope</span>
          </div>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="4"
            value={formData.sitesIncluded}
            onChange={(event) => onChange('sitesIncluded', event.target.value)}
            aria-invalid={Boolean(errors.sitesIncluded)}
          />
          <LearnMore>
            If a contractor or developer is looking at 4 sites, enter 4. The outputs will then be
            understood as covering that whole site group.
          </LearnMore>
          {errors.sitesIncluded ? <span className="error-text">{errors.sitesIncluded}</span> : null}
        </label>

        <label className={getFieldClassName(errors.siteProfile)}>
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
          <LearnMore>
            Different construction jobs carry different levels of risk, so this changes the score a
            little.
          </LearnMore>
          {errors.siteProfile ? <span className="error-text">{errors.siteProfile}</span> : null}
        </label>

        <label className={getFieldClassName(errors.siteType)}>
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
          <LearnMore>
            Some site types bring extra health risk, so they can push the score up a little.
          </LearnMore>
          {errors.siteType ? <span className="error-text">{errors.siteType}</span> : null}
        </label>

        <label className={getFieldClassName(errors.injuryFrequency)}>
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

        <label className={getFieldClassName(errors.absenteeism)}>
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

        <div className={getFieldClassName(errors.workAtHeightExposure)}>
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
          <LearnMore>
            More work at height means more danger, so this raises the safety score.
          </LearnMore>
          {errors.workAtHeightExposure ? (
            <span className="error-text">{errors.workAtHeightExposure}</span>
          ) : null}
        </div>

        <div className={getFieldClassName(errors.fatigueRisk)}>
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
          <LearnMore>
            CCS says tired workers can think slower and react slower, so this is treated as a real
            risk.
          </LearnMore>
          {errors.fatigueRisk ? <span className="error-text">{errors.fatigueRisk}</span> : null}
        </div>

        <div className={getFieldClassName(errors.fatigueMonitoring)}>
          <div className="field-head">
            <span className="field-label">
              Does your company currently consider or measure fatigue build-up in employees?
            </span>
            <span className="field-hint">Fatigue monitoring can help reduce site and MSK risk</span>
          </div>
          <BinaryOptions
            name="Fatigue build-up measured"
            value={formData.fatigueMonitoring}
            onChange={(value) => onChange('fatigueMonitoring', value)}
          />
          <LearnMore>
            If fatigue is not checked, the scanner raises fatigue risk and safety risk.
          </LearnMore>
          {errors.fatigueMonitoring ? (
            <span className="error-text">{errors.fatigueMonitoring}</span>
          ) : null}
        </div>

        <div className={getFieldClassName(errors.mentalHealthSupport)}>
          <div className="field-head">
            <span className="field-label">Mental health support pathway in place</span>
            <span className="field-hint">Include policy, signposting, or support access</span>
          </div>
          <BinaryOptions
            name="Mental health support pathway"
            value={formData.mentalHealthSupport}
            onChange={(value) => onChange('mentalHealthSupport', value)}
          />
          <LearnMore>
            Stress and poor mental health can lead to more missed work, so missing support raises
            this risk.
          </LearnMore>
          {errors.mentalHealthSupport ? (
            <span className="error-text">{errors.mentalHealthSupport}</span>
          ) : null}
        </div>

        <div className={getFieldClassName(errors.wellbeingScreeningOffered)}>
          <div className="field-head">
            <span className="field-label">Wellbeing screening currently offered</span>
            <span className="field-hint">Diagnostics, baseline testing, or structured health checks</span>
          </div>
          <BinaryOptions
            name="Wellbeing screening offered"
            value={formData.wellbeingScreeningOffered}
            onChange={(value) => onChange('wellbeingScreeningOffered', value)}
          />
          <LearnMore>
            Health checks can spot hidden problems earlier, so not offering them raises this part
            of the score.
          </LearnMore>
          {errors.wellbeingScreeningOffered ? (
            <span className="error-text">{errors.wellbeingScreeningOffered}</span>
          ) : null}
        </div>

        <div className="section-heading compact-heading">
          <h2>Commercial opportunity inputs</h2>
          <p>Add simple commercial assumptions to estimate broader construction upside.</p>
        </div>

        <label className={getFieldClassName(errors.productiveDayValue)}>
          <div className="field-head">
            <span className="field-label">Value of one good worker-day on site</span>
            <span className="field-hint">The value of one person having one productive day, not the value of the whole site</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="350"
            value={formData.productiveDayValue}
            onChange={(event) => onChange('productiveDayValue', event.target.value)}
            aria-invalid={Boolean(errors.productiveDayValue)}
          />
          <LearnMore>
            This is not pay, and it is not total site value. It means one worker for one productive
            day. If you cover 4 sites, the scanner applies this one worker-day value across the
            whole workforce in scope.
          </LearnMore>
          {errors.productiveDayValue ? (
            <span className="error-text">{errors.productiveDayValue}</span>
          ) : null}
        </label>

        <label className={getFieldClassName(errors.overtimePremiumPercent)}>
          <div className="field-head">
            <span className="field-label">Extra cost of covering lost labour time (%)</span>
            <span className="field-hint">How much more it usually costs to cover missed time</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="25"
            value={formData.overtimePremiumPercent}
            onChange={(event) => onChange('overtimePremiumPercent', event.target.value)}
            aria-invalid={Boolean(errors.overtimePremiumPercent)}
          />
          <LearnMore>
            If cover, overtime, or replacement labour costs more than normal, add that extra %
            here.
          </LearnMore>
          {errors.overtimePremiumPercent ? (
            <span className="error-text">{errors.overtimePremiumPercent}</span>
          ) : null}
        </label>

        <label className={getFieldClassName(errors.delayCostPerDay)}>
          <div className="field-head">
            <span className="field-label">Cost of one day of project delay</span>
            <span className="field-hint">A simple estimate of what one lost day costs the job</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="2000"
            value={formData.delayCostPerDay}
            onChange={(event) => onChange('delayCostPerDay', event.target.value)}
            aria-invalid={Boolean(errors.delayCostPerDay)}
          />
          <LearnMore>
            This helps show how labour disruption can affect programme cost and site performance.
          </LearnMore>
          {errors.delayCostPerDay ? (
            <span className="error-text">{errors.delayCostPerDay}</span>
          ) : null}
        </label>

        <label className={getFieldClassName(errors.criticalPathSensitivity)}>
          <div className="field-head">
            <span className="field-label">How badly would labour disruption affect the job?</span>
            <span className="field-hint">Choose how easily labour shortages could delay the project</span>
          </div>
          <select
            value={formData.criticalPathSensitivity}
            onChange={(event) => onChange('criticalPathSensitivity', event.target.value)}
            aria-invalid={Boolean(errors.criticalPathSensitivity)}
          >
            <option value="">Select sensitivity</option>
            {CRITICAL_PATH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <LearnMore>
            Higher means labour disruption is more likely to slow the programme and affect finish
            dates.
          </LearnMore>
          {errors.criticalPathSensitivity ? (
            <span className="error-text">{errors.criticalPathSensitivity}</span>
          ) : null}
        </label>

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
