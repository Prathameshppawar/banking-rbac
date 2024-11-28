// app/login/page.js
'use client'
import { useState } from 'react';
import { useRouter} from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router=useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', 'user');
            
            console.log("success, redirecting")
            router.push('/user'); // Redirect to user dashboard after login
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-blue-950">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="border p-2 mb-4 w-full text-blue-600"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className="border p-2 mb-4 w-full text-red-700"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
                <p className="mt-4 text-center text-blue-950">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;