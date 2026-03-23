export const industryData = {
  Construction: { dailySalary: 140, injuryCost: 12000 },
  Logistics: { dailySalary: 125, injuryCost: 8500 },
  Healthcare: { dailySalary: 150, injuryCost: 7000 },
  'Office / Corporate': { dailySalary: 170, injuryCost: 3000 },
  Manufacturing: { dailySalary: 135, injuryCost: 9500 },
};

const interventions = {
  Low: 'Foundational Morph Performance Programme Focus: baseline screening, workforce education, habit improvement and preventative health insights.',
  Moderate:
    'Morph Performance + Functional Screening Focus: targeted pain, fatigue and movement risk reduction with clearer workforce monitoring.',
  High:
    'Morph Performance + Functional Screening + Blood Diagnostics Focus: deeper risk identification, absenteeism reduction and workforce performance intervention.',
  Critical:
    'Full Morph Workforce Health Intelligence Package Includes performance programme, functional screening, diagnostics, reporting dashboard and leadership review.',
};

export function getInitialFormData() {
  return {
    workforceSize: '',
    industry: '',
    injuryFrequency: '',
    absenteeism: '',
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
  if (absenteeism <= 3) return 10;
  if (absenteeism <= 6) return 35;
  if (absenteeism <= 9) return 65;
  return 90;
}

export function getInjuryScore(injuryFrequency, workforceSize) {
  const injuryRate = workforceSize > 0 ? injuryFrequency / workforceSize : 0;

  if (injuryRate < 0.01) return 10;
  if (injuryRate <= 0.03) return 35;
  if (injuryRate <= 0.06) return 65;
  return 90;
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
  const selectedIndustry = industryData[formData.industry] || industryData.Construction;

  const absenteeismCost = workforceSize * absenteeism * selectedIndustry.dailySalary;
  const injuryCost = injuryFrequency * selectedIndustry.injuryCost;
  const estimatedAnnualLoss = absenteeismCost + injuryCost;

  const absenteeismScore = getAbsenteeismScore(absenteeism);
  const injuryScore = getInjuryScore(injuryFrequency, workforceSize);
  const riskScore = Math.round(absenteeismScore * 0.4 + injuryScore * 0.6);
  const riskBand = getRiskBand(riskScore);

  return {
    absenteeismCost,
    injuryCost,
    estimatedAnnualLoss,
    formattedAbsenteeismCost: formatCurrency(absenteeismCost),
    formattedInjuryCost: formatCurrency(injuryCost),
    formattedEstimatedAnnualLoss: formatCurrency(estimatedAnnualLoss),
    absenteeismScore,
    injuryScore,
    riskScore,
    riskBand,
    intervention: interventions[riskBand],
  };
}
