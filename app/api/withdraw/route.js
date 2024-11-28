import { getUser } from '@/utils/auth'; // Import getUser
import Log from '@/models/Log'; // User and TransactionLog models

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const user = await getUser(req); // Get the user based on the token

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 400 });
    }

    if (user.accountDetails.balance < amount) {
      return new Response(JSON.stringify({ success: false, message: 'Insufficient funds' }), { status: 400 });
    }

    user.accountDetails.balance -= amount;
    await user.save();

    // Log the transaction
    const log = new Log({
      performedBy: user.id,
      actionType: 'Deposit',
      roleRef: user.role,
      details: `Withdrawn ${amount} from account`,
    });
    await log.save();

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
