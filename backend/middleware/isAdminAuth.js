const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAdminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Header not provided!" });
    return;
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET, (err, admin) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this route" });
    }
    req.admin = admin;
    next();
  });
};

module.exports = authAdminMiddleware;
