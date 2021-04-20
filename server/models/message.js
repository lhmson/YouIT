import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    UserIDReceive : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    UserIDSendMess : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Status : { 
        type: String,
        default : "Sending",
    },
    Message : String,
  },
  { timestamps: true }
);

export default messageSchema;
