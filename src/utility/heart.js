export function calculateHeartScores(formData) {
  const scores = {
    uniqueFeatures: 0,
    customerSatisfaction: 0,
    packagingBranding: 0,
    pricingPolicy: 0,
    dateLabeling: 0,
    totalPoints: 0,
    percentage: 0
  };

  // 7.1 Unique Features
  if (formData.uniqueFeatures === "yes") scores.uniqueFeatures = 3;
  else if (formData.uniqueFeatures === "no") scores.uniqueFeatures = 1;

  // 7.2 Customer Satisfaction
  if (formData.customerSatisfaction === "yes") scores.customerSatisfaction = 3;
  else if (formData.customerSatisfaction === "somewhat") scores.customerSatisfaction = 2;
  else if (formData.customerSatisfaction === "no") scores.customerSatisfaction = 1;

  // 7.3 Packaging Branding
  if (formData.packagingBranding === "custom") scores.packagingBranding = 3;
  else if (formData.packagingBranding === "stickers") scores.packagingBranding = 2;
  else if (formData.packagingBranding === "market") scores.packagingBranding = 1;

  // 7.4 Pricing Policy
  if (formData.pricingPolicy === "smart") scores.pricingPolicy = 3;
  else if (formData.pricingPolicy === "costPlus") scores.pricingPolicy = 2;
  else if (formData.pricingPolicy === "no") scores.pricingPolicy = 1;

  // 7.5 Date Labeling
  if (formData.dateLabeling === "yes") scores.dateLabeling = 3;
  else if (formData.dateLabeling === "never") scores.dateLabeling = 2;
  else if (formData.dateLabeling === "no") scores.dateLabeling = 1;

  // Calculate total and percentage
const totalPoints = 
    scores.uniqueFeatures +
    scores.customerSatisfaction +
    scores.packagingBranding +
    scores.pricingPolicy +
    scores.dateLabeling;
    
  scores.percentage = Math.round((totalPoints / 15) * 100);

  return{...scores, totalPoints};
}