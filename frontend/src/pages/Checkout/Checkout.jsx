import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartAPI, ordersAPI } from '../../services/api'

const Checkout = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [formData, setFormData] = useState({
    shippingAddress: '',
    phoneNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get()
      setCart(response.data)
    } catch (err) {
      setError('Failed to load cart')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!formData.shippingAddress || !formData.phoneNumber) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      await ordersAPI.create(formData)
      alert('Order placed successfully!')
      navigate('/orders')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (!cart) return <div className="text-center py-12">Loading...</div>

  const items = cart.items || []
  const totalPrice = cart.totalPrice || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Shipping Address *</label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Order Items</h2>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <span>{item.productName} x {item.quantity}</span>
                      <span>${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold text-lg"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6 pb-4 border-b">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span className="text-blue-600">${(totalPrice * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout