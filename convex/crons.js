import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Check for scheduled articles every hour
crons.interval(
  "process-scheduled-articles", 
  { hours: 1 },
  internal.generateNews.processScheduledArticles
);

export default crons;