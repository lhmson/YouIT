import mongoose from "mongoose";
import {
  interactionInfoSchema,
  defaultInteractionInfoValue,
} from "./interactionInfo.js";

import {
  addInteraction,
  getInteractionOfAUser,
  removeInteraction,
} from "../businessLogics/post.js";

export const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quotedCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    interactionInfo: {
      type: interactionInfoSchema,
      required: true,
      default: defaultInteractionInfoValue,
    },
    contentUpdatedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

var Comment = mongoose.model("Comment", commentSchema);

export default Comment;
