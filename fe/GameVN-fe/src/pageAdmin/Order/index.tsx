import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'

interface Order {
  id: number
  user_id: number
  total_amount: number
  status: string
  created_at: string
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const mockOrders: Order[] = [
      { id: 1, user_id: 1, total_amount: 199.99, status: 'pending', created_at: '2023-01-01' }
    ]
    setOrders(mockOrders)
  }, [])

  const handleEditOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map((order) => (order.id === selectedOrder.id ? selectedOrder : order)))
      setIsEditModalOpen(false)
      setSelectedOrder(null)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <h2 className='text-2xl font-bold mb-4'>Order Management</h2>
          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-3 text-left'>ID</th>
                  <th className='p-3 text-left'>User ID</th>
                  <th className='p-3 text-left'>Total Amount</th>
                  <th className='p-3 text-left'>Status</th>
                  <th className='p-3 text-left'>Created At</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className='border-b'>
                    <td className='p-3'>{order.id}</td>
                    <td className='p-3'>{order.user_id}</td>
                    <td className='p-3'>${order.total_amount}</td>
                    <td className='p-3'>{order.status}</td>
                    <td className='p-3'>{order.created_at}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsEditModalOpen(true)
                        }}
                        className='bg-blue-500 text-white px-2 py-1 rounded'
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Order Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Update Order Status'>
            {selectedOrder && (
              <div className='space-y-4'>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                  className='w-full p-2 border rounded'
                >
                  <option value='pending'>Pending</option>
                  <option value='completed'>Completed</option>
                  <option value='canceled'>Canceled</option>
                </select>
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
                  <button onClick={handleEditOrder} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Save
                  </button>
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
