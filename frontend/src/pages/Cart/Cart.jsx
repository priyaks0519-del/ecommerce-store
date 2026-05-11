import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cartAPI } from '../../services/api'

const Cart = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get()
      setCart(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load cart')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartAPI.remove(cartItemId)
      fetchCart()
    } catch (err) {
      alert('Failed to remove item')
    }
  }

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      await cartAPI.update(cartItemId, newQuantity)
      fetchCart()
    } catch (err) {
      alert('Failed to update quantity')
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await cartAPI.clear()
        fetchCart()
      } catch (err) {
        alert('Failed to clear cart')
      }
    }
  }

  if (loading) return <div className="text-center py-12">Loading cart...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>

  const items = cart?.items || []
  const totalPrice = cart?.totalPrice || 0

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                {/* Item Image */}
                <div className="w-24 h-24 bg-gray-300 rounded flex-shrink-0"></div>

                {/* Item Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                  <p className="text-gray-600 text-sm">Total: ${item.totalPrice}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-12 text-center border rounded"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="mt-6 text-red-600 hover:text-red-700 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6 pb-4 border-b">
            <div className="flex justify-between">
              <span>Items ({items.length}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-xl font-bold mb-6">
            <span>Total:</span>
            <span className="text-blue-600">${(totalPrice * 1.1).toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart