import React from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'

const AdminDashboard: React.FC = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white p-4 rounded shadow'>
              <h3 className='font-semibold'>Total Users</h3>
              <p className='text-2xl'>1,234</p>
            </div>
            <div className='bg-white p-4 rounded shadow'>
              <h3 className='font-semibold'>Total Products</h3>
              <p className='text-2xl'>567</p>
            </div>
            <div className='bg-white p-4 rounded shadow'>
              <h3 className='font-semibold'>Total Orders</h3>
              <p className='text-2xl'>890</p>
            </div>
            <div className='bg-white p-4 rounded shadow'>
              <h3 className='font-semibold'>Revenue</h3>
              <p className='text-2xl'>$12,345</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
