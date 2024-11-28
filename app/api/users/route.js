import connectDB from '../../../lib/db';
import User from '../../../models/User';

export async function GET(req) {
     await connectDB();

     const users = await User.find({});
     return new Response(JSON.stringify(users),{status :200});
}