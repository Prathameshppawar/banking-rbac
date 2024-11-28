// app/register/page.js
'use client'
import { useState } from 'react';
import {useRouter} from 'next/navigation';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role:'admin' }),
        });

        if (response.ok) {
            Router.push('/admin/login'); // Redirect to login after successful registration
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Admin Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/admin/login" className="text-blue-500">Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;