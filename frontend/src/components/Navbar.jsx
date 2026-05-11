import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cart from '../assets/cart-icon.svg'

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500">
            🛍️ E-Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            {user && (
              <>
                <Link to="/orders" className="hover:text-blue-400 transition">
                  My Orders
                </Link>
                <Link to="/admin" className="hover:text-blue-400 transition">
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-blue-400 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Welcome, {user.firstName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <Link to="/" className="block py-2 hover:text-blue-400">
              Home
            </Link>
            {user && (
              <>
                <Link to="/orders" className="block py-2 hover:text-blue-400">
                  My Orders
                </Link>
                <Link to="/admin" className="block py-2 hover:text-blue-400">
                  Admin
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar