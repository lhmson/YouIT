import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    workLocation: String,
    address: String,
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
    educations: [String],
    works: [String],
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", userInfoSchema);
