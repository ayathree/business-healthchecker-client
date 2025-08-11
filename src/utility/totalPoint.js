import { calculateVisionScores } from "./goalAndVision";
import { calculateMarketScores } from "./scoreCalculation";

export function getFinalTotal(allResponses) {
  const vision = calculateVisionScores(allResponses.vision).totalPoints;
  const market = calculateMarketScores(allResponses.market).totalPoints;
  // ...other categories...
  
  return vision + market; // + other categories
}