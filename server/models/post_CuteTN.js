import mongoose from "mongoose";
import { interactionInfoSchema, defaultInteractionInfoValue } from "./interactionInfo.js";

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

        interactionInfo: {
            type: interactionInfoSchema,
            required: true,
            default: defaultInteractionInfoValue,
        }
    },
    {
        timestamps: true,
    }
);

var Post = mongoose.model("Post", postSchema);

export default Post;
