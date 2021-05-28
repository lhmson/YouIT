import jwt from "jsonwebtoken";
const JWT_KEY = "youit";

export const decodeJwt = (token) => {
  return jwt.decode(token);
};

export const verifyJwt = (token) => {
  let result = null;

  if (token) {
    try {
      result = jwt.verify(token, JWT_KEY);
    } catch (error) {
      /* console.log("Jwt verification error:", error); */
    }
  }
  return result;
};
