/** The calling order of auth is annoying, so I (CuteTN) use this function to force the token to be updated.   
 *  WARNING: you will have to guarantee that the token has changed!
 */
export const forceGetNewLocalStorageToken = (token, setToken) => {
  const MAX_ATTEMPTS = 100;
  let attemptLeft = MAX_ATTEMPTS;

  const intervalId = setInterval(() => {
    const newToken = JSON.parse(localStorage.getItem("user"))?.token;

    if (newToken !== token) {
      setToken?.(newToken);
      clearInterval(intervalId);
    }

    attemptLeft--;
    if (!attemptLeft) {
      clearInterval(intervalId);
      // throw new Error("Out of attempts to get new user token from local storage");
    }

    console.log(`Try getting new token. Attempts left=${attemptLeft}`);
  }, 100);
}