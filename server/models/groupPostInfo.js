import mongoose from "mongoose";

export const groupPostInfoSchema = mongoose.Schema(
  {
    groupId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Group",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Reject"],
      require: true,
      default: "Pending",
    }
  },
  {
    timestamps: true,
  }
)