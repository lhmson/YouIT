import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    userIdReceive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userIdSendMess: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Sending",
    },
    message: { type: String },
  },
  { timestamps: true }
);

export default messageSchema;
