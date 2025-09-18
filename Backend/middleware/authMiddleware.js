const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

console.log("JWT_SECRET in middleware:", SECRET);



function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}


module.exports = authMiddleware;

