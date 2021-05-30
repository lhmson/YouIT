import mongoose from "mongoose";
import { messageSchema } from "./message.js";

const conversationSchema = mongoose.Schema(
  {
    listOwners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    listMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    listSeenMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    listMessages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      }
    ],
  },
  {
    timestamps: true
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
