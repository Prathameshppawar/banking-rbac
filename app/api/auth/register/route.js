import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function POST(req) {
    await connectDB();
    
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ success:false,message:'Email already exists.' }),{status :400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        name,
        email,
        password : hashedPassword,
        role,
        accountDetails:{accountNumber:`ACC${Math.floor(Math.random() * 1000000)}`,balance :0}
    });

    await newUser.save();

    const token = sign({ id:newUser._id,email:newUser.email }, process.env.JWT_SECRET,{ expiresIn:'1h' });

    return new Response(JSON.stringify({ success:true , token }),{status :201});
}