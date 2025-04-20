import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'

interface Discount {
  id: number
  code: string
  discount_type: 'percent' | 'fixed'
  discount_value: number
  active: boolean
}

const AdminDiscounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null)
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    discount_type: 'percent' as 'percent' | 'fixed',
    discount_value: 0,
    active: true
  })

  useEffect(() => {
    const mockDiscounts: Discount[] = [
      { id: 1, code: 'SUMMER20', discount_type: 'percent', discount_value: 20, active: true }
    ]
    setDiscounts(mockDiscounts)
  }, [])

  const handleAddDiscount = () => {
    setDiscounts([...discounts, { ...newDiscount, id: discounts.length + 1 }])
    setIsAddModalOpen(false)
    setNewDiscount({ code: '', discount_type: 'percent', discount_value: 0, active: true })
  }

  const handleEditDiscount = () => {
    if (selectedDiscount) {
      setDiscounts(discounts.map((discount) => (discount.id === selectedDiscount.id ? selectedDiscount : discount)))
      setIsEditModalOpen(false)
      setSelectedDiscount(null)
    }
  }

  const handleDeleteDiscount = () => {
    if (selectedDiscount) {
      setDiscounts(discounts.filter((discount) => discount.id !== selectedDiscount.id))
      setIsDeleteModalOpen(false)
      setSelectedDiscount(null)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Discount Management</h2>
            <button onClick={() => setIsAddModalOpen(true)} className='bg-green-500 text-white px-4 py-2 rounded'>
              Add Discount
            </button>
          </div>
          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-3 text-left'>ID</th>
                  <th className='p-3 text-left'>Code</th>
                  <th className='p-3 text-left'>Type</th>
                  <th className='p-3 text-left'>Value</th>
                  <th className='p-3 text-left'>Active</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id} className='border-b'>
                    <td className='p-3'>{discount.id}</td>
                    <td className='p-3'>{discount.code}</td>
                    <td className='p-3'>{discount.discount_type}</td>
                    <td className='p-3'>
                      {discount.discount_value}
                      {discount.discount_type === 'percent' ? '%' : '$'}
                    </td>
                    <td className='p-3'>{discount.active ? 'Yes' : 'No'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => {
                          setSelectedDiscount(discount)
                          setIsEditModalOpen(true)
                        }}
                        className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDiscount(discount)
                          setIsDeleteModalOpen(true)
                        }}
                        className='bg-red-500 text-white px-2 py-1 rounded'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Discount Modal */}
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add New Discount'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Code'
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <select
                value={newDiscount.discount_type}
                onChange={(e) =>
                  setNewDiscount({
                    ...newDiscount,
                    discount_type: e.target.value as 'percent' | 'fixed'
                  })
                }
                className='w-full p-2 border rounded'
              >
                <option value='percent'>Percent</option>
                <option value='fixed'>Fixed</option>
              </select>
              <input
                type='number'
                placeholder='Value'
                value={newDiscount.discount_value}
                onChange={(e) => setNewDiscount({ ...newDiscount, discount_value: Number(e.target.value) })}
                className='w-full p-2 border rounded'
              />
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={newDiscount.active}
                  onChange={(e) => setNewDiscount({ ...newDiscount, active: e.target.checked })}
                  className='mr-2'
                />
                Active
              </label>
              <div className='flex justify-end space-x-2'>
                <button onClick={() => setIsAddModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Cancel
                </button>
                <button onClick={handleAddDiscount} className='bg-green-500 text-white px-4 py-2 rounded'>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Edit Discount Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Edit Discount'>
            {selectedDiscount && (
              <div className='space-y-4'>
                <input
                  type='text'
                  value={selectedDiscount.code}
                  onChange={(e) => setSelectedDiscount({ ...selectedDiscount, code: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <select
                  value={selectedDiscount.discount_type}
                  onChange={(e) =>
                    setSelectedDiscount({
                      ...selectedDiscount,
                      discount_type: e.target.value as 'percent' | 'fixed'
                    })
                  }
                  className='w-full p-2 border rounded'
                >
                  <option value='percent'>Percent</option>
                  <option value='fixed'>Fixed</option>
                </select>
                <input
                  type='number'
                  value={selectedDiscount.discount_value}
                  onChange={(e) =>
                    setSelectedDiscount({
                      ...selectedDiscount,
                      discount_value: Number(e.target.value)
                    })
                  }
                  className='w-full p-2 border rounded'
                />
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={selectedDiscount.active}
                    onChange={(e) => setSelectedDiscount({ ...selectedDiscount, active: e.target.checked })}
                    className='mr-2'
                  />
                  Active
                </label>
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
                  <button onClick={handleEditDiscount} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Save
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Delete Discount Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Delete Discount'>
            <div className='space-y-4'>
              <p>Are you sure you want to delete this discount?</p>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                  Cancel
                </button>
                <button onClick={handleDeleteDiscount} className='bg-red-500 text-white px-4 py-2 rounded'>
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  )
}

export default AdminDiscounts
