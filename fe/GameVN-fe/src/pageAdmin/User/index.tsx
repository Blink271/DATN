import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'

interface User {
  id: number
  name: string
  email: string
  password: string
  phone: string
  address: string
  role: 'admin' | 'user'
  created_at: string
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone: '', address: '', role: 'admin' })

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '123456789',
        address: '123 Street',
        role: 'admin',
        created_at: '2023-01-01'
      }
    ]
    setUsers(mockUsers)
  }, [])

  const handleAddUser = () => {
    // Thêm logic để gửi dữ liệu đến API
    setUsers([...users, { ...newUser, id: users.length + 1, created_at: new Date().toISOString(), role: 'admin' }])
    setIsAddModalOpen(false)
    setNewUser({ name: '', email: '', password: '', phone: '', address: '', role: 'admin' })
  }

  const handleEditUser = () => {
    if (selectedUser) {
      // Thêm logic để cập nhật dữ liệu qua API
      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))
      setIsEditModalOpen(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      // Thêm logic để xóa dữ liệu qua API
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>User Management</h2>
            <button onClick={() => setIsAddModalOpen(true)} className='bg-green-500 text-white px-4 py-2 rounded'>
              Add User
            </button>
          </div>
          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-3 text-left'>Name</th>
                  <th className='p-3 text-left'>Email</th>
                  <th className='p-3 text-left'>Phone</th>
                  <th className='p-3 text-left'>Role</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='border-b'>
                    <td className='p-3'>{user.name}</td>
                    <td className='p-3'>{user.email}</td>
                    <td className='p-3'>{user.phone}</td>
                    <td className='p-3'>{user.role}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsEditModalOpen(true)
                        }}
                        className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
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

          {/* Add User Modal */}
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add New User'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Name'
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='email'
                placeholder='Email'
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Phone'
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Address'
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
                className='w-full p-2 border rounded'
              >
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
              </select>

              <div className='flex justify-end space-x-2'>
                <button onClick={() => setIsAddModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Cancel
                </button>
                <button onClick={handleAddUser} className='bg-green-500 text-white px-4 py-2 rounded'>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Edit User Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Edit User'>
            {selectedUser && (
              <div className='space-y-4'>
                <input
                  type='text'
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <input
                  type='email'
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <input
                  type='text'
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <input
                  type='text'
                  value={selectedUser.address}
                  onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                  className='w-full p-2 border rounded'
                />
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as 'admin' | 'user' })}
                  className='w-full p-2 border rounded'
                >
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                  >
                    Cancel
                  </button>
                  <button onClick={handleEditUser} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Save
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Delete User Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Delete User'>
            <div className='space-y-4'>
              <p>Are you sure you want to delete this user?</p>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                  Cancel
                </button>
                <button onClick={handleDeleteUser} className='bg-red-500 text-white px-4 py-2 rounded'>
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

export default AdminUsers
