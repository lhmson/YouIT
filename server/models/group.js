import mongoose from "mongoose";
import {
  interactionInfoSchema,
  defaultInteractionInfoValue,
} from "./interactionInfo.js";

const groupSchema = mongoose.Schema(
  {
    privacy: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },

    topic: {
      type: String,
      enum: [
        "General",
        "Game",
        "Language",
        "Mobile",
        "Web Dev",
        "System",
        "Jobs",
        "Data",
        "School",
      ],
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
