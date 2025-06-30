import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1]; // Expecting 'Bearer <token>'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
