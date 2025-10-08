const mainMarketTotal = 21;

// Generate market/customer advice based on metrics
function generateMarketAdvice(metricName, value) {
  const adviceTemplates = {
    'marketScope': {
      '3': "Excellent! International market reach provides massive growth potential.",
      '2': "Good! National market offers substantial opportunities.",
      '1': "Regional market provides focused opportunities. Consider expansion.",
      'default': "Market scope needs definition for strategic planning."
    },
    'marketSize': {
      high: "Large market size identified! Significant growth potential available.",
      medium: "Moderate market size. Good opportunities with focused strategy.",
      low: "Limited market size. Consider niche targeting or market expansion.",
      none: "Market size undefined. Critical to understand your total addressable market."
    },
    'marketTrend': {
      '3': "Market is expanding! Excellent timing for growth and investment.",
      '2': "Market is stable. Focus on gaining market share and efficiency.", 
      '1': "Market is contracting. Consider diversification or niche strategies.",
      'default': "Market trend analysis needed for strategic planning."
    },
    'targetCustomer': {
      '3': "Excellent customer targeting! Well-defined target audience.",
      '1': "Targeting too broad. Focus on specific customer segments for better results.",
      '0': "Customer targeting unclear. Critical to define your ideal customer profile.",
      'default': "Customer targeting requires definition."
    },
    'monthlyCustomers': {
      high: "Strong customer base! Excellent monthly customer volume.",
      medium: "Good customer traffic. Focus on conversion and retention.",
      low: "Limited customer volume. Prioritize acquisition strategies.",
      none: "Minimal customer traffic. Urgent need for customer acquisition."
    },
    'repeatCustomers': {
      high: "Outstanding customer loyalty! High repeat business indicates great satisfaction.",
      medium: "Good customer retention. Focus on improving repeat rates.", 
      low: "Low repeat business. Prioritize customer satisfaction and loyalty programs.",
      none: "Minimal repeat customers. Critical to improve customer experience."
    },
    'competitors': {
      high: "Highly competitive market! Differentiate strongly and focus on unique value.",
      medium: "Moderate competition. Opportunities available with clear differentiation.",
      low: "Limited competition. Great opportunity to establish market leadership.",
      none: "Minimal competition. Validate market demand and scalability."
    }
  };

  let message = '';
  let performance = '';

  switch (metricName) {
    case 'marketScope':
    case 'marketTrend':
    case 'targetCustomer':
      performance = value;
      message = adviceTemplates[metricName][value] || adviceTemplates[metricName].default;
      break;
      
    case 'marketSize':
      const sizeValue = parseInt(value) || 0;
      performance = sizeValue > 10000 ? 'high' : sizeValue > 1000 ? 'medium' : sizeValue > 0 ? 'low' : 'none';
      message = adviceTemplates.marketSize[performance];
      break;
      
    case 'monthlyCustomers':
      const monthlyValue = parseInt(value) || 0;
      performance = monthlyValue > 200 ? 'high' : monthlyValue > 50 ? 'medium' : monthlyValue > 10 ? 'low' : 'none';
      message = adviceTemplates.monthlyCustomers[performance];
      break;
      
    case 'repeatCustomers':
      // Handle percentage input (remove % sign if present)
      const repeatValue = parseInt(value.toString().replace('%', '')) || 0;
      performance = repeatValue > 60 ? 'high' : repeatValue > 30 ? 'medium' : repeatValue > 10 ? 'low' : 'none';
      message = adviceTemplates.repeatCustomers[performance];
      break;
      
    case 'competitors':
      const compValue = parseInt(value) || 0;
      performance = compValue >= 1000 ? 'high' : compValue > 10 ? 'medium' : compValue > 0 ? 'low' : 'none';
      message = adviceTemplates.competitors[performance];
      break;
      
    default:
      message = "Market analysis provided. Continuous market monitoring is essential.";
  }

  return {
    message: message,
    performance: performance,
    value: value
  };
}

// Calculate market scores
export function calculateMarketScores(formData) {
  const scores = {
    marketScope: 0,
    marketSize: 0, 
    marketTrend: 0,
    targetCustomer: 0,
    monthlyCustomers: 0,
    repeatCustomers: 0,
    competitors: 0,
    totalMarketPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Calculate market scope score (1-3 points)
  scores.marketScope = parseInt(formData.marketScope) || 0;
  advice.marketScope = generateMarketAdvice('marketScope', formData.marketScope);

  // Calculate market size score
  const marketSizeValue = parseInt(formData.marketSize) || 0;
  if (marketSizeValue > 10000) scores.marketSize = 3;
  else if (marketSizeValue > 1000) scores.marketSize = 2; 
  else if (marketSizeValue > 0) scores.marketSize = 1;
  advice.marketSize = generateMarketAdvice('marketSize', formData.marketSize);

  // Calculate market trend score
  scores.marketTrend = parseInt(formData.marketTrend) || 0;
  advice.marketTrend = generateMarketAdvice('marketTrend', formData.marketTrend);

  // Calculate target customer score
  scores.targetCustomer = parseInt(formData.targetCustomer) || 0;
  advice.targetCustomer = generateMarketAdvice('targetCustomer', formData.targetCustomer);

  // Calculate monthly customers score
  const monthlyValue = parseInt(formData.monthlyCustomers) || 0;
  if (monthlyValue > 200) scores.monthlyCustomers = 3;
  else if (monthlyValue > 50) scores.monthlyCustomers = 2;
  else if (monthlyValue > 10) scores.monthlyCustomers = 1;
  advice.monthlyCustomers = generateMarketAdvice('monthlyCustomers', formData.monthlyCustomers);

  // Calculate repeat customers score
  const repeatValue = parseInt(formData.repeatCustomers.toString().replace('%', '')) || 0;
  if (repeatValue > 60) scores.repeatCustomers = 3;
  else if (repeatValue > 30) scores.repeatCustomers = 2;
  else if (repeatValue > 10) scores.repeatCustomers = 1;
  advice.repeatCustomers = generateMarketAdvice('repeatCustomers', formData.repeatCustomers);

  // Calculate competitors score
  const compValue = parseInt(formData.competitors) || 0;
  if (compValue >= 1000) scores.competitors = 3;
  else if (compValue > 10) scores.competitors = 2;
  else if (compValue > 0) scores.competitors = 1;
  advice.competitors = generateMarketAdvice('competitors', formData.competitors);

  // Calculate totals
  const totalPoints = Object.values(scores).reduce((sum, score, index) => {
    return index < 7 ? sum + score : sum; // Sum first 7 scores only
  }, 0);
  
  scores.totalMarketPoints = totalPoints;
  scores.percentage = Math.round((totalPoints / mainMarketTotal) * 100);
  scores.advice = advice;

  return { ...scores, mainMarketTotal };
}

// Utility function for market analysis summary
export function getMarketAnalysisSummary(scores) {
  const performanceLevel = scores.percentage >= 80 ? 'Excellent' :
                          scores.percentage >= 60 ? 'Good' :
                          scores.percentage >= 40 ? 'Average' : 'Needs Improvement';
  
  return {
    performanceLevel,
    totalPoints: scores.totalMarketPoints,
    maxPoints: mainMarketTotal,
    percentage: scores.percentage,
    recommendation: scores.percentage >= 70 ? 
      "Strong market position. Focus on growth and expansion." :
      scores.percentage >= 50 ?
      "Moderate market position. Improve weak areas." :
      "Market position needs significant improvement. Review strategy."
  };
}