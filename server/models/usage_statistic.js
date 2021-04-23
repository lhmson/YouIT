import mongoose from "mongoose";
import usageDaySchema from "./usage_day";

const usageStatisticSchema = mongoose.Schema({
  currentDate: { type: Date },
  lastLogin: { type: Date },
  usageTimeActiveMode: { type: Number },
  notiMode: { type: Boolean },
  listUsageDays: [usageDaySchema],
});

export default mongoose.model("UsageStatistic", usageStatisticSchema);
