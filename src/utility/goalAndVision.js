// Import the sentiment library
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

const mainTotal=15

// Helper function to analyze sentiment using the library's full capabilities
function analyzeVisionSentiment(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      comparative: 0,
      sentiment: 'neutral',
      positiveWords: [],
      negativeWords: [],
      tokenCount: 0
    };
  }
  
  // Let the sentiment library do ALL the work automatically
  const result = sentimentAnalyzer.analyze(text);
  
  // Determine sentiment category based on the library's comprehensive analysis
  let sentimentCategory = 'neutral';
  if (result.comparative > 0.05) sentimentCategory = 'positive';
  else if (result.comparative < -0.05) sentimentCategory = 'negative';
  
  return {
    score: result.score,
    comparative: result.comparative, // This is the score per word (most important)
    sentiment: sentimentCategory,
    positiveWords: result.positive, // Library-detected positive words
    negativeWords: result.negative, // Library-detected negative words
    tokenCount: result.words.length,
    tokens: result.words
  };
}

// Generate advice based PURELY on automatic sentiment analysis
function generateSentimentAdvice(sentimentAnalysis, question, answer) {
  // For vision text - use ONLY the automatic sentiment analysis
  if (question === 'visionText') {
    const { sentiment, comparative, positiveWords, negativeWords, tokenCount } = sentimentAnalysis;
    
    if (sentiment === 'negative') {
      return {
        message: "Your vision carries some concerning tones. The sentiment analysis detected more negative language. Consider focusing on opportunities and strengths rather than challenges.",
        positiveWords: positiveWords.length,
        negativeWords: negativeWords.length,
        comparativeScore: comparative.toFixed(3)
      };
    } else if (sentiment === 'positive') {
      return {
        message: "Excellent vision statement! The sentiment analysis detected strong positive language that will inspire and motivate your team.",
        positiveWords: positiveWords.length,
        negativeWords: negativeWords.length,
        comparativeScore: comparative.toFixed(3)
      };
    } else {
      return {
        message: "Your vision appears balanced and practical. The sentiment is neutral, which suggests a factual rather than emotional approach.",
        positiveWords: positiveWords.length,
        negativeWords: negativeWords.length,
        comparativeScore: comparative.toFixed(3)
      };
    }
  }
  
  // For other questions, use simple value-based advice
  const adviceMap = {
    'hasVision': {
      'written': 'Great job having a written vision! Documented goals are 42% more likely to be achieved.',
      'inMind': 'Consider documenting your vision. Written goals are much more effective than mental plans.',
      'noUnderstanding': "It's important to understand SMART goals for effective vision setting."
    },
    'hasActionPlan': {
      'yes': 'Strong planning! Consistent execution separates dreams from reality.',
      'no': 'Action planning is essential. Begin with just the next 90 days.'
    },
    'resourcePercentage': (value) => {
      const numValue = parseInt(value) || 0;
      return `Resource assessment: ${numValue}/10. ${numValue >= 7 ? 'Good resource awareness!' : 'Focus on strategic allocation.'}`;
    },
    'hasSkilledManpower': {
      'yes': 'Strong team foundation! Invest in your people—they build your future.',
      'no': 'Team capabilities are important. Consider skills development before new hiring.'
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
    comparativeScore: 0 
  };
}

// Vision quality scoring based PURELY on automatic sentiment analysis
function calculateVisionQualityScore(sentimentAnalysis) {
  const { comparative } = sentimentAnalysis;
  
  // Convert comparative score (-inf to +inf) to a 0-3 scale
  if (comparative > 0.1) return 3;    // Very positive
  if (comparative > 0.05) return 2;   // Positive
  if (comparative > -0.05) return 1;  // Neutral
  return 0;                            // Negative
}

// Main scoring function with AUTOMATIC sentiment analysis
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
  
  // Analyze sentiment AUTOMATICALLY for vision text
  const visionSentiment = analyzeVisionSentiment(responses.visionText);
  scores.visionQuality = calculateVisionQualityScore(visionSentiment);
  
  // Generate advice for each field
  scores.advice = {
    hasVision: generateSentimentAdvice({sentiment: 'neutral'}, 'hasVision', responses.hasVision),
    visionText: generateSentimentAdvice(visionSentiment, 'visionText', responses.visionText),
    hasActionPlan: generateSentimentAdvice({sentiment: 'neutral'}, 'hasActionPlan', responses.hasActionPlan),
    resourcePercentage: generateSentimentAdvice({sentiment: 'neutral'}, 'resourcePercentage', responses.resourcePercentage),
    hasSkilledManpower: generateSentimentAdvice({sentiment: 'neutral'}, 'hasSkilledManpower', responses.hasSkilledManpower)
  };

  // Store the full sentiment analysis for debugging
  scores.sentimentAnalysis = visionSentiment;

  // Calculate totals
  const totalPoints = Object.values(scores).filter(val => typeof val === 'number')
                     .reduce((sum, score) => sum + score, 0);
  scores.percentage = Math.round((totalPoints / mainTotal) * 100);
  
  return {...scores, totalPoints, mainTotal};
}

// Simple function to get vision advice
export function getVisionAdvice(visionText) {
  if (!visionText || visionText.trim().length < 5) {
    return {
      message: "Please provide a more detailed vision statement for analysis.",
      positiveWords: 0,
      negativeWords: 0,
      comparativeScore: 0
    };
  }
  
  const sentiment = analyzeVisionSentiment(visionText);
  return generateSentimentAdvice(sentiment, 'visionText', visionText);
}