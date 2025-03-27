'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api'

export default function NewNotePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await apiFetch('/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
        router.push('/notes')
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Notes</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    )
}