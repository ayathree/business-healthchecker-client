// Score calculation logic for Business Metrics section (6.1-6.10)
export function calculateBloodTestScores(formData) {
  // Initialize all scores to 0
  const scores = {
    avgMonthlyRevenue: 0,
    grossProfitMargin: 0,
    monthlyFixedCosts: 0,
    loanInstallment: 0,
    ownerSalary: 0,
    dailyProduction: 0,
    totalInvestment: 0,
    totalAssets: 0,
    customersQ4_2021: 0,
    customersQ1_2022: 0,
    totalPoints: 0,
    percentage: 0
  };

  // 6.1: Average Monthly Sales Revenue (0-3 points)
  if (formData.avgMonthlyRevenue) {
    if (/^\d+$/.test(formData.avgMonthlyRevenue)) scores.avgMonthlyRevenue = 3;
    else if (formData.avgMonthlyRevenue.includes("-") || formData.avgMonthlyRevenue.includes("~")) scores.avgMonthlyRevenue = 2;
    else scores.avgMonthlyRevenue = 1;
  }

  // 6.2: Gross Profit Margin % (0-3 points)
  const profitMargin = parseInt(formData.grossProfitMargin) || 0;
  if (profitMargin > 0 && formData.grossProfitMargin.includes("=")) scores.grossProfitMargin = 3;
  else if (profitMargin > 0) scores.grossProfitMargin = 2;
  else if (formData.grossProfitMargin) scores.grossProfitMargin = 1;

  // 6.3: Monthly Fixed Costs (0-3 points)
  if (formData.monthlyFixedCosts) {
    if (formData.monthlyFixedCosts.includes(",") || formData.monthlyFixedCosts.includes("+")) scores.monthlyFixedCosts = 3;
    else if (/^\d+$/.test(formData.monthlyFixedCosts)) scores.monthlyFixedCosts = 2;
    else scores.monthlyFixedCosts = 1;
  }

  // 6.4: Loan Installment (0-3 points)
  if (formData.hasLoan === "yes" && formData.loanInstallment) {
    if (/^\d+$/.test(formData.loanInstallment)) scores.loanInstallment = 3;
    else scores.loanInstallment = 2;
  } else if (formData.hasLoan === "no") {
    scores.loanInstallment = 1;
  }

  // 6.5: Owner Salary (0-3 points)
  const salary = parseInt(formData.ownerSalary) || 0;
  if (salary > 0) scores.ownerSalary = 3;
  else if (formData.ownerSalary) scores.ownerSalary = 1;

  // 6.6: Daily Production Capacity (0-3 points)
  const production = parseInt(formData.dailyProduction) || 0;
  if (production > 0) scores.dailyProduction = 3;
  else if (formData.dailyProduction) scores.dailyProduction = 1;

  // 6.7: Total Investment (0-3 points)
  const investment = parseInt(formData.totalInvestment) || 0;
  if (investment > 0) scores.totalInvestment = 3;
  else if (formData.totalInvestment) scores.totalInvestment = 1;

  // 6.8: Total Assets Value (0-3 points)
  if (formData.totalAssets) {
    if (formData.totalAssets.includes(",") || formData.totalAssets.includes("+")) scores.totalAssets = 3;
    else if (/^\d+$/.test(formData.totalAssets)) scores.totalAssets = 2;
    else scores.totalAssets = 1;
  }

  // 6.9: Customers Q4 2021 (0-3 points)
  const customersQ4 = parseInt(formData.customersQ4_2021) || 0;
  if (customersQ4 > 0) scores.customersQ4_2021 = 3;
  else if (formData.customersQ4_2021) scores.customersQ4_2021 = 1;

  // 6.10: Customers Q1 2022 (0-3 points)
  const customersQ1 = parseInt(formData.customersQ1_2022) || 0;
  if (customersQ1 > 0) scores.customersQ1_2022 = 3;
  else if (formData.customersQ1_2022) scores.customersQ1_2022 = 1;

  // Calculate total points (max 30)
  const totalPoints = 
    scores.avgMonthlyRevenue +
    scores.grossProfitMargin +
    scores.monthlyFixedCosts +
    scores.loanInstallment +
    scores.ownerSalary +
    scores.dailyProduction +
    scores.totalInvestment +
    scores.totalAssets +
    scores.customersQ4_2021 +
    scores.customersQ1_2022;

  // Convert to percentage
  scores.percentage = Math.round((totalPoints / 30) * 100);

  return {...scores,totalPoints};
}