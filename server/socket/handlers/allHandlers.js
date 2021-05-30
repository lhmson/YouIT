import CuteServerIO from "../CuteServerIO.js";
import { setUpOnReceiveMessages } from "./MessageHandlers.js";

/**
 * @param {CuteServerIO} cuteIO
 */
export const setUpCuteIO = (cuteIO) => {
  // setupDemoOnReceive(cuteIO);
  setUpOnReceiveMessages(cuteIO);
};
