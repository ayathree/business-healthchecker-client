const mainBloodTestTotal = 30;

// Financial scoring thresholds and advice templates
const financialMetrics = {
  avgMonthlyRevenue: {
    thresholds: [50000, 100000, 200000], // 0-50k, 50k-100k, 100k-200k, 200k+
    advice: {
      3: "Excellent revenue! Strong monthly sales indicate healthy business growth.",
      2: "Good revenue stream. Consistent monthly income supports business stability.",
      1: "Moderate revenue. Focus on sales strategies to increase monthly income.",
      0: "Low revenue. Urgent need to develop customer acquisition and sales channels."
    }
  },
  grossProfitMargin: {
    thresholds: [15, 25, 35], // 0-15%, 15-25%, 25-35%, 35%+
    advice: {
      3: "Outstanding profit margin! Highly efficient operations and pricing strategy.",
      2: "Good profit margin. Healthy business with sustainable profitability.",
      1: "Moderate profit margin. Review costs and pricing for better margins.",
      0: "Low profit margin. Critical to optimize costs and improve pricing strategy."
    }
  },
  monthlyFixedCost: {
    thresholds: [50000, 100000, 200000], // Cost levels
    advice: {
      3: "Well-managed fixed costs! Efficient cost structure supports profitability.",
      2: "Reasonable fixed costs. Good balance between expenses and operations.",
      1: "Moderate fixed costs. Review expenses for optimization opportunities.",
      0: "High fixed costs. Urgent need to optimize operational expenses."
    }
  },
  loanManagement: {
    thresholds: [0, 0.2, 0.4], // Debt-to-revenue ratio
    advice: {
      3: "Excellent debt management! Minimal loans or well-managed debt structure.",
      2: "Good loan management. Manageable debt with proper financial planning.",
      1: "Moderate debt load. Monitor loan obligations carefully.",
      0: "High debt concern. Critical to review and manage loan commitments."
    }
  },
  ownerSalary: {
    thresholds: [10000, 20000, 30000], // Salary levels
    advice: {
      3: "Reasonable owner compensation! Balanced salary supports personal and business needs.",
      2: "Moderate owner salary. Sustainable compensation level.",
      1: "Low owner salary. Consider fair compensation for your contributions.",
      0: "Minimal owner compensation. Review personal financial needs."
    }
  },
  dailyProduction: {
    thresholds: [50, 100, 200], // Production capacity
    advice: {
      3: "Strong production capacity! High output supports sales and growth.",
      2: "Good production level. Meets current demand effectively.",
      1: "Moderate production. Consider capacity expansion for growth.",
      0: "Limited production. Focus on optimizing production processes."
    }
  },
  totalInvestment: {
    thresholds: [100000, 500000, 1000000], // Investment levels
    advice: {
      3: "Significant capital investment! Strong financial foundation for growth.",
      2: "Good investment level. Adequate capital for business operations.",
      1: "Moderate investment. Consider additional capital for expansion.",
      0: "Minimal investment. Build capital base for business development."
    }
  },
  totalAssets: {
    thresholds: [100000, 500000, 1000000], // Asset values
    advice: {
      3: "Strong asset base! Valuable business assets support long-term stability.",
      2: "Good asset foundation. Solid business valuation and resources.",
      1: "Moderate assets. Focus on asset accumulation and value creation.",
      0: "Limited assets. Build asset base for business credibility."
    }
  },
  customerGrowth: {
    thresholds: [0, 0.1, 0.3], // Growth percentage
    advice: {
      3: "Excellent customer growth! Strong acquisition and retention strategies.",
      2: "Good customer growth. Steady business development.",
      1: "Moderate customer base. Focus on customer acquisition.",
      0: "Declining customers. Urgent need for customer growth strategies."
    }
  }
};

// Calculate score based on value and thresholds
function calculateFinancialScore(value, metricConfig) {
  if (!value && value !== 0) return 0;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 0;
  
  const { thresholds } = metricConfig;
  
  if (numValue >= thresholds[2]) return 3;
  if (numValue >= thresholds[1]) return 2;
  if (numValue >= thresholds[0]) return 1;
  return 0;
}

// Generate financial advice based on score
function generateFinancialAdvice(metricName, score, actualValue = null) {
  const metricConfig = financialMetrics[metricName];
  if (!metricConfig) {
    return {
      message: "Financial metric assessment completed.",
      performance: 'neutral',
      value: score
    };
  }

  let message = metricConfig.advice[score];
  let performance = score >= 3 ? 'excellent' : score >= 2 ? 'good' : score >= 1 ? 'moderate' : 'poor';

  // Add context for specific metrics
  if (actualValue !== null) {
    switch (metricName) {
      case 'avgMonthlyRevenue':
        message += ` (${actualValue.toLocaleString()}/month)`;
        break;
      case 'grossProfitMargin':
        message += ` (${actualValue}% margin)`;
        break;
      case 'monthlyFixedCost':
        message += ` (${actualValue.toLocaleString()}/month)`;
        break;
      case 'ownerSalary':
        message += ` (${actualValue.toLocaleString()}/month)`;
        break;
      case 'totalInvestment':
        message += ` (${actualValue.toLocaleString()} invested)`;
        break;
      case 'totalAssets':
        message += ` (${actualValue.toLocaleString()} assets)`;
        break;
    }
  }

  return {
    message,
    performance,
    value: score,
    numericValue: actualValue
  };
}

// Main scoring function - 100% compatible with your form
export function calculateBloodTestScores(formData) {
  const scores = {
    avgMonthlyRevenue: 0,
    grossProfitMargin: 0,
    monthlyFixedCost: 0,
    loanManagement: 0,
    ownerSalary: 0,
    dailyProduction: 0,
    totalInvestment: 0,
    totalAssets: 0,
    customerGrowth: 0,
    totalBloodTestPoints: 0,
    percentage: 0
  };

  const advice = {};

  // 6.1 Average Monthly Revenue
  const revenue = parseFloat(formData.avgMonthlyRevenue) || 0;
  scores.avgMonthlyRevenue = calculateFinancialScore(revenue, financialMetrics.avgMonthlyRevenue);
  advice.avgMonthlyRevenue = generateFinancialAdvice('avgMonthlyRevenue', scores.avgMonthlyRevenue, revenue);

  // 6.2 Gross Profit Margin
  const margin = parseFloat(formData.grossProfitMargin) || 0;
  scores.grossProfitMargin = calculateFinancialScore(margin, financialMetrics.grossProfitMargin);
  advice.grossProfitMargin = generateFinancialAdvice('grossProfitMargin', scores.grossProfitMargin, margin);

  // 6.3 Monthly Fixed Cost
  const fixedCost = parseFloat(formData.monthlyFixedCost) || 0;
  scores.monthlyFixedCost = calculateFinancialScore(fixedCost, financialMetrics.monthlyFixedCost);
  advice.monthlyFixedCost = generateFinancialAdvice('monthlyFixedCost', scores.monthlyFixedCost, fixedCost);

  // 6.4 Loan Management
  let loanScore = 0;
  if (formData.hasLoan === 'no') {
    loanScore = 3; // No loans = excellent
  } else if (formData.hasLoan === 'yes') {
    const installment = parseFloat(formData.loanInstallment) || 0;
    const debtRatio = revenue > 0 ? installment / revenue : 1;
    loanScore = calculateFinancialScore(1 - debtRatio, financialMetrics.loanManagement);
  }
  scores.loanManagement = loanScore;
  advice.loanManagement = generateFinancialAdvice('loanManagement', loanScore);

  // 6.5 Owner Salary
  const salary = parseFloat(formData.ownerSalary) || 0;
  scores.ownerSalary = calculateFinancialScore(salary, financialMetrics.ownerSalary);
  advice.ownerSalary = generateFinancialAdvice('ownerSalary', scores.ownerSalary, salary);

  // 6.6 Daily Production
  const production = parseFloat(formData.dailyProduction) || 0;
  scores.dailyProduction = calculateFinancialScore(production, financialMetrics.dailyProduction);
  advice.dailyProduction = generateFinancialAdvice('dailyProduction', scores.dailyProduction, production);

  // 6.7 Total Investment
  const investment = parseFloat(formData.totalInvestment) || 0;
  scores.totalInvestment = calculateFinancialScore(investment, financialMetrics.totalInvestment);
  advice.totalInvestment = generateFinancialAdvice('totalInvestment', scores.totalInvestment, investment);

  // 6.8 Total Assets
  const assets = parseFloat(formData.totalAssets) || 0;
  scores.totalAssets = calculateFinancialScore(assets, financialMetrics.totalAssets);
  advice.totalAssets = generateFinancialAdvice('totalAssets', scores.totalAssets, assets);

  // 6.9-6.10 Customer Growth Analysis
  const customersQ4 = parseFloat(formData.customersQ4_2021) || 0;
  const customersQ1 = parseFloat(formData.customersQ1_2025) || 0;
  
  let growthScore = 0;
  if (customersQ4 > 0 && customersQ1 > 0) {
    const growthRate = (customersQ1 - customersQ4) / customersQ4;
    growthScore = calculateFinancialScore(growthRate, financialMetrics.customerGrowth);
  } else if (customersQ1 > 0) {
    growthScore = 2; // New customers only in current period
  }
  scores.customerGrowth = growthScore;
  advice.customerGrowth = generateFinancialAdvice('customerGrowth', growthScore);

  // Calculate totals
  const totalPoints = Object.values(scores)
    .filter(val => typeof val === 'number')
    .reduce((sum, score) => sum + score, 0);

  scores.totalBloodTestPoints = totalPoints;
  scores.percentage = Math.round((totalPoints / mainBloodTestTotal) * 100);
  scores.advice = advice;

  return {
    ...scores,
    mainBloodTestTotal,
    performanceLevel: getFinancialPerformanceLevel(scores.percentage)
  };
}

// Performance level utility
function getFinancialPerformanceLevel(percentage) {
  if (percentage >= 80) return 'Excellent Financial Health';
  if (percentage >= 60) return 'Good Financial Position';
  if (percentage >= 40) return 'Moderate Financial Condition';
  return 'Needs Financial Improvement';
}

// Quick financial health assessment
export function analyzeFinancialHealth(scores) {
  const strengths = [];
  const concerns = [];

  if (scores.avgMonthlyRevenue >= 2) strengths.push("Strong revenue generation");
  else concerns.push("Improve monthly revenue");

  if (scores.grossProfitMargin >= 2) strengths.push("Healthy profit margins");
  else concerns.push("Optimize profit margins");

  if (scores.loanManagement >= 2) strengths.push("Good debt management");
  else concerns.push("Review loan obligations");

  if (scores.customerGrowth >= 2) strengths.push("Positive customer growth");
  else concerns.push("Focus on customer acquisition");

  return {
    strengths,
    concerns,
    overallScore: scores.percentage,
    recommendation: strengths.length >= 4 ? 
      "Strong financial foundation. Focus on strategic growth." :
      "Build financial stability through revenue and cost optimization."
  };
}