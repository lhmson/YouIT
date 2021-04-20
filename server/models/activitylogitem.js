import mongoose from "mongoose";

const activityLogItemSchema = mongoose.Schema(
  {
    Content: { type: String},
    PostID : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    Kind : { type: String},
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLogItem", activityLogItemSchema);
