// backend/userLogs.js

import connectDB from '@/lib/db';
import User from '@/models/User';
import Log from '@/models/Log';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    await connectDB();

    const token = req.headers.get('Authorization')?.split(' ')[1]; // Token from the Authorization header

    if (!token) {
        return new Response(JSON.stringify({ success: false, message: 'Token missing' }), { status: 401 });
    }

    try {
        // Verify the JWT token to decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Extract the user ID from the token

        // Fetch the user's data from the database
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }

        // Fetch logs related to the user
        const logs = await Log.find({ performedBy: userId })
            .populate('performedBy', 'name email role') // Populate user details in logs
            .sort({ timestamp: -1 }); // Sort by most recent log

        return new Response(JSON.stringify({ success: true, user, logs }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid token or something went wrong' }), { status: 500 });
    }
}
