import { useState } from 'react';
import RiskForm from './components/RiskForm';
import ResultsCard from './components/ResultsCard';
import { calculateRiskResults, getInitialFormData } from './utils/calculations';

const impactStats = [
  { value: '76%', label: 'Improved health metrics in sleep, stress management, and lifestyle habits' },
  { value: '77%', label: 'Stayed engaged with Morph, outperforming typical health programme retention' },
  { value: '83%', label: 'Improved lung and core function, supporting stamina and site readiness' },
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

    if (!formData.siteProfile) {
      nextErrors.siteProfile = 'Please select a construction profile.';
    }

    if (!formData.siteType) {
      nextErrors.siteType = 'Please select a site type.';
    }

    if (formData.injuryFrequency === '') {
      nextErrors.injuryFrequency = 'Reportable injuries are required.';
    } else if (Number(formData.injuryFrequency) < 0) {
      nextErrors.injuryFrequency = 'Reportable injuries cannot be negative.';
    }

    if (formData.absenteeism === '') {
      nextErrors.absenteeism = 'Average sick days are required.';
    } else if (Number(formData.absenteeism) < 0) {
      nextErrors.absenteeism = 'Average sick days cannot be negative.';
    }

    if (!formData.workAtHeightExposure) {
      nextErrors.workAtHeightExposure = 'Please select a work-at-height exposure level.';
    }

    if (!formData.fatigueRisk) {
      nextErrors.fatigueRisk = 'Please select a fatigue risk level.';
    }

    if (!formData.mentalHealthSupport) {
      nextErrors.mentalHealthSupport = 'Please indicate whether a mental health support pathway exists.';
    }

    if (!formData.wellbeingScreeningOffered) {
      nextErrors.wellbeingScreeningOffered = 'Please indicate whether wellbeing screening is offered.';
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

  const handleApplyScenario = (scenario) => {
    setFormData(scenario);
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
            <div className="brand-mark" aria-hidden="true">
              <span className="brand-loop brand-loop-left" />
              <span className="brand-loop brand-loop-right" />
            </div>
            <div>
              <p className="brand-wordmark">MORPH</p>
              <p className="brand-subtitle">Construction workforce intelligence</p>
            </div>
          </div>

          <span className="hero-badge">Construction-focused demo</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy-block">
            <p className="eyebrow">Morph Construction Risk Scanner</p>
            <h1>Healthy site teams. Stronger project delivery.</h1>
            <p className="hero-copy">
              We combine in-depth diagnostics, tailored health plans, expert coaching, and a
              seamless digital experience to help construction businesses reduce risk, improve
              productivity, and strengthen retention.
            </p>

            <div className="hero-chips">
              <span className="info-chip">Boost productivity</span>
              <span className="info-chip">Reduce absenteeism</span>
              <span className="info-chip">Improve retention and culture</span>
            </div>
          </div>

          <div className="hero-side-panel">
            <span className="side-label">Powered by science, delivered with care</span>
            <ul className="hero-points">
              <li>Metabolic and cardiovascular health</li>
              <li>Hormones and vitamin levels</li>
              <li>Movement patterns, stress, and cognitive function</li>
              <li>Microbiome and biological age insights</li>
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

      <section className="content-grid">
        <RiskForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          onApplyScenario={handleApplyScenario}
        />
        <ResultsCard results={results} />
      </section>

      <section className="cta-panel">
        <div className="cta-copy">
          <p className="eyebrow">Next step</p>
          <h2>Use this construction risk estimate to open a broader wellbeing and performance conversation.</h2>
        </div>
        <button className="cta-button" type="button">
          Book a Morph Construction Demo
        </button>
      </section>
    </main>
  );
}

export default App;
