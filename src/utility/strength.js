// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainTotal=15

// Helper function to analyze sentiment for organizational strength text
function analyzeStrengthSentiment(text) {
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

// Generate strength advice based on metrics and sentiment
function generateStrengthAdvice(metricName, value, description = null, numericValue = null) {
  let sentiment = { sentiment: 'neutral', confidence: 0.5 };
  
  // Analyze description text if provided
  if (description && typeof description === 'string' && description.trim().length > 0) {
    sentiment = analyzeStrengthSentiment(description);
  }

  const adviceTemplates = {
    'employeeCount': {
      high: "Strong team size! Excellent workforce capacity for growth and operations.",
      medium: "Good team size. Consider strategic hiring for scaling opportunities.",
      low: "Limited team size. Focus on optimal staffing for current operations.",
      none: "Minimal workforce. Critical to build core team for business stability."
    },
    'employeeSkills': {
      high: "Exceptional team skills! Highly skilled workforce drives innovation and efficiency.",
      medium: "Good skill levels. Invest in training and development for competitive advantage.",
      low: "Skill development needed. Prioritize training and skill enhancement programs.",
      none: "Significant skill gaps. Urgent need for training and talent development."
    },
    'operationalResilience': {
      high: "Excellent operational resilience! Strong backup systems and contingency planning.",
      medium: "Moderate operational stability. Enhance backup systems and risk management.",
      low: "Operational vulnerabilities exist. Develop comprehensive contingency plans.",
      none: "Critical operational risks. Immediate need for resilience planning."
    },
    'marketingPlan': {
      high: "Strong marketing strategy! Comprehensive plan drives customer acquisition.",
      medium: "Basic marketing approach. Develop more detailed strategic marketing plan.",
      low: "Limited marketing planning. Create structured marketing strategy.",
      none: "No marketing plan. Essential to develop customer acquisition strategy."
    },
    'softwareUsage': {
      high: "Excellent technology adoption! Software tools enhance efficiency and scalability.",
      medium: "Good software utilization. Explore additional tools for optimization.",
      low: "Limited technology use. Implement software solutions for productivity.",
      none: "Manual processes dominant. Critical to adopt technology for growth."
    },
    'leadership': {
      high: "Strong leadership foundation! Effective guidance drives organizational success.",
      medium: "Adequate leadership. Develop leadership capabilities for better direction.",
      low: "Leadership development needed. Invest in management training.",
      none: "Leadership gaps evident. Prioritize leadership development."
    }
  };

  // Generate appropriate message based on metric
  let message = '';
  let performance = '';

  switch (metricName) {
    case 'employeeCount':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.employeeCount[performance];
      if (numericValue) message += ` (${numericValue} employees)`;
      break;
      
    case 'employeeSkills':
      performance = value >= 3 ? 'high' : value >= 2 ? 'medium' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.employeeSkills[performance];
      if (numericValue) message += ` (Skill level: ${numericValue}/10)`;
      break;
      
    case 'operationalResilience':
      performance = value >= 3 ? 'high' : value >= 1 ? 'medium' : 'none';
      message = adviceTemplates.operationalResilience[performance];
      break;
      
    case 'marketingPlan':
      performance = value >= 3 ? 'high' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.marketingPlan[performance];
      break;
      
    case 'softwareUsage':
      performance = value >= 3 ? 'high' : value >= 1 ? 'low' : 'none';
      message = adviceTemplates.softwareUsage[performance];
      break;
      
    default:
      message = "Organizational strength assessment provided. Continuous improvement is key.";
  }

  // Add sentiment insights if description provided
  if (description && description.trim().length > 0) {
    if (sentiment.sentiment === 'positive') {
      message += " Positive assessment of organizational capabilities.";
    } else if (sentiment.sentiment === 'negative') {
      message += " Areas for improvement identified in capability assessment.";
    }
  }

  return {
    message: message,
    sentiment: sentiment.sentiment,
    confidence: sentiment.confidence,
    performance: performance,
    value: value,
    numericValue: numericValue
  };
}

// Enhanced strength analysis with sentiment capabilities
export function calculateStrengthScores(responses) {
  const scores = {
    employeeCount: 0,
    employeeSkills: 0,
    operationalResilience: 0,
    marketingPlan: 0,
    softwareUsage: 0,
    totalPoints: 0,
    percentage: 0
  };

  const advice = {};

  // Helper function to calculate score with sentiment-aware advice
  const calculateStrengthScore = (value, metricName, descriptionField = null, numericValue = null) => {
    let score = 0;

    switch (metricName) {
      case 'employeeCount':
        score = value >= 20 ? 3 : value >= 10 ? 2 : value >= 2 ? 1 : 0;
        break;
        
      case 'employeeSkills':
        score = value >= 8 ? 3 : value >= 6 ? 2 : value >= 4 ? 1 : 0;
        break;
        
      case 'operationalResilience':
        score = value === "yes" ? 3 : value === "somewhat" ? 1 : 0;
        break;
        
      case 'marketingPlan':
        score = value === "yes" ? 3 : value === "no" ? 1 : 0;
        break;
        
      case 'softwareUsage':
        score = value === "yes" ? 3 : 0;
        break;
    }

    // Generate advice with optional description analysis
    const description = descriptionField ? responses[descriptionField] : null;
    advice[metricName] = generateStrengthAdvice(metricName, score, description, numericValue || value);

    return score;
  };

  // Calculate all scores
  scores.employeeCount = calculateStrengthScore(
    responses.employeeCount, 
    'employeeCount', 
    'teamDescription',
    responses.employeeCount
  );
  
  scores.employeeSkills = calculateStrengthScore(
    responses.skillLevel, 
    'employeeSkills', 
    'skillsDescription',
    responses.skillLevel
  );
  
  scores.operationalResilience = calculateStrengthScore(
    responses.operationalResilience, 
    'operationalResilience', 
    'operationsDescription'
  );
  
  scores.marketingPlan = calculateStrengthScore(
    responses.marketingPlan, 
    'marketingPlan', 
    'marketingDescription'
  );
  
  scores.softwareUsage = calculateStrengthScore(
    responses.usesSoftware, 
    'softwareUsage', 
    'technologyDescription'
  );

  // Calculate totals
  const totalPoints = scores.employeeCount + scores.employeeSkills + 
                     scores.operationalResilience + scores.marketingPlan + 
                     scores.softwareUsage;
  
  scores.percentage = Math.round((totalPoints / mainTotal) * 100);
  scores.totalPoints = totalPoints;
  scores.advice = advice;

  return {...scores,mainTotal};
}

// Additional function for detailed organizational analysis
export function analyzeOrganizationalStrength(strengthData, descriptions = {}) {
  const analysis = {};
  
  Object.keys(strengthData).forEach(metric => {
    const sentiment = descriptions[metric] ? analyzeStrengthSentiment(descriptions[metric]) : 
                     { sentiment: 'neutral', confidence: 0.5 };
    
    analysis[metric] = {
      score: strengthData[metric],
      sentiment: sentiment.sentiment,
      recommendation: generateStrengthAdvice(metric, strengthData[metric], descriptions[metric]).message
    };
  });
  
  return analysis;
}