export const settingData = {
  'Acute hospital': { dailySalary: 185, incidentCost: 5200, riskAdjustment: 6 },
  'Care home / residential care': { dailySalary: 145, incidentCost: 3400, riskAdjustment: 4 },
  'Community / domiciliary care': { dailySalary: 150, incidentCost: 3000, riskAdjustment: 2 },
  'Primary care / clinic': { dailySalary: 175, incidentCost: 2600, riskAdjustment: -2 },
};

export const HEALTHCARE_SCORE_WEIGHTS = {
  staffing: 0.3,
  fatigue: 0.25,
  msk: 0.25,
  wellbeing: 0.2,
};

const exposureScores = {
  low: 20,
  medium: 55,
  high: 85,
};

const supportPenalty = {
  yes: 18,
  no: 72,
};

const rotaSensitivityFactors = {
  Low: 0.05,
  Medium: 0.12,
  High: 0.2,
};

const ukHealthcareEvidence = [
  'NHS sickness absence is around 4.4% to 4.8%, roughly double the wider UK average.',
  'Musculoskeletal problems and mental health account for around 50% to 55% of NHS sickness absence.',
  'Around 44% to 46% of NHS staff report feeling unwell due to work-related stress.',
  'Around 14% to 15% of NHS staff report physical violence from patients or the public each year.',
  'Healthcare has one of the highest musculoskeletal disorder rates across UK sectors.',
  'Fatigue is linked to slower reaction times, reduced performance, and increased clinical error risk.',
  'Presenteeism is estimated to cost around 2 to 3 times more than sickness absence.',
  'Sharps injuries and biological exposures remain a live but often underreported risk.',
  'Retention pressure is strongly linked to stress, workload, fatigue, and burnout.',
];

const FATIGUE_IMPROVEMENT_RATE = 0.1;
const FATIGUE_LINKED_ABSENCE_SHARE = 0.22;
const MODIFIABLE_ABSENCE_SHARE = 0.525;
const PRESENTEEISM_MULTIPLIER = 2.5;

function buildIntervention(riskBand, categoryScores, formData) {
  const recommendations = [];

  if (categoryScores.staffing >= 70) {
    recommendations.push(
      'Stabilise staffing resilience with better fatigue support, absence prevention, and reduced reliance on reactive cover.',
    );
  }

  if (categoryScores.msk >= 60) {
    recommendations.push(
      'Prioritise musculoskeletal prevention through movement support, ergonomic review, and targeted recovery guidance.',
    );
  }

  if (categoryScores.fatigue >= 60) {
    recommendations.push(
      'Strengthen fatigue management around long shifts, nights, rota pressure, and recovery time between duties.',
    );
  }

  if (formData.fatigueMonitoring === 'no') {
    recommendations.push(
      'Introduce a simple fatigue check process so hidden strain is spotted earlier and high-risk rota pressure is easier to manage.',
    );
  }

  if (categoryScores.wellbeing >= 60) {
    recommendations.push(
      'Improve wellbeing support with clearer mental health pathways, earlier screening, and practical support for burnout risk.',
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Use baseline diagnostics and proactive workforce wellbeing support to protect care quality before pressure builds further.',
    );
  }

  const intros = {
    Low: 'This workforce looks relatively stable, with room to stay proactive.',
    Moderate:
      'This healthcare workforce shows clear opportunities to improve resilience, absence, and staff wellbeing.',
    High:
      'This profile suggests meaningful workforce strain that is likely affecting staffing pressure, recovery, and service continuity.',
    Critical:
      'This level of exposure supports a broader intervention tied to staffing resilience, retention, and quality of care.',
  };

  return {
    title: {
      Low: 'Baseline prevention and wellbeing support',
      Moderate: 'Targeted fatigue and wellbeing support',
      High: 'Deeper workforce resilience intervention',
      Critical: 'Full workforce health and resilience strategy',
    }[riskBand],
    body: `${intros[riskBand]} ${recommendations.join(' ')}`,
    recommendations,
  };
}

function getTopRiskDrivers(categoryScores, formData) {
  const drivers = [
    {
      label: 'Staffing and absence pressure',
      score: categoryScores.staffing,
      note:
        formData.agencyReliance === 'high'
          ? 'High reliance on agency or temporary cover is increasing staffing pressure.'
          : 'Sick days and rota pressure are driving the staffing risk signal.',
    },
    {
      label: 'Fatigue and recovery',
      score: categoryScores.fatigue,
      note:
        formData.fatigueMonitoring === 'no'
          ? 'Fatigue is not currently being tracked, increasing the chance of hidden exhaustion and poorer decisions.'
          : formData.shiftPressure === 'high'
            ? 'Long shifts, night work, or rota pressure appear to be a material issue.'
            : 'Current fatigue conditions still affect judgement, recovery, and care quality.',
    },
    {
      label: 'MSK and manual handling',
      score: categoryScores.msk,
      note:
        formData.manualHandlingExposure === 'high'
          ? 'Frequent lifting, repositioning, or repeated physical strain is raising musculoskeletal risk.'
          : 'Physical strain exposure is shaping the MSK risk signal.',
    },
    {
      label: 'Mental health and support',
      score: categoryScores.wellbeing,
      note:
        formData.mentalHealthSupport === 'no' || formData.wellbeingScreeningOffered === 'no'
          ? 'Support gaps may be leaving burnout, stress, and hidden health issues untreated.'
          : 'Existing support is helping reduce the wellbeing risk signal.',
    },
  ];

  return drivers.sort((a, b) => b.score - a.score).slice(0, 3);
}

export function getInitialFormData() {
  return {
    workforceSize: '',
    locationsIncluded: '',
    careSetting: '',
    sicknessDays: '',
    staffingIncidents: '',
    shiftPressure: '',
    manualHandlingExposure: '',
    fatigueMonitoring: '',
    mentalHealthSupport: '',
    wellbeingScreeningOffered: '',
    agencyReliance: '',
    productiveDayValue: '',
    coverPremiumPercent: '',
    disruptionCostPerDay: '',
    rotaSensitivity: '',
  };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getAbsenceScore(sicknessDays) {
  if (sicknessDays <= 4) return 18;
  if (sicknessDays <= 6) return 36;
  if (sicknessDays <= 8) return 60;
  if (sicknessDays <= 10) return 78;
  return 92;
}

export function getStaffingIncidentScore(staffingIncidents, workforceSize, careSetting, agencyReliance) {
  const incidentRate = workforceSize > 0 ? staffingIncidents / workforceSize : 0;
  const settingAdjustment = settingData[careSetting]?.riskAdjustment ?? 0;
  const agencyAdjustment = Math.round((exposureScores[agencyReliance] ?? 20) * 0.15);

  let baseScore = 10;

  if (incidentRate >= 0.02 && incidentRate <= 0.05) {
    baseScore = 36;
  } else if (incidentRate > 0.05 && incidentRate <= 0.1) {
    baseScore = 64;
  } else if (incidentRate > 0.1) {
    baseScore = 88;
  }

  return Math.max(0, Math.min(100, baseScore + settingAdjustment + agencyAdjustment));
}

export function getRiskBand(riskScore) {
  if (riskScore <= 24) return 'Low';
  if (riskScore <= 49) return 'Moderate';
  if (riskScore <= 74) return 'High';
  return 'Critical';
}

export function calculateRiskResults(formData) {
  const workforceSize = Math.max(1, Number(formData.workforceSize) || 0);
  const locationsIncluded = Math.max(1, Number(formData.locationsIncluded) || 0);
  const sicknessDays = Math.max(0, Number(formData.sicknessDays) || 0);
  const staffingIncidents = Math.max(0, Number(formData.staffingIncidents) || 0);
  const productiveDayValue = Math.max(0, Number(formData.productiveDayValue) || 0);
  const coverPremiumPercent = Math.max(0, Number(formData.coverPremiumPercent) || 0);
  const disruptionCostPerDay = Math.max(0, Number(formData.disruptionCostPerDay) || 0);
  const selectedSetting = settingData[formData.careSetting] || settingData['Acute hospital'];

  const absenceCost = workforceSize * sicknessDays * selectedSetting.dailySalary;
  const staffingPressureCost = staffingIncidents * selectedSetting.incidentCost;
  const estimatedAnnualLoss = absenceCost + staffingPressureCost;
  const modifiableAbsenceCost = absenceCost * MODIFIABLE_ABSENCE_SHARE;
  const presenteeismPressureCost = absenceCost * PRESENTEEISM_MULTIPLIER;

  const absenceScore = getAbsenceScore(sicknessDays);
  const fatigueMonitoringPenalty = formData.fatigueMonitoring === 'no' ? 12 : 0;
  const staffingScore = getStaffingIncidentScore(
    staffingIncidents,
    workforceSize,
    formData.careSetting,
    formData.agencyReliance,
  );
  const fatigueScore = Math.max(
    0,
    Math.min(
      100,
      (exposureScores[formData.shiftPressure] ?? 20) +
        Math.round((exposureScores[formData.agencyReliance] ?? 20) * 0.12) +
        fatigueMonitoringPenalty,
    ),
  );
  const mskScore = Math.max(
    0,
    Math.min(
      100,
      (exposureScores[formData.manualHandlingExposure] ?? 20) +
        Math.round((exposureScores[formData.shiftPressure] ?? 20) * 0.1),
    ),
  );
  const wellbeingScore = Math.max(
    0,
    Math.min(
      100,
      Math.round((supportPenalty[formData.mentalHealthSupport] ?? 72) * 0.55) +
        Math.round((supportPenalty[formData.wellbeingScreeningOffered] ?? 72) * 0.45),
    ),
  );

  const categoryScores = {
    staffing: Math.round(staffingScore * 0.55 + absenceScore * 0.45),
    fatigue: fatigueScore,
    msk: mskScore,
    wellbeing: wellbeingScore,
  };

  const riskScore = Math.round(
    categoryScores.staffing * HEALTHCARE_SCORE_WEIGHTS.staffing +
      categoryScores.fatigue * HEALTHCARE_SCORE_WEIGHTS.fatigue +
      categoryScores.msk * HEALTHCARE_SCORE_WEIGHTS.msk +
      categoryScores.wellbeing * HEALTHCARE_SCORE_WEIGHTS.wellbeing,
  );
  const riskBand = getRiskBand(riskScore);
  const intervention = buildIntervention(riskBand, categoryScores, formData);

  const improvedFatigueScore = Math.max(0, Math.round(fatigueScore * (1 - FATIGUE_IMPROVEMENT_RATE)));
  const improvedRiskScore = Math.round(
    categoryScores.staffing * HEALTHCARE_SCORE_WEIGHTS.staffing +
      improvedFatigueScore * HEALTHCARE_SCORE_WEIGHTS.fatigue +
      categoryScores.msk * HEALTHCARE_SCORE_WEIGHTS.msk +
      categoryScores.wellbeing * HEALTHCARE_SCORE_WEIGHTS.wellbeing,
  );
  const riskReduction = Math.max(0, riskScore - improvedRiskScore);
  const totalDaysLost = workforceSize * sicknessDays;
  const fatigueLinkedDays = totalDaysLost * FATIGUE_LINKED_ABSENCE_SHARE;
  const protectedDays = Math.round(fatigueLinkedDays * FATIGUE_IMPROVEMENT_RATE);
  const protectedValue = protectedDays * selectedSetting.dailySalary;
  const operationalValueProtected = protectedDays * productiveDayValue;
  const coverCostProtected =
    protectedDays * selectedSetting.dailySalary * (coverPremiumPercent / 100);
  const disruptionDaysAvoided =
    protectedDays * (rotaSensitivityFactors[formData.rotaSensitivity] ?? 0);
  const disruptionCostAvoided = disruptionDaysAvoided * disruptionCostPerDay;

  return {
    locationsIncluded,
    absenceCost,
    staffingPressureCost,
    estimatedAnnualLoss,
    modifiableAbsenceCost,
    presenteeismPressureCost,
    formattedAbsenceCost: formatCurrency(absenceCost),
    formattedStaffingPressureCost: formatCurrency(staffingPressureCost),
    formattedEstimatedAnnualLoss: formatCurrency(estimatedAnnualLoss),
    formattedModifiableAbsenceCost: formatCurrency(modifiableAbsenceCost),
    formattedPresenteeismPressureCost: formatCurrency(presenteeismPressureCost),
    absenceScore,
    staffingScore: categoryScores.staffing,
    fatigueScore,
    mskScore,
    wellbeingScore,
    riskScore,
    riskBand,
    interventionTitle: intervention.title,
    intervention: intervention.body,
    recommendations: intervention.recommendations,
    riskDrivers: getTopRiskDrivers(categoryScores, formData),
    ukHealthcareEvidence,
    improvedFatigueScore,
    improvedRiskScore,
    riskReduction,
    totalDaysLost,
    fatigueLinkedDays,
    protectedDays,
    protectedValue,
    formattedProtectedValue: formatCurrency(protectedValue),
    protectedValuePerDay: selectedSetting.dailySalary,
    formattedProtectedValuePerDay: formatCurrency(selectedSetting.dailySalary),
    operationalValueProtected,
    formattedOperationalValueProtected: formatCurrency(operationalValueProtected),
    coverCostProtected,
    formattedCoverCostProtected: formatCurrency(coverCostProtected),
    disruptionDaysAvoided,
    disruptionCostAvoided,
    formattedDisruptionCostAvoided: formatCurrency(disruptionCostAvoided),
    formattedProductiveDayValue: formatCurrency(productiveDayValue),
    coverPremiumPercent,
    formattedDisruptionCostPerDay: formatCurrency(disruptionCostPerDay),
    rotaSensitivity: formData.rotaSensitivity,
    rotaSensitivityFactor: rotaSensitivityFactors[formData.rotaSensitivity] ?? 0,
    fatigueImprovementRate: FATIGUE_IMPROVEMENT_RATE,
    fatigueLinkedAbsenceShare: FATIGUE_LINKED_ABSENCE_SHARE,
    modifiableAbsenceShare: MODIFIABLE_ABSENCE_SHARE,
    presenteeismMultiplier: PRESENTEEISM_MULTIPLIER,
  };
}
