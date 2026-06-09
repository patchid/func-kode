import { createServerSupabaseClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AuthDebugPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>
      <p><strong>Has Session:</strong> {user ? 'Yes' : 'No'}</p>
      {user && (
        <>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Provider:</strong> {user.app_metadata?.provider}</p>
        </>
      )}
      {error && <p className="text-red-600">{error.message}</p>}
      <div className="mt-6 space-x-4">
        <Link href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">Login</Link>
        <Link href="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded inline-block">Dashboard</Link>
        <Link href="/" className="bg-gray-500 text-white px-4 py-2 rounded inline-block">Go Home</Link>
      </div>
    </div>
  )
}
