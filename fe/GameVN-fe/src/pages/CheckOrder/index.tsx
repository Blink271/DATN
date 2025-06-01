import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL_ORDER } from '../../constants'
import { formatCurrency, formatDate } from '../../utils/format'
import { OrderStatusBadge } from '../../componentsAdmin/StatusBadges'
import Modal from '../../componentsAdmin/Modal'

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

const CheckOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchOrders()
    }
  }, [currentUser])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm])

  const fetchOrders = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${API_URL_ORDER}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const userOrders = response.data.filter((order: Order) => order.userId._id === currentUser._id)

      setOrders(userOrders)
      setFilteredOrders(userOrders)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Không thể tải danh sách đơn hàng')
      } else {
        setError('Đã xảy ra lỗi khi tải đơn hàng')
      }
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let result = [...orders]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((order) => order._id.toLowerCase().includes(term))
    }

    setFilteredOrders(result)
  }

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  if (!currentUser) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Vui lòng đăng nhập để xem đơn hàng</h2>
        <button
          onClick={() => (window.location.href = '/login')}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
        >
          Đăng nhập
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='container mx-auto p-4 text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto'></div>
        <p className='mt-4'>Đang tải đơn hàng...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto p-4 text-center text-red-500'>
        {error}
        <button
          onClick={fetchOrders}
          className='mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors'
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Đơn hàng của tôi</h1>

      {/* Search box */}
      <div className='mb-6 bg-white p-4 rounded shadow'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='w-full md:w-64'>
            <input
              type='text'
              placeholder='Tìm kiếm theo mã đơn hàng...'
              className='w-full p-2 border rounded'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchOrders}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Làm mới
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className='bg-white p-6 rounded shadow text-center'>
          {searchTerm ? `Không tìm thấy đơn hàng nào với mã "${searchTerm}"` : 'Bạn chưa có đơn hàng nào'}
        </div>
      ) : (
        <div className='bg-white rounded shadow overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Mã đơn hàng
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
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredOrders.map((order) => (
                <tr key={order._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    #{order._id.substring(0, 8)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{formatDate(order.created_at)}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button onClick={() => openOrderDetail(order)} className='text-blue-600 hover:text-blue-900'>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Chi tiết đơn hàng #${selectedOrder?._id.substring(0, 8)}`}
        size='lg' // Thêm prop size nếu Modal component hỗ trợ
      >
        {selectedOrder && (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h3 className='font-medium text-gray-900 mb-2'>Thông tin khách hàng</h3>
                <div className='space-y-1 text-sm'>
                  <p>
                    <span className='font-medium'>Họ tên:</span> {selectedOrder.name}
                  </p>
                  <p>
                    <span className='font-medium'>Email:</span> {selectedOrder.userId.email}
                  </p>
                  <p>
                    <span className='font-medium'>Điện thoại:</span> {selectedOrder.phone}
                  </p>
                  <p>
                    <span className='font-medium'>Địa chỉ:</span> {selectedOrder.address}
                  </p>
                  {selectedOrder.notes && (
                    <p>
                      <span className='font-medium'>Ghi chú:</span> {selectedOrder.notes}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h3 className='font-medium text-gray-900 mb-2'>Thông tin đơn hàng</h3>
                <div className='space-y-1 text-sm'>
                  <p>
                    <span className='font-medium'>Trạng thái:</span> <OrderStatusBadge status={selectedOrder.status} />
                  </p>
                  <p>
                    <span className='font-medium'>Ngày đặt:</span> {formatDate(selectedOrder.created_at)}
                  </p>
                  <p>
                    <span className='font-medium'>Yêu cầu hóa đơn:</span>{' '}
                    {selectedOrder.requireInvoice ? 'Có' : 'Không'}
                  </p>
                  {selectedOrder.discountCode && (
                    <p>
                      <span className='font-medium'>Mã giảm giá:</span> {selectedOrder.discountCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className='font-medium text-gray-900 mb-2'>Sản phẩm đã đặt</h3>
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
                <span>Tạm tính:</span>
                <span>{formatCurrency(selectedOrder.totalAmount - selectedOrder.shippingFee)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Phí vận chuyển:</span>
                <span>{formatCurrency(selectedOrder.shippingFee)}</span>
              </div>
              <div className='flex justify-between font-bold text-lg'>
                <span>Tổng cộng:</span>
                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>
            <div className='flex justify-end pt-4'>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CheckOrderPage
