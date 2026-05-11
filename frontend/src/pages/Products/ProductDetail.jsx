import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsAPI, cartAPI } from '../../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id)
      setProduct(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load product details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      setAddingToCart(true)
      await cartAPI.add({
        productId: product.id,
        quantity: parseInt(quantity),
      })
      alert('Added to cart!')
      setQuantity(1)
    } catch (error) {
      alert('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-gray-500">
              <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-blue-600">${product.price}</span>
            <span className="text-lg text-gray-500">Stock: {product.quantity} units</span>
          </div>

          <div className="mb-6">
            <span className="text-sm text-gray-500">Category: {product.category}</span>
            <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart || product.quantity === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold text-lg"
            >
              {addingToCart ? 'Adding...' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail