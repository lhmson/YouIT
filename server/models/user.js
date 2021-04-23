import mongoose from "mongoose";
import userInfoSchema, { defaultUserInfoValue } from "./user_info.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // id: Schema.Types.ObjectId,

    //SanhCute
    AvatarURL: { type: String },
    Status: { type: String },
    UserType: { type: String },

    userInfo: {
      type: userInfoSchema,
      required: true,
      default: defaultUserInfoValue,
    },

    UsageStatistics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsageStatistics",
    },

    ListFriends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ListFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    ListFriendSendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    ListFriendFollows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ListBlockings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ListBlockers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ListActivityLogItems: [
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
