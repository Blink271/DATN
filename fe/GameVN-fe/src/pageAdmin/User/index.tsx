import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'
import { API_URL_USER } from '../../constants'

interface User {
  _id: string
  name: string
  email: string
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
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'user' as 'admin' | 'user'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(API_URL_USER)
      setUsers(response.data as User[])
    } catch {
      setError('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async () => {
    setError('')
    try {
      const response = await axios.post<{ user: User }>(`${API_URL_USER}/addUser`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        address: newUser.address || '',
        role: newUser.role
      })
      setUsers([...users, response.data.user])
      setIsAddModalOpen(false)
      setNewUser({ name: '', email: '', password: '', phone: '', address: '', role: 'user' })
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể thêm người dùng')
    }
  }

  const handleEditUser = async () => {
    if (selectedUser) {
      setError('')
      try {
        const response = await axios.put(`${API_URL_USER}/${selectedUser._id}`, {
          name: selectedUser.name,
          email: selectedUser.email,
          phone: selectedUser.phone,
          address: selectedUser.address || '',
          role: selectedUser.role
        })
        setUsers(users.map((user) => (user._id === selectedUser._id ? (response.data as User) : user)))
        setIsEditModalOpen(false)
        setSelectedUser(null)
      } catch (error: any) {
        setError(error.response?.data?.message || 'Không thể cập nhật người dùng')
      }
    }
  }

  const handleDeleteUser = async () => {
    if (selectedUser) {
      setError('')
      try {
        await axios.delete(`${API_URL_USER}/${selectedUser._id}`)
        setUsers(users.filter((user) => user._id !== selectedUser._id))
        setIsDeleteModalOpen(false)
        setSelectedUser(null)
      } catch (error: any) {
        setError(error.response?.data?.message || 'Không thể xóa người dùng')
      }
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Quản lý người dùng</h2>
            <button onClick={() => setIsAddModalOpen(true)} className='bg-green-500 text-white px-4 py-2 rounded'>
              Thêm người dùng
            </button>
          </div>
          {error && <div className='mb-4 text-red-500'>{error}</div>}
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <div className='bg-white rounded shadow overflow-x-auto'>
              <table className='min-w-full'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='p-3 text-left'>Tên</th>
                    <th className='p-3 text-left'>Email</th>
                    <th className='p-3 text-left'>SĐT</th>
                    <th className='p-3 text-left'>Địa chỉ</th>
                    <th className='p-3 text-left'>Vai trò</th>
                    <th className='p-3 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className='border-b'>
                      <td className='p-3'>{user.name}</td>
                      <td className='p-3'>{user.email}</td>
                      <td className='p-3'>{user.phone}</td>
                      <td className='p-3'>{user.address || 'N/A'}</td>
                      <td className='p-3'>{user.role}</td>
                      <td className='p-3'>
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setIsEditModalOpen(true)
                          }}
                          className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user)
                            setIsDeleteModalOpen(true)
                          }}
                          className='bg-red-500 text-white px-2 py-1 rounded'
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add User Modal */}
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Thêm người dùng mới'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Tên'
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
              <input
                type='email'
                placeholder='Email'
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
              <input
                type='password'
                placeholder='Mật khẩu'
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
              <input
                type='text'
                placeholder='SĐT'
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
              <input
                type='text'
                placeholder='Địa chỉ'
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
                <option value='user'>Người dùng</option>
              </select>
              {error && <div className='text-red-500'>{error}</div>}
              <div className='flex justify-end space-x-2'>
                <button onClick={() => setIsAddModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Hủy
                </button>
                <button onClick={handleAddUser} className='bg-green-500 text-white px-4 py-2 rounded'>
                  Lưu
                </button>
              </div>
            </div>
          </Modal>

          {/* Edit User Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Chỉnh sửa người dùng'>
            {selectedUser && (
              <div className='space-y-4'>
                <input
                  type='text'
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className='w-full p-2 border rounded'
                  required
                />
                <input
                  type='email'
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className='w-full p-2 border rounded'
                  required
                />
                <input
                  type='text'
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  className='w-full p-2 border rounded'
                  required
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
                  <option value='user'>Người dùng</option>
                </select>
                {error && <div className='text-red-500'>{error}</div>}
                <div className='flex justify-end space-x-2'>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='bg-gray-500 text-white px-4 py-2 rounded'
                  >
                    Hủy
                  </button>
                  <button onClick={handleEditUser} className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Lưu
                  </button>
                </div>
              </div>
            )}
          </Modal>

          {/* Delete User Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Xóa người dùng'>
            <div className='space-y-4'>
              <p>Bạn có chắc muốn xóa người dùng này?</p>
              {error && <div className='text-red-500'>{error}</div>}
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                  Hủy
                </button>
                <button onClick={handleDeleteUser} className='bg-red-500 text-white px-4 py-2 rounded'>
                  Xóa
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
