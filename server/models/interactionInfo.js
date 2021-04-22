import mongoose from "mongoose";

const mongooseObjId = mongoose.Schema.Types.ObjectId

const interactionInfoSchema = mongoose.Schema(
    {
        listUpvotes: {
            type: [mongooseObjId],
            required: true,
            default: [],
            ref: "User",
        },
        listDownvotes: {
            type: [mongooseObjId],
            required: true,
            default: [],
            ref: "User",
        },
        listReactions: {
            type: Map,
            of: string,
            required: true,
        },
        listUsersHiding: {
            type: [mongooseObjId],
            required: true,
            default: [],
            ref: "User",
        },
        listUsersFollowing: {
            type: [mongooseObjId],
            required: true,
            default: [],
            ref: "User",
        },
    {
        timestamps: true,
    }
);

var InteractionInfo = mongoose.model("InteractionInfo", interactionInfoSchema);

export default InteractionInfo;
