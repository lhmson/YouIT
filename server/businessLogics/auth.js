import jwt from "jsonwebtoken";
import { verifyJwt } from "../utils/verfifyAuth.js";

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
}