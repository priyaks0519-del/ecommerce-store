import { useState, useEffect } from 'react'
import { ordersAPI } from '../../services/api'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll()
      setOrders(response.data.content || [])
      setError('')
    } catch (err) {
      setError('Failed to load orders')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading orders...</div>
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg">You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Items: {order.items.length}</span>
                  <span className="font-bold text-gray-800">Total: ${order.totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">Shipping: {order.shippingAddress}</p>
              </div>
            ))}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-semibold">{selectedOrder.id}</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="font-semibold">{selectedOrder.status}</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-gray-600 text-sm">Shipping Address</p>
                  <p className="font-semibold text-sm">{selectedOrder.shippingAddress}</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="font-semibold">{selectedOrder.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Items</p>
                  <div className="space-y-2 mt-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.productName}</span>
                        <span>${item.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Orders