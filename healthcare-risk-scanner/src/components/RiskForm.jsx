const CARE_SETTING_OPTIONS = [
  'Acute hospital',
  'Care home / residential care',
  'Community / domiciliary care',
  'Primary care / clinic',
];

const SHIFT_PRESSURE_OPTIONS = [
  { value: 'low', label: 'Low', hint: 'Stable shifts and manageable workload' },
  { value: 'medium', label: 'Medium', hint: 'Some rota pressure or extra shifts' },
  { value: 'high', label: 'High', hint: 'Frequent long shifts, nights, or understaffing pressure' },
];

const MANUAL_HANDLING_OPTIONS = [
  { value: 'low', label: 'Low', hint: 'Limited lifting or patient movement strain' },
  { value: 'medium', label: 'Medium', hint: 'Regular physical handling in parts of the workforce' },
  { value: 'high', label: 'High', hint: 'Frequent handling, repositioning, or repeated strain' },
];

const AGENCY_RELIANCE_OPTIONS = [
  { value: 'low', label: 'Low', hint: 'Little need for temporary cover' },
  { value: 'medium', label: 'Medium', hint: 'Regular use of agency or bank support' },
  { value: 'high', label: 'High', hint: 'Heavy dependence on temporary staffing to keep services running' },
];

const ROTA_SENSITIVITY_OPTIONS = ['Low', 'Medium', 'High'];

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
        <h2>Healthcare input details</h2>
        <p>Model staffing pressure, fatigue, musculoskeletal risk, and wellbeing gaps across a healthcare workforce.</p>
      </div>

      {hasErrors ? (
        <div className="form-alert" role="alert">
          Complete the highlighted questions to generate your healthcare workforce risk estimate.
        </div>
      ) : null}

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <label className={getFieldClassName(errors.workforceSize)}>
          <div className="field-head">
            <span className="field-label">Workforce size</span>
            <span className="field-hint">Staff included in the assessment</span>
          </div>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="300"
            value={formData.workforceSize}
            onChange={(event) => onChange('workforceSize', event.target.value)}
            aria-invalid={Boolean(errors.workforceSize)}
          />
          <LearnMore>
            This should cover the people across all locations included in this assessment.
          </LearnMore>
          {errors.workforceSize ? <span className="error-text">{errors.workforceSize}</span> : null}
        </label>

        <label className={getFieldClassName(errors.locationsIncluded)}>
          <div className="field-head">
            <span className="field-label">How many locations are included?</span>
            <span className="field-hint">Use 1 for one location or enter the full group in scope</span>
          </div>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="4"
            value={formData.locationsIncluded}
            onChange={(event) => onChange('locationsIncluded', event.target.value)}
            aria-invalid={Boolean(errors.locationsIncluded)}
          />
          <LearnMore>
            If your organisation is reviewing 4 hospitals, homes, or clinics together, enter 4.
          </LearnMore>
          {errors.locationsIncluded ? <span className="error-text">{errors.locationsIncluded}</span> : null}
        </label>

        <label className={getFieldClassName(errors.careSetting)}>
          <div className="field-head">
            <span className="field-label">Care setting</span>
            <span className="field-hint">Used to choose the closest workforce profile</span>
          </div>
          <select
            value={formData.careSetting}
            onChange={(event) => onChange('careSetting', event.target.value)}
            aria-invalid={Boolean(errors.careSetting)}
          >
            <option value="">Select care setting</option>
            {CARE_SETTING_OPTIONS.map((setting) => (
              <option key={setting} value={setting}>
                {setting}
              </option>
            ))}
          </select>
          <LearnMore>
            Different healthcare settings carry different staffing, fatigue, and physical strain patterns.
          </LearnMore>
          {errors.careSetting ? <span className="error-text">{errors.careSetting}</span> : null}
        </label>

        <label className={getFieldClassName(errors.sicknessDays)}>
          <div className="field-head">
            <span className="field-label">Average sickness days per employee</span>
            <span className="field-hint">Annual average across the selected workforce</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="7"
            value={formData.sicknessDays}
            onChange={(event) => onChange('sicknessDays', event.target.value)}
            aria-invalid={Boolean(errors.sicknessDays)}
          />
          <LearnMore>
            This helps estimate absence pressure, lost staffing time, and service disruption.
          </LearnMore>
          {errors.sicknessDays ? <span className="error-text">{errors.sicknessDays}</span> : null}
        </label>

        <label className={getFieldClassName(errors.staffingIncidents)}>
          <div className="field-head">
            <span className="field-label">Days each year when staffing gaps put the service under pressure</span>
            <span className="field-hint">Count days with rota gaps, missed cover, double shifts, or other staffing problems that made the day harder to run</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="20"
            value={formData.staffingIncidents}
            onChange={(event) => onChange('staffingIncidents', event.target.value)}
            aria-invalid={Boolean(errors.staffingIncidents)}
          />
          <LearnMore>
            Keep this simple. Enter the number of days in a year when staffing gaps clearly made
            the service harder to run. Examples include unfilled rota gaps, urgent agency or bank
            cover, double shifts, staff staying late, or patient flow being affected.
          </LearnMore>
          {errors.staffingIncidents ? <span className="error-text">{errors.staffingIncidents}</span> : null}
        </label>

        <div className={getFieldClassName(errors.shiftPressure)}>
          <div className="field-head">
            <span className="field-label">Shift pressure</span>
            <span className="field-hint">Think long shifts, nights, missed breaks, and rota strain</span>
          </div>
          <SegmentedOptions
            name="Shift pressure"
            options={SHIFT_PRESSURE_OPTIONS}
            value={formData.shiftPressure}
            onChange={(value) => onChange('shiftPressure', value)}
          />
          <LearnMore>
            Higher shift pressure raises fatigue risk because recovery becomes harder and judgement can slip.
          </LearnMore>
          {errors.shiftPressure ? <span className="error-text">{errors.shiftPressure}</span> : null}
        </div>

        <div className={getFieldClassName(errors.manualHandlingExposure)}>
          <div className="field-head">
            <span className="field-label">Manual handling and physical strain exposure</span>
            <span className="field-hint">Think lifting, repositioning, repeated movement, and awkward postures</span>
          </div>
          <SegmentedOptions
            name="Manual handling exposure"
            options={MANUAL_HANDLING_OPTIONS}
            value={formData.manualHandlingExposure}
            onChange={(value) => onChange('manualHandlingExposure', value)}
          />
          <LearnMore>
            Higher physical strain increases musculoskeletal risk and can also increase absence pressure.
          </LearnMore>
          {errors.manualHandlingExposure ? <span className="error-text">{errors.manualHandlingExposure}</span> : null}
        </div>

        <div className={getFieldClassName(errors.agencyReliance)}>
          <div className="field-head">
            <span className="field-label">Agency or temporary staffing reliance</span>
            <span className="field-hint">How much the service depends on temporary cover</span>
          </div>
          <SegmentedOptions
            name="Agency reliance"
            options={AGENCY_RELIANCE_OPTIONS}
            value={formData.agencyReliance}
            onChange={(value) => onChange('agencyReliance', value)}
          />
          <LearnMore>
            Higher temporary cover reliance usually signals more staffing fragility and can raise fatigue pressure.
          </LearnMore>
          {errors.agencyReliance ? <span className="error-text">{errors.agencyReliance}</span> : null}
        </div>

        <div className={getFieldClassName(errors.fatigueMonitoring)}>
          <div className="field-head">
            <span className="field-label">
              Does your organisation currently consider or measure fatigue build-up?
            </span>
            <span className="field-hint">Fatigue checks can help reduce hidden exhaustion risk</span>
          </div>
          <BinaryOptions
            name="Fatigue monitoring"
            value={formData.fatigueMonitoring}
            onChange={(value) => onChange('fatigueMonitoring', value)}
          />
          <LearnMore>
            If fatigue is not checked, the scanner raises fatigue risk because hidden exhaustion is harder to spot early.
          </LearnMore>
          {errors.fatigueMonitoring ? <span className="error-text">{errors.fatigueMonitoring}</span> : null}
        </div>

        <div className={getFieldClassName(errors.mentalHealthSupport)}>
          <div className="field-head">
            <span className="field-label">Mental health support pathway in place</span>
            <span className="field-hint">Include policy, signposting, or access to practical support</span>
          </div>
          <BinaryOptions
            name="Mental health support"
            value={formData.mentalHealthSupport}
            onChange={(value) => onChange('mentalHealthSupport', value)}
          />
          <LearnMore>
            Missing support can make burnout, stress, and retention risk worse.
          </LearnMore>
          {errors.mentalHealthSupport ? <span className="error-text">{errors.mentalHealthSupport}</span> : null}
        </div>

        <div className={getFieldClassName(errors.wellbeingScreeningOffered)}>
          <div className="field-head">
            <span className="field-label">Wellbeing screening currently offered</span>
            <span className="field-hint">Checks, baseline reviews, or early support processes</span>
          </div>
          <BinaryOptions
            name="Wellbeing screening"
            value={formData.wellbeingScreeningOffered}
            onChange={(value) => onChange('wellbeingScreeningOffered', value)}
          />
          <LearnMore>
            Earlier checks can help spot hidden health strain before it becomes an absence or retention problem.
          </LearnMore>
          {errors.wellbeingScreeningOffered ? <span className="error-text">{errors.wellbeingScreeningOffered}</span> : null}
        </div>

        <div className="section-heading compact-heading">
          <h2>Commercial opportunity inputs</h2>
          <p>Add simple operational assumptions to estimate broader healthcare upside.</p>
        </div>

        <label className={getFieldClassName(errors.productiveDayValue)}>
          <div className="field-head">
            <span className="field-label">Cost of losing one staff day</span>
            <span className="field-hint">What does it usually cost when one person is missing for one day and the service has to absorb or cover it?</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="320"
            value={formData.productiveDayValue}
            onChange={(event) => onChange('productiveDayValue', event.target.value)}
            aria-invalid={Boolean(errors.productiveDayValue)}
          />
          <span className="field-hint">
            Example: GBP 220 to 400 per lost day depending on cover cost and disruption.
          </span>
          <LearnMore>
            Use the easiest number your team already understands. Good options are: the average
            bank or agency cover cost for one shift, the extra cost of overtime to fill that gap,
            or your best estimate of what one missed staff day disrupts or costs. This is for one
            person for one day, not the whole service.
          </LearnMore>
          {errors.productiveDayValue ? <span className="error-text">{errors.productiveDayValue}</span> : null}
        </label>

        <label className={getFieldClassName(errors.coverPremiumPercent)}>
          <div className="field-head">
            <span className="field-label">Extra cost of covering lost time (%)</span>
            <span className="field-hint">How much more it usually costs to cover missed shifts</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="30"
            value={formData.coverPremiumPercent}
            onChange={(event) => onChange('coverPremiumPercent', event.target.value)}
            aria-invalid={Boolean(errors.coverPremiumPercent)}
          />
          <LearnMore>
            If cover, bank, or agency staffing costs more than normal, add that extra % here.
          </LearnMore>
          {errors.coverPremiumPercent ? <span className="error-text">{errors.coverPremiumPercent}</span> : null}
        </label>

        <label className={getFieldClassName(errors.disruptionCostPerDay)}>
          <div className="field-head">
            <span className="field-label">Cost of one day of service disruption</span>
            <span className="field-hint">A simple estimate of what one disrupted day costs</span>
          </div>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="1800"
            value={formData.disruptionCostPerDay}
            onChange={(event) => onChange('disruptionCostPerDay', event.target.value)}
            aria-invalid={Boolean(errors.disruptionCostPerDay)}
          />
          <LearnMore>
            This helps show how staffing instability can affect service flow, continuity, and cost.
          </LearnMore>
          {errors.disruptionCostPerDay ? <span className="error-text">{errors.disruptionCostPerDay}</span> : null}
        </label>

        <label className={getFieldClassName(errors.rotaSensitivity)}>
          <div className="field-head">
            <span className="field-label">How badly would staffing disruption affect the service?</span>
            <span className="field-hint">Choose how easily shortages could affect rotas, continuity, or patient flow</span>
          </div>
          <select
            value={formData.rotaSensitivity}
            onChange={(event) => onChange('rotaSensitivity', event.target.value)}
            aria-invalid={Boolean(errors.rotaSensitivity)}
          >
            <option value="">Select sensitivity</option>
            {ROTA_SENSITIVITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <LearnMore>
            Higher sensitivity means missed shifts are more likely to affect patient flow, continuity, and daily operations.
          </LearnMore>
          {errors.rotaSensitivity ? <span className="error-text">{errors.rotaSensitivity}</span> : null}
        </label>

        <div className="button-group">
          <button className="primary-button" type="submit">
            Calculate healthcare risk
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
