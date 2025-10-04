// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainMarketTotal=21

// Helper function to analyze sentiment for market/customer text
function analyzeMarketSentiment(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      comparative: 0,
      sentiment: 'neutral',
      confidence: 0,
      tokenCount: 0
    };
  }
  
  // Use the sentiment library for analysis
  const result = sentimentAnalyzer.analyze(text);
  
  // Determine sentiment category
  let sentimentCategory = 'neutral';
  if (result.comparative > 0.1) sentimentCategory = 'positive';
  else if (result.comparative < -0.1) sentimentCategory = 'negative';
  
  // Calculate confidence based on score strength
  const confidence = Math.min(1, Math.abs(result.comparative) * 10);
  
  return {
    score: result.score,
    comparative: result.comparative,
    sentiment: sentimentCategory,
    confidence: confidence,
    tokenCount: result.words.length,
    tokens: result.words
  };
}

// Generate market/customer advice based on metrics and sentiment
function generateMarketAdvice(metricName, value, description = null, additionalData = null) {
  let sentiment = { sentiment: 'neutral', confidence: 0.5 };
  
  // Analyze description text if provided
  if (description && typeof description === 'string' && description.trim().length > 0) {
    sentiment = analyzeMarketSentiment(description);
  }

  const adviceTemplates = {
    'marketScope': {
      high: "Excellent market understanding! Clear scope definition indicates strong market awareness.",
      medium: "Good market scope definition. Consider more detailed market segmentation.",
      low: "Market scope needs refinement. Focus on defining your target market more precisely.",
      level: (level) => `Market scope level ${level}/3. ${level >= 2 ? 'Solid market understanding.' : 'Needs deeper market analysis.'}`
    },
    'marketSize': {
      high: "Large market size identified! Significant growth potential available.",
      medium: "Moderate market size. Good opportunities with focused strategy.",
      low: "Limited market size. Consider niche targeting or market expansion.",
      none: "Market size undefined. Critical to understand your total addressable market."
    },
    'marketTrend': {
      expanding: "Market is expanding! Excellent timing for growth and investment.",
      stable: "Market is stable. Focus on gaining market share and efficiency.",
      contracting: "Market is contracting. Consider diversification or niche strategies."
    },
    'targetCustomer': {
      identified: "Excellent customer targeting! Well-defined target audience.",
      everyone: "Targeting too broad. Focus on specific customer segments for better results.",
      unknown: "Customer targeting unclear. Critical to define your ideal customer profile."
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

  // Generate appropriate message based on metric
  let message = '';
  let performance = '';

  switch (metricName) {
    case 'marketScope':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : 'low';
      message = value > 0 ? adviceTemplates.marketScope.level(value) : adviceTemplates.marketScope.none;
      break;
      
    case 'marketSize':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.marketSize[performance];
      break;
      
    case 'marketTrend':
      message = adviceTemplates.marketTrend[value] || "Market trend analysis needed.";
      performance = value;
      break;
      
    case 'targetCustomer':
      message = adviceTemplates.targetCustomer[value] || "Customer targeting requires definition.";
      performance = value;
      break;
      
    case 'monthlyCustomers':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.monthlyCustomers[performance];
      break;
      
    case 'repeatCustomers':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.repeatCustomers[performance];
      break;
      
    case 'competitors':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.competitors[performance];
      break;
      
    default:
      message = "Market analysis provided. Continuous market monitoring is essential.";
  }

  // Add sentiment insights if description provided
  if (description && description.trim().length > 0) {
    if (sentiment.sentiment === 'positive') {
      message += " Positive market sentiment detected in analysis.";
    } else if (sentiment.sentiment === 'negative') {
      message += " Cautious market sentiment noted in assessment.";
    }
  }

  return {
    message: message,
    sentiment: sentiment.sentiment,
    confidence: sentiment.confidence,
    performance: performance,
    value: value
  };
}

// Enhanced market analysis with sentiment capabilities
export function calculateMarketScores(formData) {
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

  const advice = {};

  // Helper function to calculate score with sentiment-aware advice
  const calculateMarketScore = (value, metricName, descriptionField = null) => {
    let score = 0;
    let numericValue = typeof value === 'number' ? value : parseInt(value) || 0;

    switch (metricName) {
      case 'marketScope':
        score = Math.min(3, Math.max(0, numericValue));
        break;
        
      case 'marketSize':
        if (numericValue > 10000) score = 3;
        else if (numericValue > 1000) score = 2;
        else if (numericValue > 0) score = 1;
        break;
        
      case 'marketTrend':
        if (value === "expanding") score = 3;
        else if (value === "stable") score = 2;
        else if (value === "contracting") score = 1;
        break;
        
      case 'targetCustomer':
        if (value === "identified") score = 3;
        else if (value === "everyone") score = 1;
        break;
        
      case 'monthlyCustomers':
        if (numericValue > 200) score = 3;
        else if (numericValue > 50) score = 2;
        else if (numericValue > 10) score = 1;
        break;
        
      case 'repeatCustomers':
        if (numericValue > 60) score = 3;
        else if (numericValue > 30) score = 2;
        else if (numericValue > 10) score = 1;
        break;
        
      case 'competitors':
        if (numericValue >= 1000) score = 3;
        else if (numericValue > 10) score = 2;
        else if (numericValue > 0) score = 1;
        break;
    }

    // Generate advice with optional description analysis
    const description = descriptionField ? formData[descriptionField] : null;
    advice[metricName] = generateMarketAdvice(metricName, value, description);

    return score;
  };

  // Calculate all scores
  scores.marketScope = calculateMarketScore(formData.marketScope, 'marketScope', 'marketScopeDescription');
  scores.marketSize = calculateMarketScore(formData.marketSize, 'marketSize', 'marketSizeDescription');
  scores.marketTrend = calculateMarketScore(formData.marketTrend, 'marketTrend', 'marketTrendDescription');
  scores.targetCustomer = calculateMarketScore(formData.targetCustomer, 'targetCustomer', 'targetCustomerDescription');
  scores.monthlyCustomers = calculateMarketScore(formData.monthlyCustomers, 'monthlyCustomers', 'customersDescription');
  scores.repeatCustomers = calculateMarketScore(formData.repeatCustomers, 'repeatCustomers', 'retentionDescription');
  scores.competitors = calculateMarketScore(formData.competitors, 'competitors', 'competitionDescription');

  // Calculate total points (max 21)
  const totalMarketPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  scores.percentage = Math.round((totalMarketPoints / mainMarketTotal) * 100);
  scores.totalMarketPoints = totalMarketPoints;
  scores.advice = advice;

  return {...scores,mainMarketTotal};
}

// Additional function for detailed market analysis
export function analyzeMarketOpportunity(marketData, description = null) {
  const sentiment = description ? analyzeMarketSentiment(description) : { sentiment: 'neutral', confidence: 0.5 };
  
  return {
    marketSize: marketData.size,
    growthPotential: marketData.trend === 'expanding' ? 'high' : marketData.trend === 'stable' ? 'medium' : 'low',
    competitionLevel: marketData.competitors >= 1000 ? 'high' : marketData.competitors > 10 ? 'medium' : 'low',
    sentiment: sentiment.sentiment,
    recommendation: generateMarketAdvice('marketScope', marketData.scope, description).message
  };
}