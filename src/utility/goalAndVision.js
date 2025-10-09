// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainVisionTotal = 15;

// CUSTOMIZED: Enhanced sentiment analysis for vision statements
function analyzeVisionSentiment(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      comparative: 0,
      sentiment: 'neutral',
      confidence: 0,
      positiveWords: [],
      negativeWords: [],
      tokenCount: 0,
      visionClarity: 0
    };
  }
  
  const result = sentimentAnalyzer.analyze(text);
  const trimmedText = text.trim();
  const wordCount = trimmedText.split(/\s+/).length;
  
  // CUSTOMIZED: More realistic thresholds for vision statements
  let sentimentCategory = 'neutral';
  let confidence = Math.min(1, Math.abs(result.comparative) * 15); // Increased multiplier
  
  if (result.comparative > 0.03) sentimentCategory = 'positive';    // Reduced threshold
  else if (result.comparative < -0.03) sentimentCategory = 'negative'; // Reduced threshold
  
  // CUSTOMIZED: Vision-specific word analysis
  const visionKeywords = [
    'growth', 'expand', 'increase', 'achieve', 'success', 'leadership',
    'innovation', 'excellence', 'quality', 'customer', 'market', 'revenue',
    'profit', 'efficiency', 'development', 'transformation', 'digital',
    'technology', 'sustainable', 'competitive', 'premium', 'value'
  ];
  
  const positiveVisionWords = [
    'excellent', 'outstanding', 'amazing', 'great', 'strong', 'premium',
    'best', 'top', 'leading', 'innovative', 'quality', 'successful',
    'profitable', 'efficient', 'sustainable', 'competitive'
  ];
  
  // Count vision-related keywords
  const visionKeywordCount = visionKeywords.filter(keyword => 
    new RegExp(`\\b${keyword}\\b`, 'i').test(text)
  ).length;
  
  const positiveVisionWordCount = positiveVisionWords.filter(keyword =>
    new RegExp(`\\b${keyword}\\b`, 'i').test(text)
  ).length;
  
  // CUSTOMIZED: Vision clarity score based on content
  const hasFutureOrientation = /(will|going to|future|next|years|vision|goal|target|plan|strategy)/i.test(text);
  const hasSpecificMetrics = /\d+|%|\$|million|thousand|growth|expand|increase|reach|achievement/i.test(text);
  const hasTimeline = /(year|month|quarter|deadline|by|until|within|timeframe)/i.test(text);
  
  let visionClarity = 0;
  if (hasFutureOrientation) visionClarity += 1;
  if (hasSpecificMetrics) visionClarity += 1;
  if (hasTimeline) visionClarity += 1;
  if (wordCount > 30) visionClarity += 1;
  
  // CUSTOMIZED: Boost sentiment if vision clarity is high
  if (visionClarity >= 3 && sentimentCategory === 'neutral') {
    sentimentCategory = 'positive';
    confidence = Math.max(confidence, 0.7);
  }
  
  return {
    score: result.score,
    comparative: result.comparative,
    sentiment: sentimentCategory,
    confidence: confidence,
    positiveWords: result.positive,
    negativeWords: result.negative,
    tokenCount: result.words.length,
    tokens: result.words,
    visionClarity: visionClarity,
    visionKeywordCount: visionKeywordCount,
    positiveVisionWordCount: positiveVisionWordCount,
    hasFutureOrientation: hasFutureOrientation,
    hasSpecificMetrics: hasSpecificMetrics,
    hasTimeline: hasTimeline,
    wordCount: wordCount
  };
}

// CUSTOMIZED: Enhanced advice generation
function generateSentimentAdvice(sentimentAnalysis, question, answer) {
  if (question === 'visionText') {
    const { 
      sentiment, 
      comparative, 
      positiveWords, 
      negativeWords, 
      visionClarity,
      visionKeywordCount,
      positiveVisionWordCount,
      hasFutureOrientation,
      hasSpecificMetrics,
      hasTimeline,
      wordCount
    } = sentimentAnalysis;
    
    let message = '';
    
    // CUSTOMIZED: More nuanced advice based on multiple factors
    if (sentiment === 'negative') {
      message = "Your vision shows some concerns. Focus on opportunities and strengths. ";
    } else if (sentiment === 'positive') {
      if (visionClarity >= 3) {
        message = "Excellent vision! Clear, future-oriented with specific targets. ";
      } else if (visionClarity >= 2) {
        message = "Strong vision statement with good direction. ";
      } else {
        message = "Positive vision! Consider adding more specific details. ";
      }
    } else { // neutral
      if (visionClarity >= 3) {
        message = "Well-structured vision with clear goals (neutral tone). ";
        sentimentAnalysis.sentiment = 'positive'; // Boost for high clarity
      } else if (visionClarity >= 2) {
        message = "Practical vision statement. Could benefit from more inspirational language. ";
      } else {
        message = "Vision needs more development and specific details. ";
      }
    }
    
    // Add clarity feedback
    if (!hasFutureOrientation) {
      message += "Add future-oriented language. ";
    }
    if (!hasSpecificMetrics) {
      message += "Include specific, measurable targets. ";
    }
    if (!hasTimeline) {
      message += "Define clear timelines. ";
    }
    if (wordCount < 20) {
      message += "Expand your vision with more details. ";
    }
    
    return {
      message: message.trim(),
      positiveWords: positiveWords.length,
      negativeWords: negativeWords.length,
      comparativeScore: comparative.toFixed(3),
      visionClarity: visionClarity,
      visionKeywords: visionKeywordCount
    };
  }
  
  // Rest of the function remains same...
  const adviceMap = {
    'hasVision': {
      'written': 'Excellent! Written vision dramatically increases success probability.',
      'inMind': 'Good start! Documenting your vision will improve clarity and focus.',
      'noUnderstanding': 'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) provide clear direction.'
    },
    'hasActionPlan': {
      'yes': 'Strong execution planning! Regular reviews ensure progress.',
      'no': 'Action planning is crucial. Start with 90-day milestones for quick wins.'
    },
    'resourcePercentage': (value) => {
      const numValue = parseInt(value) || 0;
      const actualPercent = numValue * 10;
      if (actualPercent >= 80) return `Strong resource base (${actualPercent}%)! Focus on optimal utilization.`;
      if (actualPercent >= 50) return `Moderate resources (${actualPercent}%). Strategic allocation needed.`;
      if (actualPercent >= 20) return `Limited resources (${actualPercent}%). Creativity and partnerships help.`;
      return `Minimal resources (${actualPercent}%). Leverage existing assets effectively.`;
    },
    'hasSkilledManpower': {
      'yes': 'Strong team foundation! Continuous development drives growth.',
      'no': 'Team capabilities are key. Consider training before new hiring.'
    }
  };
  
  let message = '';
  
  switch (question) {
    case 'hasVision':
    case 'hasActionPlan':
    case 'hasSkilledManpower':
      message = adviceMap[question][answer] || 'Thank you for your response.';
      break;
    
    case 'resourcePercentage':
      message = adviceMap[question](answer);
      break;
    
    default:
      message = `Thank you for your response about ${question}.`;
  }
  
  return { 
    message, 
    positiveWords: 0, 
    negativeWords: 0,
    comparativeScore: 0,
    visionClarity: 0,
    visionKeywords: 0
  };
}

// CUSTOMIZED: Enhanced vision quality scoring
function calculateVisionQualityScore(sentimentAnalysis) {
  const { comparative, visionClarity, visionKeywordCount, positiveVisionWordCount } = sentimentAnalysis;
  
  // Base score from sentiment
  let baseScore = 0;
  if (comparative > 0.03) baseScore = 2;    // Reduced threshold
  else if (comparative > 0.01) baseScore = 1; 
  else if (comparative < -0.03) baseScore = 0;
  else baseScore = 1; // Neutral gets 1 instead of 0
  
  // Boost score based on vision clarity
  const clarityBoost = visionClarity * 0.5; // Up to 2 points boost
  
  // Boost for vision keywords
  const keywordBoost = Math.min(1, visionKeywordCount / 5);
  
  // Boost for positive vision words
  const positiveBoost = Math.min(1, positiveVisionWordCount / 3);
  
  const totalScore = baseScore + clarityBoost + keywordBoost + positiveBoost;
  
  // Convert to 0-3 scale
  return Math.min(3, Math.max(0, Math.round(totalScore)));
}

// Enhanced main scoring function
export function calculateVisionScores(responses) {
  const scores = {
    writtenVision: responses.hasVision === "written" ? 3 : 
                 responses.hasVision === "inMind" ? 2 : 0,
                 
    actionPlan: responses.hasActionPlan === "yes" ? 3 : 0,
    
    resources: responses.resourcePercentage >= 8 ? 3 :
              responses.resourcePercentage >= 5 ? 2 :
              responses.resourcePercentage >= 2 ? 1 : 0,
              
    skilledManpower: responses.hasSkilledManpower === "yes" ? 3 : 0
  };
  
  // Enhanced sentiment analysis
  const visionSentiment = analyzeVisionSentiment(responses.visionText);
  scores.visionQuality = calculateVisionQualityScore(visionSentiment);
  
  // Generate enhanced advice
  scores.advice = {
    hasVision: generateSentimentAdvice({sentiment: 'neutral'}, 'hasVision', responses.hasVision),
    visionText: generateSentimentAdvice(visionSentiment, 'visionText', responses.visionText),
    hasActionPlan: generateSentimentAdvice({sentiment: 'neutral'}, 'hasActionPlan', responses.hasActionPlan),
    resourcePercentage: generateSentimentAdvice({sentiment: 'neutral'}, 'resourcePercentage', responses.resourcePercentage),
    hasSkilledManpower: generateSentimentAdvice({sentiment: 'neutral'}, 'hasSkilledManpower', responses.hasSkilledManpower)
  };

  // Store enhanced analysis
  scores.sentimentAnalysis = visionSentiment;

  // Calculate totals
  const totalVisionPoints = Object.values(scores).filter(val => typeof val === 'number')
                     .reduce((sum, score) => sum + score, 0);
  scores.percentage = Math.round((totalVisionPoints / mainVisionTotal) * 100);
  
  return {...scores, totalVisionPoints, mainVisionTotal};
}

// Enhanced vision advice function
export function getVisionAdvice(visionText) {
  if (!visionText || visionText.trim().length < 5) {
    return {
      message: "Please provide a more detailed vision statement (minimum 5 words) for meaningful analysis.",
      positiveWords: 0,
      negativeWords: 0,
      comparativeScore: 0,
      visionClarity: 0,
      visionKeywords: 0
    };
  }
  
  const sentiment = analyzeVisionSentiment(visionText);
  return generateSentimentAdvice(sentiment, 'visionText', visionText);
}