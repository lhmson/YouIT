import mongoose from "mongoose";

export const userInfoSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    workLocation: { type: String },
    address: { type: String },
    languageProgrammingHashtags: [
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
    educations: [{ type: String }],
    works: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true }
);

// var UserInfo = mongoose.model("UserInfo", userInfoSchema);

// export default UserInfo;
