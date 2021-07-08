import mongoose from "mongoose";
import { userInfoSchema, defaultUserInfoValue } from "./user_info.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    activated: { type: Boolean, default: false },
    // id: Schema.Types.ObjectId,

    //SanhCute
    avatarUrl: {
      type: String,
      default:
        "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg",
    },
    backgroundUrl: { type: String },
    status: { type: String },
    userType: { type: String },

    userInfo: {
      type: userInfoSchema,
      // required: true,
      default: defaultUserInfoValue,
    },

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
    // friend requests which user receives
    listReceivingFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    // friend requests which user sends to others
    listSendingFriendRequests: [
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

    onlineStatus: {
      type: String,
      enum: ["online", "busy", "offline"],
      default: "online",
    },

    isReported: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "Member",
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
