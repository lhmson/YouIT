import mongoose from "mongoose";

export const defaultUserInfoValue = {
  // firstName: "default",
  // lastName: "default",
  // dateOfBirth: new Date(),
  gender: "Male",
};

const workSchema = mongoose.Schema(
  {
    location: { type: String },
    position: { type: String },
  },
  { timestamps: true }
);

const educationSchema = mongoose.Schema(
  {
    schoolName: { type: String },
    moreInfo: { type: String },
  },
  { timestamps: true }
);

export const userInfoSchema = mongoose.Schema(
  {
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    phone: { type: String },
    workLocation: { type: String },
    address: { type: String },
    programmingHashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    hobbyHashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
    educations: [{ type: educationSchema }],
    works: [{ type: workSchema }],
    description: { type: String },
  },
  { timestamps: true }
);

// var UserInfo = mongoose.model("UserInfo", userInfoSchema);

// export default UserInfo;
