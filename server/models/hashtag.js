import mongoose from "mongoose";

const hashtagSchema = mongoose.Schema({
  name: { type: String, require: true },
  iconUrl: String,
  count: Number,
  kind: String,
});

export default mongoose.model("Hashtag", hashtagSchema);
