import mongoose from "mongoose";
import Message from "./message.js";

const conversationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: false,
    },

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
      },
    ],

    messageUpdatedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.post('findOneAndDelete', async (doc) => {
  await doc?.listMessages?.forEach(async msg => {
    await Message.findByIdAndDelete(msg)
  });
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
