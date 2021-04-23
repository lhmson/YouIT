import mongoose from "mongoose";

const hashtagSchema = mongoose.Schema({
  name: { type: String, require: true },
  iconUrl: { type: String },
  count: { type: Number },
  kind: { type: String },
});

export default mongoose.model("Hashtag", hashtagSchema);
