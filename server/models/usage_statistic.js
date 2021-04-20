import mongoose from "mongoose";
import UsageDay from "./usage_day";

const usageStatisticSchema = mongoose.Schema({
  currentDate: Date,
  lastLogin: Date,
  usageTimeActiveMode: Number,
  notiMode: Boolean,
  listUsageDays: [UsageDay],
});

export default mongoose.model("UsageStatistic", usageStatisticSchema);
