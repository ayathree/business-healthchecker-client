const mainStrengthTotal = 15;

// Generate strength advice based on metrics ONLY
function generateStrengthAdvice(metricName, value, numericValue = null) {
  const adviceTemplates = {
    'employeeCount': {
      3: "Strong team size! Excellent workforce capacity for growth and operations.",
      2: "Good team size. Consider strategic hiring for scaling opportunities.",
      1: "Limited team size. Focus on optimal staffing for current operations.",
      0: "Minimal workforce. Critical to build core team for business stability."
    },
    'employeeSkills': {
      3: "Exceptional team skills! Highly skilled workforce drives innovation and efficiency.",
      2: "Good skill levels. Invest in training and development for competitive advantage.",
      1: "Skill development needed. Prioritize training and skill enhancement programs.",
      0: "Significant skill gaps. Urgent need for training and talent development."
    },
    'operationalResilience': {
      3: "Excellent operational resilience! Business can run smoothly without you.",
      1: "Moderate operational stability. Can run to some extent without you.",
      0: "Critical operational risks. Organization would struggle without you."
    },
    'marketingPlan': {
      3: "Strong marketing strategy! Everything follows a comprehensive plan.",
      1: "Basic marketing approach. Some planning but needs more structure.",
      0: "No marketing plan. Essential to develop customer acquisition strategy."
    },
    'softwareUsage': {
      3: "Excellent technology adoption! Software tools enhance efficiency.",
      0: "No software usage. Critical to adopt technology for growth."
    }
  };

  let message = '';
  let performance = '';

  switch (metricName) {
    case 'employeeCount':
      message = adviceTemplates.employeeCount[value];
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      if (numericValue !== null) message += ` (${numericValue} employees)`;
      break;
      
    case 'employeeSkills':
      message = adviceTemplates.employeeSkills[value];
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      if (numericValue !== null) message += ` (Skill level: ${numericValue}/10)`;
      break;
      
    case 'operationalResilience':
      message = adviceTemplates.operationalResilience[value];
      performance = value === 3 ? 'high' : value === 1 ? 'medium' : 'none';
      break;
      
    case 'marketingPlan':
      message = adviceTemplates.marketingPlan[value];
      performance = value === 3 ? 'high' : value === 1 ? 'medium' : 'none';
      break;
      
    case 'softwareUsage':
      message = adviceTemplates.softwareUsage[value];
      performance = value === 3 ? 'high' : 'none';
      break;
      
    default:
      message = "Organizational strength assessment completed.";
  }

  return {
    message: message,
    performance: performance,
    value: value,
    numericValue: numericValue
  };
}

// Optimized strength analysis
export function calculateStrengthScores(responses) {
  const scores = {
    employeeCount: 0,
    employeeSkills: 0,
    operationalResilience: 0,
    marketingPlan: 0,
    softwareUsage: 0,
    totalStrengthPoints: 0,
    percentage: 0
  };

  const advice = {};

  // 5.1 Employee Count Scoring
  const employeeCount = parseInt(responses.employeeCount) || 0;
  if (employeeCount >= 20) scores.employeeCount = 3;
  else if (employeeCount >= 10) scores.employeeCount = 2;
  else if (employeeCount >= 2) scores.employeeCount = 1;
  advice.employeeCount = generateStrengthAdvice('employeeCount', scores.employeeCount, employeeCount);

  // 5.2 Skill Level Scoring
  const skillLevel = parseInt(responses.skillLevel) || 0;
  if (skillLevel >= 8) scores.employeeSkills = 3;
  else if (skillLevel >= 6) scores.employeeSkills = 2;
  else if (skillLevel >= 4) scores.employeeSkills = 1;
  advice.employeeSkills = generateStrengthAdvice('employeeSkills', scores.employeeSkills, skillLevel);

  // 5.3 Operational Resilience Scoring
  if (responses.operationalResilience === "yes") scores.operationalResilience = 3;
  else if (responses.operationalResilience === "somewhat") scores.operationalResilience = 1;
  advice.operationalResilience = generateStrengthAdvice('operationalResilience', scores.operationalResilience);

  // 5.4 Marketing Plan Scoring
  if (responses.marketingPlan === "yes") scores.marketingPlan = 3;
  else if (responses.marketingPlan === "no") scores.marketingPlan = 1;
  advice.marketingPlan = generateStrengthAdvice('marketingPlan', scores.marketingPlan);

  // 5.5 Software Usage Scoring
  scores.softwareUsage = responses.usesSoftware === "yes" ? 3 : 0;
  advice.softwareUsage = generateStrengthAdvice('softwareUsage', scores.softwareUsage);

  // Calculate totals
  const totalStrengthPoints = scores.employeeCount + scores.employeeSkills + 
                             scores.operationalResilience + scores.marketingPlan + 
                             scores.softwareUsage;
  
  scores.percentage = Math.round((totalStrengthPoints / mainStrengthTotal) * 100);
  scores.totalStrengthPoints = totalStrengthPoints;
  scores.advice = advice;

  return {
    ...scores, 
    mainStrengthTotal,
    performanceLevel: getPerformanceLevel(scores.percentage)
  };
}

// Performance level utility
function getPerformanceLevel(percentage) {
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Average';
  return 'Needs Improvement';
}

// Quick organizational analysis
export function analyzeOrganizationalStrength(scores) {
  const strengths = [];
  const improvements = [];

  if (scores.employeeCount >= 2) strengths.push("Adequate team size");
  else improvements.push("Increase team size");

  if (scores.employeeSkills >= 2) strengths.push("Skilled workforce");
  else improvements.push("Improve team skills");

  if (scores.operationalResilience === 3) strengths.push("Strong operational resilience");
  else improvements.push("Build operational resilience");

  if (scores.marketingPlan >= 2) strengths.push("Strategic marketing approach");
  else improvements.push("Develop marketing strategy");

  if (scores.softwareUsage === 3) strengths.push("Good technology adoption");
  else improvements.push("Implement software solutions");

  return {
    strengths,
    improvements,
    overallScore: scores.percentage,
    recommendation: strengths.length >= 3 ? 
      "Strong organizational foundation. Focus on growth." :
      "Build core organizational capabilities first."
  };
}