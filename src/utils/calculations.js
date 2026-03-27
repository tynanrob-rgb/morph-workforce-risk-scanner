export const siteProfileData = {
  'Main contractor': { dailySalary: 155, injuryCost: 11500, riskAdjustment: 0 },
  'Civils / infrastructure': { dailySalary: 165, injuryCost: 14000, riskAdjustment: 6 },
  'Fit-out / specialist trades': { dailySalary: 150, injuryCost: 10000, riskAdjustment: -4 },
};

const exposureScores = {
  low: 22,
  medium: 58,
  high: 88,
};

const supportPenalty = {
  yes: 18,
  no: 72,
};

const siteTypeAdjustment = {
  'New build': 0,
  Refurbishment: 8,
  Maintenance: 10,
  Demolition: 14,
};

const ukConstructionEvidence = [
  'Construction accounted for 35 worker fatalities in Great Britain in 2024/25, the highest of any main industry.',
  'Falls from height caused 35 worker deaths in 2024/25, making height exposure a major site risk factor.',
  'Work-related stress, depression or anxiety affected 964,000 workers in 2024/25 and drove 22.1 million days lost.',
  'CCS guidance says fatigue is a major risk and cites 80% of UK construction workers not getting sufficient good-quality sleep.',
];

function buildIntervention(riskBand, categoryScores, formData) {
  const recommendations = [];

  if (categoryScores.safety >= 70) {
    recommendations.push(
      'Prioritise movement-readiness, fatigue control, and targeted support for higher-risk site roles, especially around working at height.',
    );
  }

  if (categoryScores.productivity >= 60) {
    recommendations.push(
      'Use diagnostics and personalised health plans to address absence-related productivity drag and surface preventable issues earlier.',
    );
  }

  if (categoryScores.fatigue >= 60) {
    recommendations.push(
      'Introduce recovery coaching, fatigue awareness, and manager-level intervention for long shifts, travel, and schedule pressure.',
    );
  }

  if (formData.fatigueMonitoring === 'no') {
    recommendations.push(
      'Add a simple fatigue build-up measurement process so site teams can identify mounting strain before it contributes to judgement errors or musculoskeletal injury risk.',
    );
  }

  if (categoryScores.wellbeing >= 60) {
    recommendations.push(
      'Strengthen mental health support and baseline wellbeing screening so workers have a clear route into practical help.',
    );
  }

  if (formData.siteType === 'Refurbishment' || formData.siteType === 'Demolition') {
    recommendations.push(
      'Flag legacy building exposure in commercial conversations and position deeper health surveillance for higher-risk project types.',
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Use baseline diagnostics and proactive coaching to protect site performance before risks become more expensive.',
    );
  }

  const intros = {
    Low: 'This workforce appears relatively well controlled, with an opportunity to stay proactive.',
    Moderate: 'This workforce shows clear improvement opportunities across health, attendance, and operational resilience.',
    High: 'This profile suggests meaningful risk that is likely already affecting productivity and workforce stability.',
    Critical: 'This level of exposure warrants a more comprehensive intervention tied to leadership, retention, and risk reduction.',
  };

  return {
    title: {
      Low: 'Baseline diagnostics and prevention',
      Moderate: 'Personalised plans and coaching',
      High: 'Deeper intervention for site performance',
      Critical: 'Full diagnostics-led workforce strategy',
    }[riskBand],
    body: `${intros[riskBand]} ${recommendations.join(' ')}`,
    recommendations,
  };
}

function getTopRiskDrivers(categoryScores, formData) {
  const drivers = [
    {
      label: 'Safety and site exposure',
      score: categoryScores.safety,
      note:
        formData.workAtHeightExposure === 'high'
          ? 'High work-at-height exposure is amplifying site risk.'
          : 'Injury rate and site profile are shaping the safety signal.',
    },
    {
      label: 'Absence and productivity',
      score: categoryScores.productivity,
      note: 'Average sick days are influencing the productivity-loss estimate.',
    },
    {
      label: 'Fatigue and recovery',
      score: categoryScores.fatigue,
      note:
        formData.fatigueMonitoring === 'no'
          ? 'Fatigue build-up is not currently being measured, increasing the chance of hidden strain and musculoskeletal injury risk.'
          : formData.fatigueRisk === 'high'
            ? 'Long shifts, overtime, or travel pressure appear to be a material issue.'
            : 'Current fatigue conditions still affect site readiness and judgement.',
    },
    {
      label: 'Mental health and wellbeing',
      score: categoryScores.wellbeing,
      note:
        formData.mentalHealthSupport === 'no' || formData.wellbeingScreeningOffered === 'no'
          ? 'Support gaps may be leaving stress and hidden health issues untreated.'
          : 'Existing support is helping reduce the wellbeing risk signal.',
    },
  ];

  return drivers.sort((a, b) => b.score - a.score).slice(0, 3);
}

export function getInitialFormData() {
  return {
    workforceSize: '',
    siteProfile: '',
    siteType: '',
    injuryFrequency: '',
    absenteeism: '',
    workAtHeightExposure: '',
    fatigueRisk: '',
    fatigueMonitoring: '',
    mentalHealthSupport: '',
    wellbeingScreeningOffered: '',
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getAbsenteeismScore(absenteeism) {
  if (absenteeism <= 3) return 12;
  if (absenteeism <= 5) return 32;
  if (absenteeism <= 7) return 58;
  if (absenteeism <= 9) return 76;
  return 92;
}

export function getInjuryScore(injuryFrequency, workforceSize, siteProfile, workAtHeightExposure) {
  const injuryRate = workforceSize > 0 ? injuryFrequency / workforceSize : 0;
  const profileAdjustment = siteProfileData[siteProfile]?.riskAdjustment ?? 0;
  const heightAdjustment = Math.round((exposureScores[workAtHeightExposure] ?? 22) * 0.18);

  let baseScore = 10;

  if (injuryRate >= 0.01 && injuryRate <= 0.025) {
    baseScore = 34;
  } else if (injuryRate > 0.025 && injuryRate <= 0.05) {
    baseScore = 62;
  } else if (injuryRate > 0.05) {
    baseScore = 88;
  }

  return Math.max(0, Math.min(100, baseScore + profileAdjustment + heightAdjustment));
}

export function getRiskBand(riskScore) {
  if (riskScore <= 24) return 'Low';
  if (riskScore <= 49) return 'Moderate';
  if (riskScore <= 74) return 'High';
  return 'Critical';
}

export function calculateRiskResults(formData) {
  const workforceSize = Math.max(1, Number(formData.workforceSize) || 0);
  const injuryFrequency = Math.max(0, Number(formData.injuryFrequency) || 0);
  const absenteeism = Math.max(0, Number(formData.absenteeism) || 0);
  const selectedProfile =
    siteProfileData[formData.siteProfile] || siteProfileData['Main contractor'];

  const absenteeismCost = workforceSize * absenteeism * selectedProfile.dailySalary;
  const injuryCost = injuryFrequency * selectedProfile.injuryCost;
  const estimatedAnnualLoss = absenteeismCost + injuryCost;

  const absenteeismScore = getAbsenteeismScore(absenteeism);
  const fatigueMonitoringPenalty = formData.fatigueMonitoring === 'no' ? 12 : 0;
  const baseInjuryScore = getInjuryScore(
    injuryFrequency,
    workforceSize,
    formData.siteProfile,
    formData.workAtHeightExposure,
  );
  const injuryScore = Math.max(0, Math.min(100, baseInjuryScore + fatigueMonitoringPenalty));
  const fatigueScore = Math.max(
    0,
    Math.min(
      100,
      (exposureScores[formData.fatigueRisk] ?? 22) +
        Math.round((exposureScores[formData.workAtHeightExposure] ?? 22) * 0.15) +
        fatigueMonitoringPenalty,
    ),
  );
  const wellbeingScore = Math.max(
    0,
    Math.min(
      100,
      Math.round((supportPenalty[formData.mentalHealthSupport] ?? 72) * 0.55) +
        Math.round((supportPenalty[formData.wellbeingScreeningOffered] ?? 72) * 0.45) +
        (siteTypeAdjustment[formData.siteType] ?? 0),
    ),
  );

  const categoryScores = {
    safety: injuryScore,
    productivity: absenteeismScore,
    fatigue: fatigueScore,
    wellbeing: wellbeingScore,
  };

  const riskScore = Math.round(
    categoryScores.safety * 0.35 +
      categoryScores.productivity * 0.25 +
      categoryScores.fatigue * 0.2 +
      categoryScores.wellbeing * 0.2,
  );
  const riskBand = getRiskBand(riskScore);
  const intervention = buildIntervention(riskBand, categoryScores, formData);

  return {
    absenteeismCost,
    injuryCost,
    estimatedAnnualLoss,
    formattedAbsenteeismCost: formatCurrency(absenteeismCost),
    formattedInjuryCost: formatCurrency(injuryCost),
    formattedEstimatedAnnualLoss: formatCurrency(estimatedAnnualLoss),
    absenteeismScore,
    injuryScore,
    fatigueScore,
    wellbeingScore,
    riskScore,
    riskBand,
    interventionTitle: intervention.title,
    intervention: intervention.body,
    recommendations: intervention.recommendations,
    riskDrivers: getTopRiskDrivers(categoryScores, formData),
    ukConstructionEvidence,
  };
}
