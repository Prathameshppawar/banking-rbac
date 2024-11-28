'use client'
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [transferAccount, setTransferAccount] = useState('');
    const [actionError, setActionError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login'; //Redirect to login if no token
                    return;
                }

                const res = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (data.success) {
                    setUserData(data.user);
                    setLogs(data.logs);
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Error fetching user data and logs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleWithdraw = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setActionError('Please enter a valid amount.');
            return;
        }

        const token = localStorage.getItem('token');
        const res = await fetch('/api/withdraw', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (data.success) {
            alert('Withdrawal successful!');
            setUserData(prev => ({
                ...prev,
                accountDetails: {
                    ...prev.accountDetails,
                    balance: prev.accountDetails.balance - amount
                }
            }));
        } else {
            setActionError(data.message || 'Error withdrawing funds');
        }
    };

    const handleDeposit = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setActionError('Please enter a valid amount.');
            return;
        }

        const token = localStorage.getItem('token');
        const res = await fetch('/api/deposit', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (data.success) {
            alert('Deposit successful!');
            setUserData(prev => ({
                ...prev,
                accountDetails: {
                    ...prev.accountDetails,
                    balance: prev.accountDetails.balance + amount
                }
            }));
        } else {
            setActionError(data.message || 'Error depositing funds');
        }
    };

    const handleTransfer = async () => {
        if (!amount || isNaN(amount) || amount <= 0 || !transferAccount) {
            setActionError('Please enter a valid amount and recipient account number.');
            return;
        }

        const token = localStorage.getItem('token');
        const res = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, transferAccount }),
        });

        const data = await res.json();
        if (data.success) {
            alert('Transfer successful!');
            setUserData(prev => ({
                ...prev,
                accountDetails: {
                    ...prev.accountDetails,
                    balance: prev.accountDetails.balance - amount
                }
            }));
        } else {
            setActionError(data.message || 'Error transferring funds');
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* User Info */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700">Welcome, {userData?.name}</h2>
                <div className="mt-4">
                    <p><strong>Email:</strong> {userData?.email}</p>
                    <p><strong>Role:</strong> {userData?.role}</p>
                    <p><strong>Account Balance:</strong> ${userData?.accountDetails?.balance}</p>
                    <p><strong>Account Number:</strong> {userData?.accountDetails?.accountNumber}</p>
                </div>
            </div>

            

            {/* Action Input Forms */}
            <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 py-3">Manage Your Funds</h3>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 w-full mb-4"
                />
                {/* For transfer */}
                <input
                    type="text"
                    placeholder="Recipient Account Number"
                    value={transferAccount}
                    onChange={(e) => setTransferAccount(e.target.value)}
                    className="border p-2 w-full mb-4"
                />

                {/* Action Error Message */}
                {actionError && <p className="text-red-500">{actionError}</p>}

                <div className="space-x-4">
                    <button onClick={handleDeposit} className="bg-blue-500 text-white py-2 px-4 rounded">Deposit</button>
                    <button onClick={handleWithdraw} className="bg-green-500 text-white py-2 px-4 rounded">Withdraw</button>
                    <button onClick={handleTransfer} className="bg-yellow-500 text-white py-2 px-4 rounded">Transfer</button>
                </div>
            </div>

            {/* User Logs */}
            {/* <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700">Activity Logs</h3>
                <table className="min-w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Action</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Details</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{log.actionType}</td>
                                    <td className="py-2 px-4 border-b">{log.details || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b">{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-2 px-4 text-center text-gray-500">No logs available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default Dashboard;
