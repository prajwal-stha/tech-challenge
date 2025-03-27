'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/lib/api'

type Notes = {
  id: string
  title: string
  content: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Notes[]>([])

  useEffect(() => {
    apiFetch('/notes')
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id: string) => {
    await apiFetch(`/notes/${id}`, { method: 'DELETE' })
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <Link href="/notes/new" className="text-blue-600 underline mb-4 block">Create New Note</Link>
      <ul className="space-y-4">
        {notes.map(note => (
          <li key={note.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <div className="mt-2 space-x-4">
              <Link href={`/notes/${note.id}/edit`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(note.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}