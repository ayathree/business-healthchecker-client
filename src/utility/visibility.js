export function calculateVisibilityScores(formData) {
  const scores = {
    facebookLikes: 0,
    instagramFollowers: 0,
    youtubeSubscribers: 0,
    postReach: 0,
    totalPoints: 0,
    percentage: 0
  };

  // 8.1 Facebook Likes
  const fbLikes = parseInt(formData.facebookLikes) || 0;
  if (fbLikes > 10000) scores.facebookLikes = 3;
  else if (fbLikes >= 1000) scores.facebookLikes = 2;
  else if (fbLikes >= 100) scores.facebookLikes = 1;

  // 8.2 Instagram Followers
  const instaFollowers = parseInt(formData.instagramFollowers) || 0;
  if (instaFollowers > 5000) scores.instagramFollowers = 3;
  else if (instaFollowers >= 500) scores.instagramFollowers = 2;
  else if (instaFollowers >= 100) scores.instagramFollowers = 1;

  // 8.3 YouTube Subscribers
  const ytSubs = parseInt(formData.youtubeSubscribers) || 0;
  if (ytSubs > 1000) scores.youtubeSubscribers = 3;
  else if (ytSubs >= 100) scores.youtubeSubscribers = 2;
  else if (ytSubs >= 10) scores.youtubeSubscribers = 1;

  // 8.4 Post Reach
  const reach = parseInt(formData.postReach) || 0;
  if (reach > 5000) scores.postReach = 3;
  else if (reach >= 500) scores.postReach = 2;
  else if (reach >= 50) scores.postReach = 1;

  // Calculate totals
  const totalPoints = scores.facebookLikes + scores.instagramFollowers + 
                      scores.youtubeSubscribers + scores.postReach;
  scores.percentage = Math.round((totalPoints / 12) * 100);

  return {...scores, totalPoints};
}