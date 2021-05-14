import CuteServerIO from "../CuteServerIO.js";
import { setupDemoOnReceive } from "./demoHandlers.js";

/**
 * @param {CuteServerIO} cuteIO
 */
export const setUpCuteIO = (cuteIO) => {
  setupDemoOnReceive(cuteIO);
};
