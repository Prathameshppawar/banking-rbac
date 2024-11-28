import { getUser } from '@/utils/auth'; // Import getUser
import Log from '@/models/Log'; // User and TransactionLog models
import User from '@/models/User';
export async function POST(req) {
  try {
    const { amount, transferAccount } = await req.json();
    const user = await getUser(req); // Get the user based on the token

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 400 });
    }

    if (user.accountDetails.balance < amount) {
      return new Response(JSON.stringify({ success: false, message: 'Insufficient funds' }), { status: 400 });
    }

    // Find recipient user by account number
    const recipient = await User.findOne({ 'accountDetails.accountNumber': transferAccount });
    if (!recipient) {
      return new Response(JSON.stringify({ success: false, message: 'Recipient account not found' }), { status: 400 });
    }

    // Perform the transfer
    user.accountDetails.balance -= amount;
    recipient.accountDetails.balance += amount;

    await user.save();
    await recipient.save();

    // Log the transaction for the user
    const log = new Log({
      performedBy: user.id,
      actionType: 'Deposit',
      roleRef: user.role,
      details: `Transferred ${amount} to ${transferAccount}`,
    });
    await log.save();

    // Log the transaction for the recipient
    const recipientLog = new TransactionLog({
      userId: recipient.id,
      actionType: 'Transfer',
      amount,
      details: `Received ${amount} from account ${user.accountDetails.accountNumber}`,
    });
    await recipientLog.save();

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
