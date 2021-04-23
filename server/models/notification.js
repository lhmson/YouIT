import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  link: { type: String, require: true },
  content: { type: String },
  avatarUrl: { type: String },
  kind: { type: String },
});

export default mongoose.model("Notification", notificationSchema);
