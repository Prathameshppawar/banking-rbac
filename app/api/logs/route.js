import connectDB from '@/lib/db';
import Log from '@/models/Log';
import User from '@/models/User'; // Ensure this matches your file structure

export async function GET(req) {
    await connectDB();

    try {
        // Populate the `performedBy` field using the correct model
        const logs = await Log.find().populate({
            path: 'performedBy',
            model: 'User', // Explicitly specify the model name
            select: 'email actionType timestamp', // Fetch specific fields
        });

        console.log(logs);
        return new Response(JSON.stringify(logs), { status: 200 });
    } catch (error) {
        console.error('Error fetching logs:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), { status: 500 });
    }
}
