'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async () => {
        const res = await apiFetch('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        })

        if (res.login) {
            router.push('/notes')
        } else {
            setError('Invalid login')
        }
    }

    return (
        <div className="p-6 max-w-sm mx-auto space-y-4">
            <h1 className="text-xl font-bold">Login</h1>
            <input className="w-full border p-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input className="w-full border p-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}