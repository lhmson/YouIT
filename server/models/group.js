import mongoose from "mongoose";
import { groupPendingMemberSchema } from "./groupPendingMember.js";
import { groupMemberSchema } from "./groupMember.js";
const groupSchema = mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    privacy: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },

    topic: {
      type: String,
      // enum: [
      //   "General",
      //   "Game",
      //   "Language",
      //   "Mobile",
      //   "Web Dev",
      //   "System",
      //   "Jobs",
      //   "Data",
      //   "School",
      // ],
      required: true,
    },

    listMembers: [
      {
        type: groupMemberSchema,
        default: [],
      },
    ],

    listPendingMembers: [
      {
        type: groupPendingMemberSchema,
        default: [],
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
