// src/components/Header.tsx
import { FC, useState } from 'react'
import { FaShoppingCart, FaUser, FaPhoneAlt, FaStore, FaSearch, FaTools } from 'react-icons/fa'

const Header: FC = () => {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false)
  const [isRegisterForm, setRegisterForm] = useState(false)

  const infoItems = [
    { icon: FaPhoneAlt, text: '1900.5301', link: '/' },
    { icon: FaStore, text: 'Showroom', link: '/' },
    { icon: FaTools, text: 'Tra cứu đơn', link: '/' },
    { icon: FaShoppingCart, text: 'Giỏ hàng', link: '/Cart' }
  ]

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
            onClick={() => {
              setLoginPopupVisible(true)
              setRegisterForm(false)
            }}
            className='flex items-center gap-1 text-white hover:text-gray-200'
          >
            <FaUser />
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>

      {/* Login/Registration Popup */}
      {isLoginPopupVisible && (
        <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-md w-96 text-black'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold'>
                {isRegisterForm ? 'ĐĂNG KÝ TÀI KHOẢN GEARVN' : 'Đăng nhập hoặc tạo tài khoản'}
              </h2>
              <button onClick={() => setLoginPopupVisible(false)} className='text-gray-500 hover:text-black'>
                ✖
              </button>
            </div>
            {isRegisterForm ? (
              <form>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Email</label>
                  <input type='email' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập email' />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Họ</label>
                  <input type='text' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập họ' />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Tên</label>
                  <input type='text' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập tên' />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Mật khẩu</label>
                  <input type='password' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập mật khẩu' />
                </div>
                <button type='submit' className='w-full bg-red-600 text-white py-2 rounded-md'>
                  TẠO TÀI KHOẢN
                </button>
              </form>
            ) : (
              <form>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Email</label>
                  <input type='email' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập email' />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1'>Mật khẩu</label>
                  <input type='password' className='w-full px-3 py-2 border rounded-md' placeholder='Nhập mật khẩu' />
                </div>
                <button type='submit' className='w-full bg-red-600 text-white py-2 rounded-md'>
                  Đăng nhập
                </button>
              </form>
            )}
            <div className='mt-4 text-center'>
              {isRegisterForm ? (
                <p className='text-sm'>
                  Bạn đã có tài khoản?{' '}
                  <a href='#' onClick={() => setRegisterForm(false)} className='text-blue-500 hover:underline'>
                    Đăng nhập!
                  </a>
                </p>
              ) : (
                <p className='text-sm'>
                  Bạn chưa có tài khoản?{' '}
                  <a href='#' onClick={() => setRegisterForm(true)} className='text-blue-500 hover:underline'>
                    Đăng ký ngay!
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
