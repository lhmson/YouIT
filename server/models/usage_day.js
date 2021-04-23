import mongoose from "mongoose";

const usageDaySchema = mongoose.Schema({
  date: { type: Date },
  timeUsage: { type: Number },
});

export default mongoose.model("UsageDay", usageDaySchema);
