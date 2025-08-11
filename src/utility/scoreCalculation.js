// Score calculation logic for Market & Customers section
export function calculateMarketScores(formData) {
  // Initialize all scores to 0
  const scores = {
    marketScope: 0,
    marketSize: 0,
    marketTrend: 0,
    targetCustomer: 0,
    monthlyCustomers: 0,
    repeatCustomers: 0,
    competitors: 0,
    totalPoints: 0,
    percentage: 0
  };

  // Q1: Market Scope (1-3 points)
  scores.marketScope = parseInt(formData.marketScope) || 0;

  // Q2: Market Size (0-3 points)
  const marketSizeNum = parseInt(formData.marketSize) || 0;
  if (marketSizeNum > 10000) scores.marketSize = 3;
  else if (marketSizeNum > 1000) scores.marketSize = 2;
  else if (marketSizeNum > 0) scores.marketSize = 1;

  // Q3: Market Trend (1-3 points)
  if (formData.marketTrend === "expanding") scores.marketTrend = 3;
  else if (formData.marketTrend === "stable") scores.marketTrend = 2;
  else scores.marketTrend = 1; // "contracting"

  // Q4: Target Customer (0-3 points)
  if (formData.targetCustomer === "identified") scores.targetCustomer = 3;
  else if (formData.targetCustomer === "everyone") scores.targetCustomer = 1;
  else scores.targetCustomer = 0; // "don't know"

  // Q5: Monthly Customers (0-3 points)
  const monthlyCustomersNum = parseInt(formData.monthlyCustomers) || 0;
  if (monthlyCustomersNum > 200) scores.monthlyCustomers = 3;
  else if (monthlyCustomersNum > 50) scores.monthlyCustomers = 2;
  else if (monthlyCustomersNum > 10) scores.monthlyCustomers = 1;

  // Q6: Repeat Customers (0-3 points)
  const repeatPercent = parseInt(formData.repeatCustomers) || 0;
  if (repeatPercent > 60) scores.repeatCustomers = 3;
  else if (repeatPercent > 30) scores.repeatCustomers = 2;
  else if (repeatPercent > 10) scores.repeatCustomers = 1;

  // Q7: Competitors (0-3 points, reverse scaled)
  const competitorsNum = parseInt(formData.competitors) || 0;
  if (competitorsNum <= 10) scores.competitors = 1;
  else if (competitorsNum <= 1000) scores.competitors = 2;
  else if (competitorsNum >= 1000) scores.competitors = 3;

  // Calculate total points (max 21)
  const totalPoints = 
    scores.marketScope +
    scores.marketSize +
    scores.marketTrend +
    scores.targetCustomer +
    scores.monthlyCustomers +
    scores.repeatCustomers +
    scores.competitors;

  // Convert to percentage
  scores.percentage = Math.round((totalPoints / 21) * 100);

  return {...scores,totalPoints} ;
}