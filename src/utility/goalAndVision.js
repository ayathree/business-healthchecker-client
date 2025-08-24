// Import the sentiment library (make sure to install it first: npm install sentiment)
import Sentiment from 'sentiment';

// Initialize sentiment analyzer once
const sentimentAnalyzer = new Sentiment();

// Helper function to analyze sentiment and extract key metrics (ONLY for text content)
function analyzeVisionSentiment(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      sentiment: 'neutral',
      wordCount: 0,
      hasFutureWords: false,
      hasSpecificWords: false,
      positiveWords: 0,
      negativeWords: 0
    };
  }
  
  // Use the proper sentiment library for accurate analysis
  const result = sentimentAnalyzer.analyze(text);
  
  // Determine sentiment category based on the library's score
  let sentimentCategory = 'neutral';
  if (result.score > 2) sentimentCategory = 'positive';
  else if (result.score < -2) sentimentCategory = 'negative';
  
  // Check for future-oriented and specific language
  const hasFutureWords = /(will|going to|future|next|years|vision|goal|plan|strategy)/i.test(text);
  const hasSpecificWords = /\d+|%|\$|million|thousand|growth|expand|target|objective/i.test(text);
  
  return {
    score: result.score,
    comparative: result.comparative,
    sentiment: sentimentCategory,
    wordCount: result.words.length,
    hasFutureWords,
    hasSpecificWords,
    positiveWords: result.positive.length,
    negativeWords: result.negative.length,
    tokens: result.words // The actual words analyzed
  };
}

// Enhanced SMART criteria detection with sentiment consideration
function evaluateVisionQuality(text, sentimentAnalysis) {
  if (!text || text.trim().length < 10) return 0;
  
  const lowerText = text.toLowerCase();
  
  // SMART component detection
  const smartComponents = {
    specific: /(specific|clear|defined) (goal|vision|plan|objective)/.test(lowerText),
    measurable: /(\d+%|\$|\d+ (customers|units|years)|increase by \d+|double|triple)/.test(lowerText),
    achievable: /(realistic|attainable|achievable|within (our|budget)|feasible)/.test(lowerText),
    relevant: /(align|relevant) (to|with) (our|business|strategy|mission|objectives)/.test(lowerText),
    timebound: /(by \d{4}|in \d+ years|within \d+ months|q[1-4] \d{4}|deadline)/.test(lowerText)
  };

  // Calculate base SMART score (0-3)
  const smartCount = Object.values(smartComponents).filter(Boolean).length;
  let score = Math.min(3, smartCount);

  // Apply sentiment modifiers (only for text content)
  if (sentimentAnalysis.sentiment === 'negative') {
    score = Math.max(0, score - 1);
  } else if (sentimentAnalysis.sentiment === 'positive' && score > 0) {
    score = Math.min(3, score + 0.5);
  }

  // Quality gates
  if (smartCount < 2) return 0;
  if (!smartComponents.measurable && !smartComponents.timebound) return 1;
  
  return score;
}

// Generate advice based on response content (not sentiment for categorical data)
function generateResponseAdvice(question, answer, visionSentiment = null) {
  // Special handling for vision text with proper sentiment analysis
  if (question === 'visionText') {
    if (!answer || answer.trim().length < 10) {
      return "Your vision seems brief. Consider expanding it with more details about where you want to be in 3-5 years.";
    }
    
    // Use the actual sentiment analysis for vision text
    if (visionSentiment) {
      if (visionSentiment.sentiment === 'negative') {
        return "Your vision seems to carry some concerns. It's normal to feel uncertain about the future. Consider breaking your vision into smaller, achievable milestones to build confidence.";
      } else if (visionSentiment.sentiment === 'positive') {
        if (visionSentiment.wordCount > 20 && visionSentiment.hasFutureWords && visionSentiment.hasSpecificWords) {
          return "Excellent vision statement! It's detailed, future-oriented, and specific. This kind of clarity will guide your business effectively.";
        }
        return "Your vision shows great enthusiasm! Adding specific, measurable targets could make it even more powerful.";
      }
    }
    
    return "Your vision appears practical. Ensure it includes specific goals and timelines for better focus.";
  }
  
  // Advice for other questions based on their actual values (not sentiment)
  const adviceMap = {
    'hasVision': {
      'written': 'Great job having a written vision! Documented goals are 42% more likely to be achieved.',
      'inMind': 'Consider documenting your vision. Written goals are much more effective than mental plans.',
      'noUnderstanding': "It's important to understand SMART goals. Consider learning about specific, measurable, achievable, relevant, and time-bound goals.",
      'default': 'Having a clear vision is crucial for business success.'
    },
    'hasActionPlan': {
      'yes': 'Strong planning! Consistent execution separates dreams from reality.',
      'no': 'Action planning is essential. Begin with just the next 90 days instead of planning too far ahead.',
      'default': 'A good action plan turns vision into achievable steps.'
    },
    'resourcePercentage': {
      'high': (value) => `Excellent resource allocation (${value}/10)! You're well-prepared to execute your vision.`,
      'medium': (value) => `Moderate resources (${value}/10). Focus on strategic allocation and prioritization.`,
      'low': (value) => `Limited resources (${value}/10). Consider creative solutions and phased implementation.`,
      'default': (value) => `Resource assessment score: ${value}/10. Regular audits help optimize what you have.`
    },
    'hasSkilledManpower': {
      'yes': 'Strong team foundation! Invest in your people—they build your future.',
      'no': 'Team capabilities are important. Consider skills development before new hiring.',
      'default': 'The right team is essential for achieving your vision.'
    }
  };
  
  // Generate appropriate advice based on question type
  switch (question) {
    case 'hasVision':
    case 'hasActionPlan':
    case 'hasSkilledManpower':
      return adviceMap[question][answer] || adviceMap[question]['default'];
    
    case 'resourcePercentage':
      const numValue = parseInt(answer) || 0;
      let level = 'low';
      if (numValue >= 8) level = 'high';
      else if (numValue >= 5) level = 'medium';
      
      const adviceFunc = adviceMap[question][level] || adviceMap[question]['default'];
      return adviceFunc(numValue);
    
    default:
      return `Thank you for your response about ${question}.`;
  }
}

// Main scoring function with proper sentiment analysis
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
  
  // Analyze sentiment ONLY for vision text (where it makes sense)
  const visionSentiment = analyzeVisionSentiment(responses.visionText);
  scores.visionQuality = evaluateVisionQuality(responses.visionText, visionSentiment);
  scores.sentiment = visionSentiment; // Store for the vision text only
  
  // Generate appropriate advice for each field
  scores.advice = {
    hasVision: generateResponseAdvice('hasVision', responses.hasVision),
    visionText: generateResponseAdvice('visionText', responses.visionText, visionSentiment),
    hasActionPlan: generateResponseAdvice('hasActionPlan', responses.hasActionPlan),
    resourcePercentage: generateResponseAdvice('resourcePercentage', responses.resourcePercentage),
    hasSkilledManpower: generateResponseAdvice('hasSkilledManpower', responses.hasSkilledManpower)
  };

  // Calculate totals
  const totalPoints = Object.values(scores).filter(val => typeof val === 'number')
                     .reduce((sum, score) => sum + score, 0);
  scores.percentage = Math.round((totalPoints / 15) * 100);
  
  return {...scores, totalPoints};
}