// src/components/Header.tsx
import { FC } from 'react'
import { FaShoppingCart, FaUser, FaPhoneAlt, FaStore, FaSearch, FaTools } from 'react-icons/fa'

const Header: FC = () => {
  const infoItems = [
    { icon: FaPhoneAlt, text: '1900.5301' },
    { icon: FaStore, text: 'Showroom' },
    { icon: FaTools, text: 'Tra cứu đơn' },
    { icon: FaShoppingCart, text: 'Giỏ hàng' },
    { icon: FaUser, text: 'Đào Tuấn Vũ' }
  ]

  return (
    <header className='bg-red-600 text-white '>
      {/* Top header */}
      <div className='flex items-center justify-between px-6 py-2'>
        {/* Logo */}
        <div className='flex items-center gap-2 text-xl font-bold hover:cursor-pointer'>
          <a href='/'>
            <span className='text-2xl'>🛠️</span>
            GEARVN
          </a>
        </div>

        {/* Search */}
        <div className='flex flex-1 mx-6 max-w-2xl'>
          <input
            type='text'
            placeholder='Bạn cần tìm gì?'
            className='w-full px-4 py-2 rounded-l-md text-black bg-white'
          />
          <button className='bg-black px-4 py-2 rounded-r-md'>
            <FaSearch />
          </button>
        </div>

        {/* Info items */}
        <div className='flex items-center gap-6 text-sm'>
          {infoItems.map((item, index) => (
            <div key={index} className='flex items-center gap-1'>
              <item.icon />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
