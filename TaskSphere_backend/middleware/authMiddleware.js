const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/response");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, "Invalid token");
  }
};

module.exports = authMiddleware;