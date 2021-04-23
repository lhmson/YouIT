import mongoose from "mongoose";
import usageDaySchema from "./usage_day";

const usageStatisticSchema = mongoose.Schema({
  currentDate: Date,
  lastLogin: Date,
  usageTimeActiveMode: Number,
  notiMode: Boolean,
  listUsageDays: [usageDaySchema],
});

export default mongoose.model("UsageStatistic", usageStatisticSchema);
