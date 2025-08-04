import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useEffect } from "react"
import { Outlet } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession()
    
    if (!session) {
      throw new Error("Not authenticated")
    }
    
    return { session }
  },
  errorComponent: () => {
    // Redirect to login if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    return null
  }
})

function AuthenticatedLayout() {
  const { data: session, isPending } = authClient.useSession()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authClient.signOut()
    navigate({ to: "/login" })
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  🍳 Kitchen AI
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-1">
              <Link
                to="/ingredients"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                activeProps={{
                  className: "block px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md"
                }}
              >
                📦 Ingredients
              </Link>
              <Link
                to="/recipes"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                activeProps={{
                  className: "block px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md"
                }}
              >
                📖 Recipes
              </Link>
              <Link
                to="/upload-photos"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                activeProps={{
                  className: "block px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md"
                }}
              >
                📸 Upload Photos
              </Link>
              <Link
                to="/review"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                activeProps={{
                  className: "block px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md"
                }}
              >
                ✏️ Review AI
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}