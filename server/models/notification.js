import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  link: { type: String, require: true },
  content: String,
  avatarUrl: String,
  Kind: String,
});

export default mongoose.model("Notification", notificationSchema);
