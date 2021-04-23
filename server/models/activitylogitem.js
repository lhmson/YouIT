import mongoose from "mongoose";

const activityLogItemSchema = mongoose.Schema(
  {
    content: { type: String },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    kind: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLogItem", activityLogItemSchema);
