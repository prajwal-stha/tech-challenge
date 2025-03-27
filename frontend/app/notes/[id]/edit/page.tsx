'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { apiFetch } from '@/lib/api'

export default function EditNotesPage() {
    const router = useRouter()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        apiFetch(`/notes/${id}`)
        .then(data => {
            setTitle(data.title)
            setContent(data.content)
        })
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await apiFetch(`/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
        router.push('/notes')
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Notes</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    )
}