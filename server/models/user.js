import mongoose from "mongoose";
import { userInfoSchema } from "./user_info";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // id: Schema.Types.ObjectId,

    //SanhCute
    avatarURL: { type: String },
    status: { type: String },
    userType: { type: String },

    userInfo: userInfoSchema,

    usageStatistics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsageStatistics",
    },

    listFriends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    listFriendSendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    listFriendFollows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listBlockings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listBlockers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listActivityLogItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActivityLogItem",
      },
    ],
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
