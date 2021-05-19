import CuteClientIO from "../socket/CuteClientIO"
import { notifyOnUpvote } from "./postHandlers"

/**
 * @param {CuteClientIO} cuteIO
 */
export const handleNewIOConnection = (cuteIO) => {
  notifyOnUpvote(cuteIO);
}