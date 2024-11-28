import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  accountDetails: {
    accountNumber: { type: String, unique: true },
    balance: { type: Number, default: 0 },
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema, 'users');

export default User;