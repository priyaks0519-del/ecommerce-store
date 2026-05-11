import { Link } from 'react-router-dom'
import { useState } from 'react'
import { cartAPI } from '../services/api'

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first')
      return
    }

    try {
      setLoading(true)
      await cartAPI.add({
        productId: product.id,
        quantity: parseInt(quantity),
      })
      alert('Added to cart!')
      setQuantity(1)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      {/* Product Image */}
      <div className="h-64 bg-gray-300 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description || 'High quality product'}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className="text-sm text-gray-500">Stock: {product.quantity}</span>
        </div>

        {/* Add to Cart */}
        <div className="mt-4 flex gap-2">
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-16 px-2 py-2 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleAddToCart}
            disabled={loading || product.quantity === 0}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard