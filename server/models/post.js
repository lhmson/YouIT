import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    creator: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    selectedFile: {
      type: String,
    },
    upvoters: {
      type: [String],
      default: [],
    },
    downvoters: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

var Post = mongoose.model("Post", postSchema);

export default Post;
