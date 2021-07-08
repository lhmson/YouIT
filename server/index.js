import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import createError from "http-errors";

import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cloudinary from "cloudinary";
const cloudinaryv2 = cloudinary.v2;
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import userRouter from "./routes/user.js";
import userInfoRouter from "./routes/user_info.js";
import groupRouter from "./routes/group.js";
import searchRouter from "./routes/search.js";
import friendRequestRouter from "./routes/friendRequest.js";
import notificationRouter from "./routes/notification.js";
import conversationRouter from "./routes/conversation.js";
import reportUserRouter from "./routes/report.js";
import CuteServerIO from "./socket/CuteServerIO.js";
import friendRouter from "./routes/friend.js";
import hashtagRouter from "./routes/hashtag.js";
import uploadRouter from "./routes/upload.js";

import { setUpCuteIO } from "./socket/handlers/allHandlers.js";
import UsersStatusManager from "./businessLogics/userStatus.js";
import { notifyUserStatusToFriendsFunc } from "./businessLogics/user.js";
import { setAllDatabaseCleaners } from "./businessLogics/setAllDatabaseCleaners.js";

dotenv.config();

const app = express();

// socket io set up
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", //"http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

export const cuteIO = new CuteServerIO(io);
export const usersStatusManager = new UsersStatusManager();
usersStatusManager.init(cuteIO);
usersStatusManager.onUserStatusChange(notifyUserStatusToFriendsFunc(cuteIO));
setUpCuteIO(cuteIO);
cuteIO.start();

setAllDatabaseCleaners();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
// const __dirname = path.resolve(
//   path.dirname(decodeURI(new URL(import.meta.url).pathname))
// );
// app.use(express.static(path.join(__dirname, "public")));

cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/userInfo", userInfoRouter);
app.use("/group", groupRouter);
app.use("/search", searchRouter);
app.use("/friendRequest", friendRequestRouter);
app.use("/notification", notificationRouter);
app.use("/friend", friendRouter);
app.use("/conversation", conversationRouter);
// app.use("/groupPendingMember", groupPendingMemberRouter);
app.use("/hashtag", hashtagRouter);
app.use("/upload", uploadRouter);
app.use("/report", reportUserRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
