import mongoose from "mongoose";

export const postContentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: false,
    },

    pinnedUrl: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  });