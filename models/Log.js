import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    performedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleRef', required: true },
    actionType: { type: String, required: true },
    roleRef: { type: String, enum: ['users'], refPath: 'roleRef', required: true },
    details: { type: String },
    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema);

export default Log;