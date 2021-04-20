import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    UserConfirmID : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    UserSendRequestID : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FriendRequest", friendRequestSchema);
