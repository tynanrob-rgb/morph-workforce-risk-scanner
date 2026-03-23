import { useState } from 'react';
import RiskForm from './components/RiskForm';
import ResultsCard from './components/ResultsCard';
import { calculateRiskResults, getInitialFormData } from './utils/calculations';

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

    if (!formData.industry) {
      nextErrors.industry = 'Please select an industry.';
    }

    if (formData.injuryFrequency === '') {
      nextErrors.injuryFrequency = 'Injury frequency is required.';
    } else if (Number(formData.injuryFrequency) < 0) {
      nextErrors.injuryFrequency = 'Injury frequency cannot be negative.';
    }

    if (formData.absenteeism === '') {
      nextErrors.absenteeism = 'Absenteeism is required.';
    } else if (Number(formData.absenteeism) < 0) {
      nextErrors.absenteeism = 'Absenteeism cannot be negative.';
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
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="hero-card">
        <div className="hero-topline">
          <p className="eyebrow">Morph Workforce Risk Scanner</p>
          <span className="hero-badge">Local demo</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy-block">
            <h1>Turn workforce risk into a boardroom-ready number.</h1>
            <p className="hero-copy">
              Estimate absenteeism and injury-related cost exposure in a clean, investor-friendly
              local demo built for fast scenario testing.
            </p>

            <div className="hero-chips">
              <span className="info-chip">No backend</span>
              <span className="info-chip">Instant calculation</span>
              <span className="info-chip">Executive-ready output</span>
            </div>
          </div>

          <div className="hero-side-panel">
            <span className="side-label">What this demo shows</span>
            <ul className="hero-points">
              <li>Estimated annual loss</li>
              <li>Weighted risk score and band</li>
              <li>Suggested Morph intervention path</li>
            </ul>
          </div>
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

      <section className="cta-panel">
        <div className="cta-copy">
          <p className="eyebrow">Next step</p>
          <h2>Use this scan as the starting point for a deeper workforce performance conversation.</h2>
        </div>
        <button className="cta-button" type="button">
          Book a Morph Demo
        </button>
      </section>
    </main>
  );
}

export default App;
