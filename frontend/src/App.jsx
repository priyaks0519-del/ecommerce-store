import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProductDetail from './pages/Products/ProductDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import AdminDashboard from './pages/Admin/AdminDashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App