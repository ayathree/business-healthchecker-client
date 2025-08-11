// Helper function to count SMART criteria in vision text
function countSMARTCriteria(text) {
  if (!text) return 0;
  const lowerText = text.toLowerCase();
  let count = 0;
  
  // Check for each SMART component
  if (/(specific|clear|defined)/.test(lowerText)) count++;
  if (/(measur|number|%|growth|amount)/.test(lowerText)) count++;
  if (/(achiev|realistic|attain|possible)/.test(lowerText)) count++;
  if (/(relevant|align|business|company)/.test(lowerText)) count++;
  if (/(year|month|202|203|time|period)/.test(lowerText)) count++;
  
  return count;
}

// Main scoring function
export function calculateVisionScores(responses) {
  const scores = {
    writtenVision: responses.hasVision === "written" ? 3 : 
                 responses.hasVision === "inMind" ? 2 : 0,
                 
    visionQuality: Math.min(3, countSMARTCriteria(responses.visionText)),
    
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