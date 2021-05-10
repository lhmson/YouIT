import jwt from "jsonwebtoken";
import { verifyJwt } from "../utils/verfifyAuth.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // google id > 500

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = verifyJwt(token);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    // get req userId to use when come next auth
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
