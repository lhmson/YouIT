import CuteClientIO from "../socket/CuteClientIO";

/**
 * @param {CuteClientIO} cuteIO
 */
export const notifyOnUpvote = (cuteIO) => {
  cuteIO.onReceive("UpvotePost_PostOwner", (msg) => {
    const { upvoter, post } = msg;
    // just a test socket.io client
    alert(`user ${upvoter} just upvote your post!`);
  });
};
