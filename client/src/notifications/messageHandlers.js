import CuteClientIO from "../socket/CuteClientIO";

/**
 * @param {CuteClientIO} cuteIO
 */
export const handleMessage = (cuteIO) => {
  cuteIO.onReceive("Message-ok", (msg) => {
  });

  cuteIO.onReceive("Message-error", (msg) => {
  });
};