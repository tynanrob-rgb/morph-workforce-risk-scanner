import { useState } from 'react';
import RiskForm from './components/RiskForm';
import ResultsCard from './components/ResultsCard';
import {
  calculateRiskResults,
  getInitialFormData,
  HEALTHCARE_SCORE_WEIGHTS,
} from './utils/calculations';

const impactStats = [
  { value: '2x', label: 'NHS sickness absence runs at roughly double the wider UK average.' },
  { value: '50%+', label: 'MSK and mental health drive around half of NHS sickness absence.' },
  { value: '44%+', label: 'Large numbers of staff report feeling unwell because of work-related stress.' },
  { value: '2-3x', label: 'Presenteeism is estimated to cost 2 to 3 times more than sickness absence.' },
];

function App() {
  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (formData.workforceSize === '') {
      nextErrors.workforceSize = 'Workforce size is required.';
    } else if (Number(formData.workforceSize) < 1) {
      nextErrors.workforceSize = 'Workforce size must be at least 1.';
    }

    if (formData.locationsIncluded === '') {
      nextErrors.locationsIncluded = 'Please enter how many locations are included.';
    } else if (Number(formData.locationsIncluded) < 1) {
      nextErrors.locationsIncluded = 'Locations included must be at least 1.';
    }

    if (!formData.careSetting) {
      nextErrors.careSetting = 'Please select a care setting.';
    }

    if (formData.sicknessDays === '') {
      nextErrors.sicknessDays = 'Average sickness days are required.';
    } else if (Number(formData.sicknessDays) < 0) {
      nextErrors.sicknessDays = 'Average sickness days cannot be negative.';
    }

    if (formData.staffingIncidents === '') {
      nextErrors.staffingIncidents = 'Staffing incidents are required.';
    } else if (Number(formData.staffingIncidents) < 0) {
      nextErrors.staffingIncidents = 'Staffing incidents cannot be negative.';
    }

    if (!formData.shiftPressure) {
      nextErrors.shiftPressure = 'Please select a shift pressure level.';
    }

    if (!formData.manualHandlingExposure) {
      nextErrors.manualHandlingExposure = 'Please select a manual handling exposure level.';
    }

    if (!formData.fatigueMonitoring) {
      nextErrors.fatigueMonitoring =
        'Please indicate whether the organisation considers or measures fatigue build-up.';
    }

    if (!formData.mentalHealthSupport) {
      nextErrors.mentalHealthSupport = 'Please indicate whether a mental health support pathway exists.';
    }

    if (!formData.wellbeingScreeningOffered) {
      nextErrors.wellbeingScreeningOffered = 'Please indicate whether wellbeing screening is offered.';
    }

    if (!formData.agencyReliance) {
      nextErrors.agencyReliance = 'Please select an agency or temporary staffing level.';
    }

    if (formData.productiveDayValue === '') {
      nextErrors.productiveDayValue = 'Please enter the value of one good staff day.';
    } else if (Number(formData.productiveDayValue) < 0) {
      nextErrors.productiveDayValue = 'Good staff day value cannot be negative.';
    }

    if (formData.coverPremiumPercent === '') {
      nextErrors.coverPremiumPercent = 'Please enter the extra cover premium.';
    } else if (Number(formData.coverPremiumPercent) < 0) {
      nextErrors.coverPremiumPercent = 'Extra cover premium cannot be negative.';
    }

    if (formData.disruptionCostPerDay === '') {
      nextErrors.disruptionCostPerDay = 'Please enter the service disruption cost per day.';
    } else if (Number(formData.disruptionCostPerDay) < 0) {
      nextErrors.disruptionCostPerDay = 'Service disruption cost per day cannot be negative.';
    }

    if (!formData.rotaSensitivity) {
      nextErrors.rotaSensitivity = 'Please select how sensitive the service is to staffing disruption.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setResults(null);
      return;
    }

    setResults(calculateRiskResults(formData));
  };

  const handleReset = () => {
    setFormData(getInitialFormData());
    setErrors({});
    setResults(null);
  };

  return (
    <main className="page-shell construction-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="hero-card construction-hero">
        <div className="hero-topline">
          <div className="brand-lockup" aria-label="Morph">
            <div>
              <p className="brand-wordmark">MORPH</p>
              <p className="brand-subtitle">Healthcare workforce intelligence</p>
            </div>
          </div>

          <span className="hero-badge">Healthcare-focused demo</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy-block">
            <p className="eyebrow">Morph Healthcare Risk Scanner</p>
            <h1>Healthier teams. Safer care. Stronger staffing resilience.</h1>
            <p className="hero-copy">
              We combine diagnostics, tailored health support, coaching, and practical workforce
              insight to help healthcare organisations reduce burnout risk, lower avoidable
              absence, improve staff resilience, and protect continuity of care.
            </p>

            <div className="hero-chips">
              <span className="info-chip">Reduce absence pressure</span>
              <span className="info-chip">Support retention</span>
              <span className="info-chip">Protect care quality</span>
            </div>
          </div>

          <div className="hero-side-panel">
            <span className="side-label">Powered by science, delivered with care</span>
            <ul className="hero-points">
              <li>Fatigue and recovery support</li>
              <li>Musculoskeletal and movement health</li>
              <li>Stress, burnout, and mental wellbeing</li>
              <li>Workforce resilience, retention, and practical prevention</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        {impactStats.map((stat) => (
          <article className="stat-card" key={stat.value}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="logic-panel">
        <div className="logic-copy">
          <p className="eyebrow">How the score works</p>
          <h2>Transparent weighting built for healthcare workforce risk.</h2>
          <p>
            This score mixes staffing pressure, fatigue, musculoskeletal risk, and wellbeing support
            gaps. It is a directional decision tool for healthcare leaders, not a replacement for
            HR, governance, or clinical safety review.
          </p>
        </div>

        <div className="logic-grid">
          <article className="logic-card">
            <span className="logic-weight">{Math.round(HEALTHCARE_SCORE_WEIGHTS.staffing * 100)}%</span>
            <h3>Staffing and absence pressure</h3>
            <p>Based on sickness days, staffing incidents, and agency reliance.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> NHS absence rates run at roughly double the wider UK average, and rotas can become fragile very quickly when services already run tight.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> This has the biggest weight because it hits care delivery first. When people are off, the service feels it straight away.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">{Math.round(HEALTHCARE_SCORE_WEIGHTS.fatigue * 100)}%</span>
            <h3>Fatigue and recovery</h3>
            <p>Based on shift pressure, agency reliance, and whether fatigue is actively monitored.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> NHS guidance links fatigue to slower reaction times, weaker performance, and greater clinical error risk.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> Fatigue gets a large weight because tired staff are more likely to make mistakes, struggle to recover, and need more time off.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">{Math.round(HEALTHCARE_SCORE_WEIGHTS.msk * 100)}%</span>
            <h3>MSK and manual handling</h3>
            <p>Based on physical strain, patient movement, and repeated manual handling exposure.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> Musculoskeletal problems are one of the biggest drivers of sickness absence across healthcare, especially where lifting and repositioning are common.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> MSK is weighted strongly because it is common, costly, and closely linked to capacity lost on the floor.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">{Math.round(HEALTHCARE_SCORE_WEIGHTS.wellbeing * 100)}%</span>
            <h3>Mental health and wellbeing support</h3>
            <p>Based on support pathways, screening, and how early problems are picked up.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> Large numbers of staff report work-related stress, and retention problems are strongly linked to burnout and overload.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> This sits slightly lower because it often shows up through fatigue, absence, and staffing pressure too, but it still needs a clear place in the model.
            </p>
          </article>
        </div>

        <div className="logic-note">
          <span className="metric-label">Evidence base used</span>
          <p>
            The weighting is informed by UK healthcare workforce evidence: NHS sickness absence,
            stress and burnout data, fatigue and patient-safety guidance, musculoskeletal strain,
            violence risk, underreported clinical exposure risk, and temporary staffing pressure.
          </p>
          <p>
            We also show the share of absence linked to conditions that can be actively reduced,
            because MSK and mental health account for roughly 50% to 55% of NHS absence. That is
            why the model highlights modifiable absence pressure, not just total absence.
          </p>
          <p>
            The opportunity model then shows what could change if fatigue improved by 10%. It is a
            directional estimate designed to show possible staffing, service, and operational upside.
          </p>
          <p>
            Boardroom view: over half of workforce absence is driven by conditions that can be
            actively reduced, yet many organisations still do not manage them at scale.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <RiskForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
        <ResultsCard results={results} />
      </section>
    </main>
  );
}

export default App;
