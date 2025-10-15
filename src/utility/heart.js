const mainProductTotal = 15;

// Product scoring configuration
const productMetrics = {
  uniqueFeatures: {
    scores: {
      'yes': 3,
      'no': 1
    },
    advice: {
      3: "Excellent! Unique features differentiate your product and create competitive advantage.",
      1: "Product differentiation is crucial. Focus on developing unique selling propositions."
    }
  },
  customerSatisfaction: {
    scores: {
      'yes': 3,
      'somewhat': 2, 
      'no': 1
    },
    advice: {
      3: "Outstanding customer satisfaction! This indicates strong product-market fit.",
      2: "Customer satisfaction is good but could be improved with better feedback mechanisms.",
      1: "Address customer satisfaction issues promptly to maintain market position."
    }
  },
  packagingBranding: {
    scores: {
      'custom': 3,
      'stickers': 2,
      'market': 1
    },
    advice: {
      3: "Excellent packaging and branding! Strong visual identity enhances perceived value.",
      2: "Packaging and branding are adequate but could be strengthened for better market presence.",
      1: "Consider investing in professional packaging and branding to improve market appeal."
    }
  },
  pricingPolicy: {
    scores: {
      'smart': 3,
      'costPlus': 2,
      'no': 1
    },
    advice: {
      3: "Smart pricing strategy! This maximizes profitability while remaining competitive.",
      2: "Pricing strategy is functional but could be optimized for better market positioning.", 
      1: "Review your pricing strategy to ensure it aligns with market expectations and costs."
    }
  },
  dateLabeling: {
    scores: {
      'yes': 3,
      'never': 2,
      'no': 1
    },
    advice: {
      3: "Excellent quality control! Proper dating ensures product freshness and safety.",
      2: "Product longevity is good, but consider adding quality assurance information.",
      1: "Implement proper date labeling to ensure product quality and customer safety."
    }
  }
};

// Generate product advice based on score
function generateProductAdvice(metricName, score, answerValue = null) {
  const metricConfig = productMetrics[metricName];
  if (!metricConfig) {
    return {
      message: "Product assessment completed successfully.",
      performance: 'neutral',
      value: score
    };
  }

  let message = metricConfig.advice[score];
  let performance = score >= 3 ? 'excellent' : score >= 2 ? 'good' : 'moderate';

  // Add context based on specific answer
  if (answerValue !== null) {
    switch (metricName) {
      case 'uniqueFeatures':
        if (answerValue === 'yes') {
          message += " Focus on communicating these unique features to customers.";
        } else {
          message += " Consider customer research to identify potential unique features.";
        }
        break;
        
      case 'customerSatisfaction':
        if (answerValue === 'yes') {
          message += " Leverage positive customer feedback for marketing.";
        } else if (answerValue === 'somewhat') {
          message += " Collect specific customer feedback to identify improvement areas.";
        }
        break;
        
      case 'packagingBranding':
        if (answerValue === 'custom') {
          message += " Your custom packaging strengthens brand recognition.";
        } else if (answerValue === 'stickers') {
          message += " Stickers are a good start; consider full custom packaging.";
        }
        break;
    }
  }

  return {
    message,
    performance,
    value: score,
    answerValue
  };
}

// Calculate product score based on selected option
function calculateProductScore(answer, metricName) {
  if (!answer) return 0;
  
  const metricConfig = productMetrics[metricName];
  if (!metricConfig) return 0;
  
  return metricConfig.scores[answer] || 0;
}

// Main scoring function - 100% compatible with your form
export function calculateHeartScores(formData) {
  const scores = {
    uniqueFeatures: 0,
    customerSatisfaction: 0,
    packagingBranding: 0,
    pricingPolicy: 0,
    dateLabeling: 0,
    totalProductPoints: 0,
    percentage: 0
  };

  const advice = {};

  // 7.1 Unique Features Scoring
  scores.uniqueFeatures = calculateProductScore(formData.uniqueFeatures, 'uniqueFeatures');
  advice.uniqueFeatures = generateProductAdvice('uniqueFeatures', scores.uniqueFeatures, formData.uniqueFeatures);

  // 7.2 Customer Satisfaction Scoring
  scores.customerSatisfaction = calculateProductScore(formData.customerSatisfaction, 'customerSatisfaction');
  advice.customerSatisfaction = generateProductAdvice('customerSatisfaction', scores.customerSatisfaction, formData.customerSatisfaction);

  // 7.3 Packaging & Branding Scoring
  scores.packagingBranding = calculateProductScore(formData.packagingBranding, 'packagingBranding');
  advice.packagingBranding = generateProductAdvice('packagingBranding', scores.packagingBranding, formData.packagingBranding);

  // 7.4 Pricing Policy Scoring
  scores.pricingPolicy = calculateProductScore(formData.pricingPolicy, 'pricingPolicy');
  advice.pricingPolicy = generateProductAdvice('pricingPolicy', scores.pricingPolicy, formData.pricingPolicy);

  // 7.5 Date Labeling Scoring
  scores.dateLabeling = calculateProductScore(formData.dateLabeling, 'dateLabeling');
  advice.dateLabeling = generateProductAdvice('dateLabeling', scores.dateLabeling, formData.dateLabeling);

  // Calculate total points (max 15)
  const totalProductPoints = 
    scores.uniqueFeatures +
    scores.customerSatisfaction +
    scores.packagingBranding +
    scores.pricingPolicy +
    scores.dateLabeling;
    
  scores.percentage = Math.round((totalProductPoints / mainProductTotal) * 100);
  scores.totalProductPoints = totalProductPoints;
  scores.advice = advice;

  return {
    ...scores,
    mainProductTotal,
    performanceLevel: getProductPerformanceLevel(scores.percentage)
  };
}

// Performance level utility
function getProductPerformanceLevel(percentage) {
  if (percentage >= 80) return 'Excellent Product Quality';
  if (percentage >= 60) return 'Good Product Standards';
  if (percentage >= 40) return 'Moderate Product Quality';
  return 'Needs Product Improvement';
}

// Product quality analysis
export function analyzeProductQuality(scores) {
  const strengths = [];
  const improvements = [];

  if (scores.uniqueFeatures >= 2) strengths.push("Strong product differentiation");
  else improvements.push("Develop unique features");

  if (scores.customerSatisfaction >= 2) strengths.push("Good customer satisfaction");
  else improvements.push("Improve customer satisfaction");

  if (scores.packagingBranding >= 2) strengths.push("Effective branding");
  else improvements.push("Enhance packaging and branding");

  if (scores.pricingPolicy >= 2) strengths.push("Strategic pricing");
  else improvements.push("Optimize pricing strategy");

  if (scores.dateLabeling >= 2) strengths.push("Proper quality labeling");
  else improvements.push("Implement quality labeling");

  return {
    strengths,
    improvements,
    overallScore: scores.percentage,
    recommendation: strengths.length >= 3 ? 
      "Strong product foundation. Focus on market expansion." :
      "Build core product quality through feature development and customer feedback."
  };
}

// Quick product assessment
export function getProductAdvice(metricName, answer) {
  const score = calculateProductScore(answer, metricName);
  return generateProductAdvice(metricName, score, answer);
}