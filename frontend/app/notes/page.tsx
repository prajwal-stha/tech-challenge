'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/lib/api'

type Notes = {
  id: string
  title: string
  content: string
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Notes[]>([])
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()
    useEffect(() => {
    apiFetch('/notes')
        .then(setNotes)
        .catch(() => router.push('/login'))
    }, [router])

    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this note?')
        if (!confirmed) return
        setDeletingId(id)
        await apiFetch(`/notes/${id}`, { method: 'DELETE' })
        setNotes(notes.filter(n => n.id !== id))
        setDeletingId(null)
    }

    const handleLogout = async () => {
        await apiFetch('/logout', { method: 'POST' })
        router.push('/login')
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Notes</h1>
                <button onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
            <Link href="/notes/new" className="text-blue-600 underline mb-4 block">Create New Note</Link>
            <ul className="space-y-4">
                {notes.map(note => (
                  <li key={note.id} className="p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <p>{note.content}</p>
                    <div className="mt-2 space-x-4">
                      <Link href={`/notes/${note.id}/edit`} className="text-blue-500">Edit</Link>
                      <button onClick={() => handleDelete(note.id)}
                              disabled={deletingId === note.id}
                              className="text-red-500">
                          {deletingId === note.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
        </div>
    )
}