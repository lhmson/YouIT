import mongoose from "mongoose";
import messageSchema from "./message.js";

const messageRoomSchema = mongoose.Schema(
  {
    kind: { type: String, default: "friend" },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    seenMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    seenMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    message: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("MessageRoom", messageRoomSchema);
