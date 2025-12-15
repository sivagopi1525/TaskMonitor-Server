const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers["authorization"];

  if (!header)
    return res.status(401).json({ msg: "Authorization header missing" });

  // Must be in format → Bearer token
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token)
    return res.status(401).json({ msg: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded; // Save user info for next middleware/route
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { auth };
