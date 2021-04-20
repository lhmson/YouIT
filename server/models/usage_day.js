import mongoose from "mongoose";

const usageDaySchema = mongoose.Schema({
  date: Date,
  timeUsage: Number,
});

export default mongoose.model("UsageDay", usageDaySchema);
