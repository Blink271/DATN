import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className='bg-gray-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Admin Panel</h1>
        <button onClick={() => navigate('/')} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded'>
          Back to Store
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
