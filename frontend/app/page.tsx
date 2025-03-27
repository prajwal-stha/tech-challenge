import Link from 'next/link'

export default function Home() {
    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold mb-4">Welcome to Notes App</h1>
            <Link href="/notes" className="text-blue-600 underline">Go to Notes</Link>
        </div>
    )
}