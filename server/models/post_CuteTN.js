import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        privacy: {
            type: String,
            enum: ["Group", "Public", "Private", "Friend"],
            required: true,
        },

        // groupPostInfo: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "GroupPostInfo"
        // }

        // interactionInfo: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "InteractionInfo",
        //     required: true,
        // }
    },
    {
        timestamps: true,
    }
);

var Post = mongoose.model("Post", postSchema);

export default Post;
