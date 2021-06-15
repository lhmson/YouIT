import mongoose from "mongoose";

const reportUserSchema = mongoose.Schema(
  {
    userReportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "accept", "deny"],
      default: "pending",
    },
  },
  { timestamps: true }
);

var ReportUser = mongoose.model("ReportUser", reportUserSchema);

export default ReportUser;
