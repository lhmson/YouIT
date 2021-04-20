import mongoose from "mongoose";
import messageSchema from "./message.js"

const messageRoomSchema = mongoose.Schema(
  {
    Type : { type: String, default: "friend" },
    Members : [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    SeenMembers : [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    SeenMembers : [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    Message : [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("MessageRoom", messageRoomSchema);
