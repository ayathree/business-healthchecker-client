export function calculateInfrastructureScores(formData) {
  const scores = {
    tradeLicense: 0,
    bankAccount: 0,
    officeShowroom: 0,
    website: 0,
    socialMedia: 0,
    marketplace: 0,
    totalPoints: 0,
    percentage: 0
  };

  // 2.1 Trade License
  if (formData.tradeLicense === 'Yes') scores.tradeLicense = 3;
  else if (formData.tradeLicense === 'Yes, but it is not updated') scores.tradeLicense = 2;
  else if (formData.tradeLicense === 'No') scores.tradeLicense = 0;

  // 2.2 Bank Account
  scores.bankAccount = formData.bankAccount === 'Yes' ? 3 : 0;

  // 2.3 Office/Showroom
  scores.officeShowroom = formData.officeShowroom === 'Yes' ? 3 : 0;

  // 2.4 Website
  scores.website = formData.website === 'Yes' ? 3 : 0;

  // 2.5 Social Media
  const socialMediaCount = formData.socialMedia?.length || 0;
  if (socialMediaCount >= 4) scores.socialMedia = 3;
  else if (socialMediaCount >= 2) scores.socialMedia = 2;
  else if (socialMediaCount === 1) scores.socialMedia = 1;

  // 2.6 Marketplace
  scores.marketplace = formData.marketplace === 'Yes' ? 3 : 0;

  // Calculate totals
  scores.totalPoints = Object.values(scores).slice(0, 6).reduce((a, b) => a + b, 0);
  scores.percentage = Math.round((scores.totalPoints / 18) * 100); // 6 questions × 3 points

  return scores;
}