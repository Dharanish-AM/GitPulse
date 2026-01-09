// Streak calculation utilities

interface ContributionData {
  date: string;
  count: number;
}

export function calculateStreak(contributions: ContributionData[]) {
  let currentStreak = 0;
  let longestStreak = 0;

  for (const contrib of contributions) {
    if (contrib.count > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  // Grace period: If today has 0 contributions, check if we had a streak yesterday.
  // "Current Streak" usually means "active streak". If I haven't coded *yet* today,
  // my streak from yesterday is still valid until the end of the day.
  if (
    contributions.length > 0 &&
    contributions[contributions.length - 1].count === 0 &&
    currentStreak === 0
  ) {
    // Re-calculate streak excluding the last day (today)
    let prevStreak = 0;
    for (let i = 0; i < contributions.length - 1; i++) {
      if (contributions[i].count > 0) {
        prevStreak++;
      } else {
        prevStreak = 0;
      }
    }
    // If we had a streak ending yesterday, claim it as valid.
    if (prevStreak > 0) {
      currentStreak = prevStreak;
    }
  }

  return { currentStreak, longestStreak };
}
