import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className={`bg-gray-100 p-4 h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <button onClick={toggleSidebar} className='w-full flex justify-end mb-4 focus:outline-none'>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav>
        <ul className='space-y-2'>
          <li>
            <Link to='/admin' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Dashboard' : <span className='text-sm'>D</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Users' : <span className='text-sm'>U</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Products' : <span className='text-sm'>P</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin/orders' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Orders' : <span className='text-sm'>O</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin/discounts' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Discounts' : <span className='text-sm'>D</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin/banners' className={`block p-2 hover:bg-gray-200 rounded ${!isOpen && 'text-center'}`}>
              {isOpen ? 'Banners' : <span className='text-sm'>B</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar
