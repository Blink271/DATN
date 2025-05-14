import { FC, useState } from 'react'
import { FaUser, FaBox, FaSignOutAlt, FaCog } from 'react-icons/fa'

interface UserMenuProps {
  userName: string
  userRole: 'admin' | 'user'
  onLogout: () => void
}

const UserMenu: FC<UserMenuProps> = ({ userName, userRole, onLogout }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const menuItems = [
    { icon: FaCog, text: 'Quản lý thông tin', link: '/profile' },
    { icon: FaBox, text: 'Xem đơn hàng', link: '/orders' },
    ...(userRole === 'admin' ? [{ icon: FaCog, text: 'Trang admin', link: '/admin' }] : []),
    { icon: FaSignOutAlt, text: 'Đăng xuất', link: '#', onClick: onLogout }
  ]

  return (
    <div className='relative'>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className='flex items-center gap-1 text-white hover:text-gray-200'
      >
        <FaUser />
        <span>{userName}</span>
      </button>
      {isMenuOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault()
                  item.onClick()
                  setMenuOpen(false)
                }
              }}
              className='flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100'
            >
              <item.icon />
              <span>{item.text}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserMenu
