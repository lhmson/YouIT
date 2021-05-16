import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      // require: true
    },
    image: {
      type: String,
    },
    kind: {
      type: String,
      require: true,
    },
    seen: {
      type: Boolean,
      require: true,
      default: false,
    },
    link: {
      type: String,
      // require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
