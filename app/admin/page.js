'use client'
import Layout from '../layout';
import { useEffect, useState } from 'react';

const AdminPage = () => {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            const response = await fetch('/api/logs');
            const data = await response.json();
            console.log(data);
            setLogs(data);
        };

        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchLogs();
        fetchUsers();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl font-bold">Admin Management</h1>

            {/* User Search */}
            <input 
                type="text" 
                placeholder="Search Users by Name or Email" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border p-2 mb-4 w-full"
            />

            {/* Display Users */}
            <h2 className="text-xl mt-4">Users</h2>
            <ul className="border rounded p-4">
                {users.filter(user => 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                ).map(user => (
                    <li key={user._id} className={`py-2 ${user.role === 'admin' ? ' text-black font-bold' : 'bg-white text-gray-800'}`}>
                        {user.name} - {user.email}
                        {/* Display user role */}
                        <span className={`ml-2 ${user.role === 'admin' ? 'text-red-500' : 'text-green-500'}`}>
                            {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Logs Section */}
            <h2 className="text-xl mt-4">Action Logs</h2>
            <table className="min-w-full border-collapse border border-gray-200 mt-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Action Type</th>
                        <th className="border border-gray-300 p-2">Performed By</th>
                        <th className="border border-gray-300 p-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                {logs.map(log => (
    <tr key={log._id}>
        <td className="border border-gray-300 p-2">{log.actionType}</td>
        {/* Accessing the email from performedBy */}
        <td className="border border-gray-300 p-2">{log.performedBy?.email || 'N/A'}</td>
        {/* Formatting the timestamp */}
        <td className="border border-gray-300 p-2">
            {new Date(log.timestamp).toLocaleString()}
        </td>
    </tr>
))}

                </tbody>  
            </table>
        </Layout>  
    );
};

export default AdminPage;
