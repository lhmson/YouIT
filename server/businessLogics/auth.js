import jwt from "jsonwebtoken";
import { verifyJwt } from "../utils/verfifyAuth.js";
import fetch from "node-fetch";

export const extractToken = (token) => {
  const isCustomAuth = token.length < 500; // google id > 500

  let decodedData;

  if (token && isCustomAuth) {
    decodedData = verifyJwt(token);
    decodedData.userId = decodedData?.id;
  } else {
    decodedData = jwt.decode(token);
    decodedData.userId = decodedData?.sub;
  }

  return decodedData;
};

//#region login with github
export async function getAccessToken({ code, client_id, client_secret }) {
  const request = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

export async function fetchGitHubUser(token) {
  const request = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + token,
    },
  });
  return await request.json();
}

//#endregion
