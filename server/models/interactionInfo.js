import mongoose from "mongoose";

const mongooseObjId = mongoose.Schema.Types.ObjectId;

export const defaultInteractionInfoValue = {
  listUpvotes: [],
  listDownvotes: [],
  listReactions: new mongoose.Types.Map(),
  listUsersHiding: [],
  listUsersFollowing: [],
};

export const interactionInfoSchema = mongoose.Schema(
  {
    listUpvotes: {
      type: [mongooseObjId],
      required: true,
      default: [],
      ref: "User",
    },
    listDownvotes: {
      type: [mongooseObjId],
      required: true,
      default: [],
      ref: "User",
    },
    listReactions: {
      type: Map,
      of: String,
      required: true,
    },
    listUsersHiding: {
      type: [mongooseObjId],
      required: true,
      default: [],
      ref: "User",
    },
    listUsersFollowing: {
      type: [mongooseObjId],
      required: true,
      default: [],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
