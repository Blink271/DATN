// src/components/Header.tsx
import { FC, useState } from 'react'
import { FaShoppingCart, FaUser, FaPhoneAlt, FaStore, FaSearch, FaTools } from 'react-icons/fa'
import LoginPopup from './LoginPopup'

const Header: FC = () => {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false)

  const infoItems = [
    { icon: FaPhoneAlt, text: '1900.5301', link: '/' },
    { icon: FaStore, text: 'Showroom', link: '/' },
    { icon: FaTools, text: 'Tra cứu đơn', link: '/' },
    { icon: FaShoppingCart, text: 'Giỏ hàng', link: '/Cart' }
  ]

  const handleLoginSuccess = () => {
    // Có thể thêm logic sau khi đăng nhập thành công
    console.log('User logged in successfully');
  }

  return (
    <header className='bg-red-600 text-white'>
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
            <a href={item.link} key={index} className='flex items-center gap-1 text-white hover:text-gray-200'>
              <div key={index} className='flex items-center gap-1'>
                <item.icon />
                <span>{item.text}</span>
              </div>
            </a>
          ))}
          {/* Login Button */}
          <button
            onClick={() => setLoginPopupVisible(true)}
            className='flex items-center gap-1 text-white hover:text-gray-200'
          >
            <FaUser />
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>

      {/* Login Popup Component */}
      <LoginPopup 
        isVisible={isLoginPopupVisible} 
        onClose={() => setLoginPopupVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  )
}

export default Header