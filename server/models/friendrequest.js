import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    userConfirmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userSendRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FriendRequest", friendRequestSchema);
