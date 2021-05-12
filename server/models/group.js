import mongoose from "mongoose";
import {
  interactionInfoSchema,
  defaultInteractionInfoValue,
} from "./interactionInfo.js";

const groupSchema = mongoose.Schema(
  {
    Mode: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },

    listMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    name: { type: String, required: true },
    backgroundURL: { type: String },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

var Group = mongoose.model("Group", groupSchema);

export default Group;
