import { getUser } from '@/utils/auth'; // Import getUser
import Log from '@/models/Log'; // User and TransactionLog models

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const user = await getUser(req); // Get the user based on the token
    console.log(user)
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 400 });
    }

    user.accountDetails.balance += Number(amount);
    console.log("added balance", user.accountDetails.balance);
    await user.save();

    // Log the transaction
    const log = new Log({
      performedBy: user.id,
      actionType: 'Deposit',
      roleRef: user.role,
      details: `Deposited ${amount} to account`,
    });
    console.log('created transaction', log);
    await log.save();

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.log('error from deposit')
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
