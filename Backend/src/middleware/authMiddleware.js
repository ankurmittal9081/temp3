import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // First, try to read token from the httpOnly cookie
  let token = req.cookies?.token;

  // If not in cookie, check Authorization header (for Postman/mobile clients)
  if (!token) {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }
  }

  // If still no token, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user payload (e.g., { userId, role }) to the request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;