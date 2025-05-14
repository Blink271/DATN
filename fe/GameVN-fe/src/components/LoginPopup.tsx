import { useState } from 'react'
import axios from 'axios'
import { API_URL_USER } from '../constants'

// Interface cho User (dựa trên API response từ backend)
interface IUser {
  _id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'user'
  created_at: string
}

// Interface cho response của đăng ký và đăng nhập
interface AuthResponse {
  user: IUser
  accessToken: string
}

interface LoginPopupProps {
  isVisible: boolean
  onClose: () => void
  onLoginSuccess: () => void
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isVisible, onClose, onLoginSuccess }) => {
  const [isRegisterForm, setRegisterForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (isRegister: boolean): boolean => {
    // Kiểm tra email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Vui lòng nhập email hợp lệ')
      return false
    }
    // Kiểm tra password
    if (formData.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự')
      return false
    }
    if (isRegister) {
      // Kiểm tra name
      if (!formData.name.trim() || formData.name.length < 2) {
        setError('Họ và tên phải có ít nhất 2 ký tự')
        return false
      }
      // Kiểm tra phone
      if (!/^\d{10}$/.test(formData.phone)) {
        setError('Số điện thoại phải có đúng 10 chữ số')
        return false
      }
      // Kiểm tra address
      if (!formData.address.trim()) {
        setError('Vui lòng nhập địa chỉ')
        return false
      }
    }
    return true
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!validateForm(false)) return

    setIsLoading(true)
    try {
      const response = await axios.post<AuthResponse>(`${API_URL_USER}/login`, {
        email: formData.email,
        password: formData.password
      })

      // Lưu accessToken và user vào localStorage
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setSuccessMessage('Đăng nhập thành công!')
      setTimeout(() => {
        onLoginSuccess()
        onClose()
      }, 1500)
    } catch {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!validateForm(true)) return

    setIsLoading(true)
    try {
      await axios.post<AuthResponse>(`${API_URL_USER}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 'user' // Backend mặc định role là 'user' nếu không gửi
      })

      setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.')
      setRegisterForm(false)
      setFormData((prev) => ({ ...prev, name: '', password: '', phone: '', address: '' }))
    } catch {
      setError('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetMessages = () => {
    setError('')
    setSuccessMessage('')
  }

  if (!isVisible) return null

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-md w-96 text-black'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>
            {isRegisterForm ? 'ĐĂNG KÝ TÀI KHOẢN GEARVN' : 'Đăng nhập hoặc tạo tài khoản'}
          </h2>
          <button
            onClick={() => {
              onClose()
              resetMessages()
            }}
            className='text-gray-500 hover:text-black'
          >
            ✖
          </button>
        </div>

        {error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}
        {successMessage && <div className='mb-4 text-green-500 text-sm'>{successMessage}</div>}

        {isRegisterForm ? (
          <form onSubmit={handleRegister}>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Họ và tên</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập họ và tên'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập email'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Mật khẩu</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập mật khẩu'
                required
                minLength={8}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Số điện thoại</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập số điện thoại'
                required
                pattern='\d{10}'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Địa chỉ</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập địa chỉ'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-red-600 text-white py-2 rounded-md disabled:bg-gray-400'
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'TẠO TÀI KHOẢN'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập email'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-1'>Mật khẩu</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md'
                placeholder='Nhập mật khẩu'
                required
                minLength={8}
              />
            </div>
            <button
              type='submit'
              className='w-full bg-red-600 text-white py-2 rounded-md disabled:bg-gray-400'
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        )}
        <div className='mt-4 text-center'>
          {isRegisterForm ? (
            <p className='text-sm'>
              Bạn đã có tài khoản?{' '}
              <button
                onClick={() => {
                  setRegisterForm(false)
                  resetMessages()
                }}
                className='text-blue-500 hover:underline'
              >
                Đăng nhập!
              </button>
            </p>
          ) : (
            <p className='text-sm'>
              Bạn chưa có tài khoản?{' '}
              <button
                onClick={() => {
                  setRegisterForm(true)
                  resetMessages()
                }}
                className='text-blue-500 hover:underline'
              >
                Đăng ký ngay!
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPopup
