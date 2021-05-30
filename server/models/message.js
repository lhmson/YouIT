import mongoose from "mongoose";

export const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: {
      type: String
    },
  },
  { timestamps: true }
);
