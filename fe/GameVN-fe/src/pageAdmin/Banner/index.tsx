import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'

interface Banner {
  id: number
  title: string
  position: 'homepage' | 'category' | 'product'
  is_active: boolean
}

const AdminBanners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const [newBanner, setNewBanner] = useState({
    title: '',
    position: 'homepage' as 'homepage' | 'category' | 'product',
    is_active: true
  })

  useEffect(() => {
    const mockBanners: Banner[] = [{ id: 1, title: 'Summer Sale', position: 'homepage', is_active: true }]
    setBanners(mockBanners)
  }, [])

  const handleAddBanner = () => {
    setBanners([...banners, { ...newBanner, id: banners.length + 1 }])
    setIsAddModalOpen(false)
    setNewBanner({ title: '', position: 'homepage', is_active: true })
  }

  const handleEditBanner = () => {
    if (selectedBanner) {
      setBanners(banners.map((banner) => (banner.id === selectedBanner.id ? selectedBanner : banner)))
      setIsEditModalOpen(false)
      setSelectedBanner(null)
    }
  }

  const handleDeleteBanner = () => {
    if (selectedBanner) {
      setBanners(banners.filter((banner) => banner.id !== selectedBanner.id))
      setIsDeleteModalOpen(false)
      setSelectedBanner(null)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Banner Management</h2>
            <button onClick={() => setIsAddModalOpen(true)} className='bg-green-500 text-white px-4 py-2 rounded'>
              Add Banner
            </button>
          </div>
          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-3 text-left'>ID</th>
                  <th className='p-3 text-left'>Title</th>
                  <th className='p-3 text-left'>Position</th>
                  <th className='p-3 text-left'>Active</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className='border-b'>
                    <td className='p-3'>{banner.id}</td>
                    <td className='p-3'>{banner.title}</td>
                    <td className='p-3'>{banner.position}</td>
                    <td className='p-3'>{banner.is_active ? 'Yes' : 'No'}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => {
                          setSelectedBanner(banner)
                          setIsEditModalOpen(true)
                        }}
                        className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBanner(banner)
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

          {/* Add Banner Modal */}
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add New Banner'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Title'
                value={newBanner.title}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <select
                value={newBanner.position}
                onChange={(e) =>
                  setNewBanner({
                    ...newBanner,
                    position: e.target.value as 'homepage' | 'category' | 'product'
                  })
                }
                className='w-full p-2 border rounded'
              >
                <option value='homepage'>Homepage</option>
                <option value='category'>Category</option>
                <option value='product'>Product</option>
              </select>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={newBanner.is_active}
                  onChange={(e) => setNewBanner({ ...newBanner, is_active: e.target.checked })}
                  className='mr-2'
                />
                Active
              </label>
              <div className='flex justify-end space-x-2'>
                <button onClick={() => setIsAddModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Cancel
                </button>
                <button onClick={handleAddBanner} className='bg-green-500 text-white px-4 py-2 rounded'>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Edit Banner Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Edit Banner'>
            {selectedBanner && (
              <div className='space-y-4'>
                <input
                  type='text'
                  value={selectedBanner.title}
                  onChange={(e) => setSelectedBanner({ ...selectedBanner, title: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <select
                  value={selectedBanner.position}
                  onChange={(e) =>
                    setSelectedBanner({
                      ...selectedBanner,
                      position: e.target.value as 'homepage' | 'category' | 'product'
                    })
                  }
                  className='w-full p-2 border rounded'
                >
                  <option value='homepage'>Homepage</option>
                  <option value='category'>Category</option>
                  <option value='product'>Product</option>
                </select>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={selectedBanner.is_active}
                    onChange={(e) => setSelectedBanner({ ...selectedBanner, is_active: e.target.checked })}
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
                  <button onClick={handleEditBanner} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Save
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Delete Banner Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Delete Banner'>
            <div className='space-y-4'>
              <p>Are you sure you want to delete this banner?</p>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                  Cancel
                </button>
                <button onClick={handleDeleteBanner} className='bg-red-500 text-white px-4 py-2 rounded'>
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

export default AdminBanners
