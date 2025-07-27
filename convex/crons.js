import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Check for scheduled articles every hour
crons.interval(
  "process-scheduled-articles", 
  { hours: 1 },
  internal.generateNews.processScheduledArticles
);

// Generate daily digest once per day at 6 AM UTC
crons.daily(
  "generate-daily-digest",
  { hourUTC: 6, minuteUTC: 0 },
  internal.generateDailyDigest.generateDailyDigest
);

export default crons;