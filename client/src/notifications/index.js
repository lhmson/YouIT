import CuteClientIO from "../socket/CuteClientIO"
import { handleSignInOutBrowser } from "./authHandlers"

/**
 * @param {CuteClientIO} cuteIO
 */
export const handleNewIOConnection = (cuteIO) => {
  handleSignInOutBrowser(cuteIO);
}