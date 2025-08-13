// Helper function to count SMART criteria in vision text
function evaluateVisionQuality(text) {
  if (!text || text.trim().length < 20) return 0;
  
  const lowerText = text.toLowerCase();
  
  // 1. Enhanced SMART component detection
  const smartComponents = {
    specific: /(specific|clear|defined) (goal|vision|plan|objective)/.test(lowerText),
    measurable: /(\d+%|\$|\d+ (customers|units|years)|increase by \d+|double|triple)/.test(lowerText),
    achievable: /(realistic|attainable|achievable|within (our|budget)|feasible)/.test(lowerText),
    relevant: /(align|relevant) (to|with) (our|business|strategy|mission|objectives)/.test(lowerText),
    timebound: /(by \d{4}|in \d+ years|within \d+ months|q[1-4] \d{4}|deadline)/.test(lowerText)
  };

  // 2. Sentiment analysis
  const isPositive = /(success|achieve|growth|profit|improve|positive)/.test(lowerText);
  const isNegative = /(fail|decline|loss|problem|negative|decrease)/.test(lowerText);

  // 3. Calculate base SMART score (0-3)
  const smartCount = Object.values(smartComponents).filter(Boolean).length;
  let score = Math.min(3, smartCount);

  // 4. Apply sentiment modifiers
  if (isNegative) {
    score = Math.max(0, score - 1); // Downgrade negative statements
  } else if (isPositive && score > 0) {
    score = Math.min(3, score + 1); // Upgrade positive statements
  }

  // 5. Quality gates for minimum viable vision
  if (smartCount < 2) return 0; // Not a real vision statement
  if (!smartComponents.measurable && !smartComponents.timebound) return 1; // Too vague
  
  return score;
}

// Main scoring function
export function calculateVisionScores(responses) {
  const scores = {
    writtenVision: responses.hasVision === "written" ? 3 : 
                 responses.hasVision === "inMind" ? 2 : 0,
                 
    visionQuality: evaluateVisionQuality(responses.visionText),
    
    actionPlan: responses.hasActionPlan === "yes" ? 3 : 0,
    
    resources: responses.resourcePercentage >= 8 ? 3 :
              responses.resourcePercentage >= 5 ? 2 :
              responses.resourcePercentage >= 2 ? 1 : 0,
              
    skilledManpower: responses.hasSkilledManpower === "yes" ? 3 : 0
  };

  // Calculate totals
  const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);
  scores.percentage = Math.round((totalPoints / 15) * 100);
  
  return {...scores,totalPoints};
}

// Interpretation helper
// export function getVisionInterpretation(percentage) {
//   if (percentage >= 85) return "Excellent vision and planning";
//   if (percentage >= 70) return "Strong vision foundation";
//   if (percentage >= 50) return "Basic vision established";
//   if (percentage >= 30) return "Needs significant improvement";
//   return "Critical: Immediate attention required";
// }