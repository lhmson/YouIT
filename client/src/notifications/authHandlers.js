import CuteClientIO from "../socket/CuteClientIO";

/**
 * @param {CuteClientIO} cuteIO
 */
export const handleSignInOutBrowser = (cuteIO) => {

  // force this tab to log out if the token is invalid
  cuteIO.onReceive("System-InvalidToken", (msg) => {
    if (msg.enableAlert)
      alert("Session expired! Please log in again!");

    localStorage.removeItem("user");
    window.location.reload();
  });


  // force this tab to reload if the user has signed in to this browser
  cuteIO.onReceive("System-SignedIn", (msg) => {
    localStorage.setItem("user",
      JSON.stringify({
        token: msg?.token,
        result: {
          name: msg?.result?.name,
          _id: msg?.result?._id,
          // avatarUrl: action?.data.result.avatarUrl,
        },
      })
    );

    window.location.reload();
  });
};