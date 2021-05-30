import mongoose from "mongoose";

export const groupPendingMemberSchema = mongoose.Schema(
  {
    // groupId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Group",
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
