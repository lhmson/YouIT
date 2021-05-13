import CuteServerIO from "../CuteServerIO.js";
import { setupDemoOnReceive } from "./demoHanders.js";

/**
 * @param {CuteServerIO} cuteIO 
 */
export const setUpCuteIO = (cuteIO) => {
  setupDemoOnReceive(cuteIO)
}