import { extractToken } from "../businessLogics/auth.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "No authorization" });

    const decodedData = extractToken(token);
    req.userId = decodedData.userId;

    // get req userId to use when come next auth
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
};

export default auth;
