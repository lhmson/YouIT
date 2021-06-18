import mongoose from "mongoose";

export const postContentSchema = mongoose.Schema(
  {
    overview: {
      type: String,
      require: true,
    },

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