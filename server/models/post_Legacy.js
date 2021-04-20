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
      type: String,
    },
    // tags: {
    //   type: [String],
    // },
    selectedFile: {
      type: String,
    },
    likes: {
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
