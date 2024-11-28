import jwt from 'jsonwebtoken';
import User  from '@/models/User'; // Assuming you have your User model defined in models

// Secret key for JWT (make sure to keep it in .env)
const JWT_SECRET = process.env.JWT_SECRET;

export async function getUser(req) {
  // Extract token from Authorization header (Bearer token format)
  const token = req.headers.get('Authorization')?.split(' ')[1]; // "Bearer <token>"
  console.log(token)
  if (!token) {
    console.log('no token')
    return null; // If no token is provided, return null
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET); // Decodes the token
    console.log('nothing decoded');

    if (!decoded) {

      return null; // If token is invalid, return null
    }

    // Fetch the user based on the decoded userId
    const user = await User.findById(decoded.id); // Assuming 'userId' is part of the JWT payload

    if (!user) {
      return null; // If no user found with this ID, return null
    }

    return user; // Return the user if found
  } catch (error) {
    console.error('Error verifying token:', error);
    return null; // Return null if token verification fails
  }
}
