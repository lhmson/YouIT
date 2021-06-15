import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    userReportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
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
    kind: {
      type: String,
      enum: ["user", "post", "group"],
      required: true,
    },
  },
  { timestamps: true }
);

var Report = mongoose.model("Report", reportSchema);

export default Report;
