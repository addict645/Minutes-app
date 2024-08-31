// lib/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET; // Use your JWT secret
  return jwt.verify(token, secret);
}
