import mongoose from "mongoose";

export const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Sending", "Sent", "Seen"],
      default: "Sending",
    },

    text: {
      type: String
    },
  },
  { timestamps: true }
);
