const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUserMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Header not provided!" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
    const user = decoded;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized to access this route" });
    return;
  }
};

module.exports = authUserMiddleware;
