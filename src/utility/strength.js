export function calculateStrengthScores(responses) {
  // 1. Employee Count Scoring (3-0)
  const employeeCountScore = 
    responses.employeeCount >= 20 ? 3 :
    responses.employeeCount >= 10 ? 2 :
    responses.employeeCount >= 2 ? 1 : 0;

  // 2. Employee Skills Scoring (3-0)
  const employeeSkillsScore = 
    responses.skillLevel >= 8 ? 3 :
    responses.skillLevel >= 6 ? 2 :
    responses.skillLevel >= 4 ? 1 : 0;

  // 3. Operational Resilience Scoring (3-0)
  const operationalResilienceScore =
    responses.operationalResilience === "yes" ? 3 :
    responses.operationalResilience === "somewhat" ? 1 : 0;

  // 4. Marketing Plan Scoring (3-0)
  const marketingPlanScore =
    responses.marketingPlan === "yes" ? 3 :
    responses.marketingPlan === "no" ? 1 : 0;

  // 5. Software Usage Scoring (3-0)
  const softwareUsageScore = 
  responses.usesSoftware ==="yes" ? 3 :
  responses.usesSoftware ==="no" ? 0 : 0;

  // Calculate totals
  const totalPoints = employeeCountScore + employeeSkillsScore + 
                     operationalResilienceScore + marketingPlanScore + 
                     softwareUsageScore;
  const percentage = Math.round((totalPoints / 15) * 100);

  return {
    employeeCount: employeeCountScore,
    employeeSkills: employeeSkillsScore,
    operationalResilience: operationalResilienceScore,
    marketingPlan: marketingPlanScore,
    softwareUsage: softwareUsageScore,
    totalPoints,
    percentage
  };
}