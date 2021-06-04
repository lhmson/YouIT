import CuteServerIO from "../CuteServerIO.js";
import { setUpOnReceiveMessages } from "./MessageHandlers.js";
import { isValidUser } from "../../businessLogics/user.js"

/**
 * @param {CuteServerIO} cuteIO
 */
export const setUpCuteIO = (cuteIO) => {
  // setupDemoOnReceive(cuteIO);
  setUpOnReceiveMessages(cuteIO);

  cuteIO.verifyUser = isValidUser;
};
