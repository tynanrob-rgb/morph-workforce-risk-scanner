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

    if (!formData.fatigueMonitoring) {
      nextErrors.fatigueMonitoring =
        'Please indicate whether the company considers or measures fatigue build-up.';
    }

    if (!formData.mentalHealthSupport) {
      nextErrors.mentalHealthSupport = 'Please indicate whether a mental health support pathway exists.';
    }

    if (!formData.wellbeingScreeningOffered) {
      nextErrors.wellbeingScreeningOffered = 'Please indicate whether wellbeing screening is offered.';
    }

    if (formData.productiveDayValue === '') {
      nextErrors.productiveDayValue = 'Please enter the value of one productive worker day.';
    } else if (Number(formData.productiveDayValue) < 0) {
      nextErrors.productiveDayValue = 'Productive day value cannot be negative.';
    }

    if (formData.overtimePremiumPercent === '') {
      nextErrors.overtimePremiumPercent = 'Please enter the overtime or replacement premium.';
    } else if (Number(formData.overtimePremiumPercent) < 0) {
      nextErrors.overtimePremiumPercent = 'Overtime or replacement premium cannot be negative.';
    }

    if (formData.delayCostPerDay === '') {
      nextErrors.delayCostPerDay = 'Please enter the project delay cost per day.';
    } else if (Number(formData.delayCostPerDay) < 0) {
      nextErrors.delayCostPerDay = 'Project delay cost per day cannot be negative.';
    }

    if (!formData.criticalPathSensitivity) {
      nextErrors.criticalPathSensitivity =
        'Please select how sensitive the project is to labour disruption.';
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

      <section className="logic-panel">
        <div className="logic-copy">
          <p className="eyebrow">How the score works</p>
          <h2>Transparent weighting built for UK construction risk.</h2>
          <p>
            This score mixes safety, absence, fatigue, and support gaps. It helps start a smarter
            conversation. It does not replace full HR, claims, or HSE review.
          </p>
        </div>

        <div className="logic-grid">
          <article className="logic-card">
            <span className="logic-weight">35%</span>
            <h3>Safety and site exposure</h3>
            <p>Based on injuries, site type, and work at height.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> Construction had the most worker deaths in Great
              Britain in 2024/25. Falls from height were the biggest single cause.
            </p>
            <p className="logic-detail">
              <strong>How it is scored:</strong> More injuries and more work at height push this
              score up.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> It has the biggest weight because it is
              the most urgent risk on site.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">25%</span>
            <h3>Absence and productivity</h3>
            <p>Based on sick days and lost work time.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> Lost time is a big business cost. Mental health and
              muscle and joint problems drive many missed days.
            </p>
            <p className="logic-detail">
              <strong>How it is scored:</strong> More sick days push this score up.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> It matters a lot because missed work
              hurts delivery, labour cover, and cost.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">20%</span>
            <h3>Fatigue and recovery</h3>
            <p>Based on tiredness risk, work at height, and fatigue checks.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> CCS says fatigue is a major construction risk, and
              80% of UK construction workers are not getting enough good sleep.
            </p>
            <p className="logic-detail">
              <strong>How it is scored:</strong> This score goes up if people are more tired, work
              at height more often, or if fatigue is not being checked.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> Tired workers make more mistakes and
              can pick up more strain and injury, so this needs its own weight.
            </p>
          </article>

          <article className="logic-card">
            <span className="logic-weight">20%</span>
            <h3>Mental health and wellbeing support</h3>
            <p>Based on support in place for stress, health, and early checks.</p>
            <p className="logic-detail">
              <strong>Why it matters:</strong> Stress, depression, and anxiety are a big cause of
              ill health, and site standards now expect companies to support worker wellbeing.
            </p>
            <p className="logic-detail">
              <strong>How it is scored:</strong> This score goes up when support and screening are
              missing.
            </p>
            <p className="logic-detail">
              <strong>Why it is weighted this way:</strong> Better support helps people stay
              healthier, stay longer, and work better.
            </p>
          </article>
        </div>

        <div className="logic-note">
          <span className="metric-label">Evidence base used</span>
          <p>
            We used UK construction evidence from HSE, ONS, and CCS. That includes deaths, missed
            work days, mental health, and fatigue guidance.
          </p>
          <p>
            If a company does not check fatigue build-up, the scanner raises both fatigue risk and
            safety risk. That is because unmanaged tiredness can lead to poor decisions, hidden
            strain, and more muscle and joint injuries.
          </p>
          <details className="learn-more learn-more-deep">
            <summary>Learn more about the 10% fatigue improvement model</summary>
            <div className="deep-explainer">
              <p>
                The scanner can also show a simple opportunity view: what could change if fatigue
                improved by 10%.
              </p>
              <p>
                First, it reduces the fatigue score by 10%. Then it recalculates the full weighted
                risk score using the same category weights.
              </p>
              <p>
                Next, it estimates total days lost from workforce size x average sick days. It then
                assumes 20% of those lost days are linked to fatigue, recovery, and strain in this
                model.
              </p>
              <p>
                A 10% fatigue improvement is applied to that fatigue-linked slice to estimate days
                protected. Those days are then multiplied by the daily salary assumption for the
                chosen construction profile to estimate value protected.
              </p>
              <p>
                If commercial inputs are added, the scanner also estimates operational value
                protected, overtime or replacement cost pressure protected, and potential
                delay or disruption cost avoided.
              </p>
              <p>
                Those figures come from the productive day value, overtime premium, delay cost per
                day, and critical path sensitivity entered in the form.
              </p>
              <p>
                This is not a guaranteed saving. It is a directional way to show the possible
                upside of better fatigue management.
              </p>
            </div>
          </details>
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
          <h2>Use this construction risk estimate to open a broader wellbeing and performance conversation.</h2>
        </div>
        <a
          className="cta-button"
          href="https://morph.fit/construction"
          target="_blank"
          rel="noreferrer"
        >
          Book a Morph Construction Demo
        </a>
      </section>

      <section className="lead-panel">
        <div className="lead-copy">
          <p className="eyebrow">Book a demo</p>
          <h2>Want a fuller conversation with Morph?</h2>
          <p>
            Leave your details and then continue to the main construction page to explore how
            diagnostics, personalised health plans, and expert coaching can support your workforce.
          </p>
        </div>

        <form className="lead-form">
          <label className="field">
            <span className="field-label">Full name</span>
            <input type="text" placeholder="Jane Smith" />
          </label>

          <label className="field">
            <span className="field-label">Work email</span>
            <input type="email" placeholder="jane@company.com" />
          </label>

          <label className="field">
            <span className="field-label">Company</span>
            <input type="text" placeholder="Example Construction Ltd" />
          </label>

          <label className="field">
            <span className="field-label">What do you want help with?</span>
            <select defaultValue="">
              <option value="" disabled>
                Select focus
              </option>
              <option value="absence">Reducing absence and healthcare costs</option>
              <option value="safety">Improving site safety and workforce readiness</option>
              <option value="wellbeing">Building a stronger wellbeing programme</option>
              <option value="retention">Retention, culture, and engagement</option>
            </select>
          </label>

          <a
            className="primary-button lead-submit"
            href="https://morph.fit/construction"
            target="_blank"
            rel="noreferrer"
          >
            Continue to Morph Construction
          </a>
        </form>
      </section>
    </main>
  );
}

export default App;
