import { FC, useState, useEffect } from 'react'
import { FaShoppingCart, FaPhoneAlt, FaStore, FaSearch, FaTools, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import LoginPopup from './LoginPopup'
import UserMenu from './UserMenu'

interface User {
  name: string
  role: 'admin' | 'user'
}

const Header: FC = () => {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const infoItems = [
    { icon: FaPhoneAlt, text: '1900.5301', link: '/' },
    { icon: FaStore, text: 'Showroom', link: '/' },
    { icon: FaTools, text: 'Tra cứu đơn', link: '/check' },
    { icon: FaShoppingCart, text: 'Giỏ hàng', link: '/cart' }
  ]

  useEffect(() => {
    // Kiểm tra localStorage để lấy thông tin người dùng khi component mount
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ name: parsedUser.name, role: parsedUser.role })
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
    }
  }, [])

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ name: parsedUser.name, role: parsedUser.role })
      } catch (error) {
        console.error('Error parsing user from localStorage:', error)
      }
    }
    console.log('User logged in successfully')
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className='bg-red-600 text-white'>
      {/* Top header */}
      <div className='flex items-center justify-between px-6 py-2'>
        {/* Logo */}
        <div className='flex items-center gap-2 text-xl font-bold hover:cursor-pointer'>
          <a href='/'>
            <span className='text-2xl'>🛠️</span>
            GAMEVN
          </a>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className='flex flex-1 mx-6 max-w-2xl'>
          <input
            type='text'
            placeholder='Bạn cần tìm gì?'
            className='w-full px-4 py-2 rounded-l-md text-black bg-white'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit' className='bg-black px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors'>
            <FaSearch />
          </button>
        </form>

        {/* Info items */}
        <div className='flex items-center gap-6 text-sm'>
          {infoItems.map((item, index) => (
            <a href={item.link} key={index} className='flex items-center gap-1 text-white hover:text-gray-200'>
              <div className='flex items-center gap-1'>
                <item.icon />
                <span>{item.text}</span>
              </div>
            </a>
          ))}
          {/* User section */}
          {user ? (
            <UserMenu userName={user.name} userRole={user.role} onLogout={handleLogout} />
          ) : (
            <button
              onClick={() => setLoginPopupVisible(true)}
              className='flex items-center gap-1 text-white hover:text-gray-200'
            >
              <FaUser />
              <span>Đăng nhập</span>
            </button>
          )}
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
