import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();
    
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response(JSON.stringify({ success:false,message:'Invalid credentials' }),{status :401});
    }

    const token = sign({ id:user._id, role: user.role }, process.env.JWT_SECRET,{ expiresIn:'1h' });
    
    return new Response(JSON.stringify({ success:true , token }),{status :200});
}