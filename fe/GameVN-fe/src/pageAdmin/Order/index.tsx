import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'
import { API_URL_ORDER } from '../../constants'
import { formatCurrency, formatDate } from '../../utils/format'
import { OrderStatusBadge } from '../../componentsAdmin/StatusBadges'

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
  }
  items: OrderItem[]
  totalAmount: number
  shippingFee: number
  name: string
  phone: string
  address: string
  notes?: string
  requireInvoice: boolean
  discountCode?: string
  status: 'pending' | 'completed' | 'canceled'
  created_at: string
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(API_URL_ORDER, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setOrders(response.data as Order[])
      setFilteredOrders(response.data as Order[])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to fetch orders')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let result = [...orders]

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (order) =>
          order._id.toLowerCase().includes(term) ||
          order.userId.name.toLowerCase().includes(term) ||
          order.userId.email.toLowerCase().includes(term) ||
          order.phone.includes(term) ||
          order.name.toLowerCase().includes(term)
      )
    }

    setFilteredOrders(result)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleEditOrder = async () => {
    if (!selectedOrder) return

    setError('')
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.put(
        `${API_URL_ORDER}/${selectedOrder._id}`,
        { status: selectedOrder.status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setOrders((prevOrders) => prevOrders.map((order) => (order._id === selectedOrder._id ? response.data : order)))
      setFilteredOrders((prevFiltered) =>
        prevFiltered.map((order) => (order._id === selectedOrder._id ? response.data : order))
      )
      setIsEditModalOpen(false)
      setSelectedOrder(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to update order status')
      } else {
        setError('An unexpected error occurred')
      }
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.put(
          `${API_URL_ORDER}/${orderId}`,
          { status: 'canceled' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? response.data : order)))
        setFilteredOrders((prevFiltered) =>
          prevFiltered.map((order) => (order._id === orderId ? response.data : order))
        )
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Failed to cancel order')
        } else {
          setError('An unexpected error occurred')
        }
      }
    }
  }

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <h2 className='text-2xl font-bold mb-6'>Quản lý đơn hàng</h2>

          {/* Filters and Search */}
          <div className='mb-6 bg-white p-4 rounded shadow'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-center space-x-4'>
                <div className='w-full md:w-64'>
                  <input
                    type='text'
                    placeholder='Search orders...'
                    className='w-full p-2 border rounded'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='p-2 border rounded'
                >
                  <option value='all'>Tất cả</option>
                  <option value='pending'>Đang giao</option>
                  <option value='completed'>Đã hoàn thành</option>
                  <option value='canceled'>Hủy</option>
                </select>
              </div>
              <button onClick={fetchOrders} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                Làm mới
              </button>
            </div>
          </div>

          {error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>}

          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className='bg-white p-6 rounded shadow text-center'>Không có đơn hàng nào</div>
          ) : (
            <>
              <div className='bg-white rounded shadow overflow-x-auto mb-4'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Mã đơn hàng
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Khách hàng
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Sản phẩm
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Tổng tiền
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Trạng thái
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Ngày đặt
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {currentOrders.map((order) => (
                      <tr key={order._id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          #{order._id.substring(0, 8)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>{order.userId.name}</div>
                          <div className='text-sm text-gray-500'>{order.userId.email}</div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatDate(order.created_at)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setIsDetailModalOpen(true)
                            }}
                            className='text-blue-600 hover:text-blue-900'
                          >
                            Chi tiết
                          </button>
                          {order.status !== 'completed' && order.status !== 'canceled' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedOrder(order)
                                  setIsEditModalOpen(true)
                                }}
                                className='text-indigo-600 hover:text-indigo-900'
                              >
                                Cập nhật trạng thái
                              </button>
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                className='text-red-600 hover:text-red-900'
                              >
                                Hủy
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex justify-center mt-4'>
                  <nav className='inline-flex rounded-md shadow'>
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className='px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                    >
                      Trang trước
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                          currentPage === number
                            ? 'bg-blue-50 text-blue-600 border-blue-500'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className='px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                    >
                      Trang sau
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}

          {/* Edit Order Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Cập nhật trạng thái đơn hàng #${selectedOrder?._id.substring(0, 8)}`}
          >
            {selectedOrder && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Trạng thái</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        status: e.target.value as 'pending' | 'completed' | 'canceled'
                      })
                    }
                    className='w-full p-2 border rounded'
                  >
                    <option value='pending'>Đang giao</option>
                    <option value='completed'>Hoàn thành</option>
                    <option value='canceled'>Đã hủy</option>
                  </select>
                </div>

                {error && <div className='text-red-500 text-sm'>{error}</div>}

                <div className='flex justify-end space-x-2 pt-4'>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleEditOrder}
                    className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Lưu
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Order Detail Modal */}
          <Modal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            title={`Order Details #${selectedOrder?._id.substring(0, 8)}`}
          >
            {selectedOrder && (
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h3 className='font-medium text-gray-900 mb-2'>Customer Information</h3>
                    <div className='space-y-1 text-sm'>
                      <p>
                        <span className='font-medium'>Name:</span> {selectedOrder.name}
                      </p>
                      <p>
                        <span className='font-medium'>Email:</span> {selectedOrder.userId.email}
                      </p>
                      <p>
                        <span className='font-medium'>Phone:</span> {selectedOrder.phone}
                      </p>
                      <p>
                        <span className='font-medium'>Address:</span> {selectedOrder.address}
                      </p>
                      {selectedOrder.notes && (
                        <p>
                          <span className='font-medium'>Notes:</span> {selectedOrder.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-900 mb-2'>Order Summary</h3>
                    <div className='space-y-1 text-sm'>
                      <p>
                        <span className='font-medium'>Status:</span> <OrderStatusBadge status={selectedOrder.status} />
                      </p>
                      <p>
                        <span className='font-medium'>Date:</span> {formatDate(selectedOrder.created_at)}
                      </p>
                      <p>
                        <span className='font-medium'>Require Invoice:</span>{' '}
                        {selectedOrder.requireInvoice ? 'Yes' : 'No'}
                      </p>
                      {selectedOrder.discountCode && (
                        <p>
                          <span className='font-medium'>Discount Code:</span> {selectedOrder.discountCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='font-medium text-gray-900 mb-2'>Order Items</h3>
                  <div className='border rounded-md divide-y'>
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className='p-3 flex justify-between'>
                        <div className='flex items-center space-x-3'>
                          <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
                          <div>
                            <p className='font-medium'>{item.name}</p>
                            <p className='text-sm text-gray-500'>
                              {formatCurrency(item.price)} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className='font-medium'>{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='border-t pt-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount - selectedOrder.shippingFee)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping Fee:</span>
                    <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                  </div>
                  <div className='flex justify-between font-bold text-lg'>
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  )
}

export default AdminOrders
