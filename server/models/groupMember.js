import mongoose from "mongoose";

export const groupMemberSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Owner", "Admin", "Moderator", "Member"],
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
