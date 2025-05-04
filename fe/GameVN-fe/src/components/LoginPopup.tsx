import { useState } from 'react';
import axios from 'axios';

// Interface cho User (dựa trên API response, không bao gồm các trường nhạy cảm)
interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface cho response của đăng ký và đăng nhập
interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}


interface LoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isVisible, onClose, onLoginSuccess }) => {
  const [isRegisterForm, setRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (isRegister: boolean): boolean => {
    if (!formData.email.includes('@')) {
      setError('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return false;
    }
    if (isRegister) {
      if (!formData.name.trim()) {
        setError('Vui lòng nhập họ và tên');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Vui lòng nhập số điện thoại');
        return false;
      }
      if (!formData.address.trim()) {
        setError('Vui lòng nhập địa chỉ');
        return false;
      }
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!validateForm(false)) return;

    setIsLoading(true);
    try {
      const response = await axios.post<AuthResponse>('/api/users/login', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSuccessMessage('Đăng nhập thành công!');
      setTimeout(() => {
        onLoginSuccess();
        onClose();
      }, 1500);
    } catch{
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin tài khoản.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm(true)) return;

    setIsLoading(true);
    try {
      await axios.post<AuthResponse>('/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address
      });

      setSuccessMessage('Đăng ký thành công! Vui lòng đăng nhập.');
      setRegisterForm(false);
      setFormData(prev => ({ ...prev, name: '', password: '', phone: '', address: '' }));
    } catch {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-md w-96 text-black'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>
            {isRegisterForm ? 'ĐĂNG KÝ TÀI KHOẢN GEARVN' : 'Đăng nhập hoặc tạo tài khoản'}
          </h2>
          <button 
            onClick={() => {
              onClose();
              resetMessages();
            }} 
            className='text-gray-500 hover:text-black'
          >
            ✖
          </button>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {successMessage && <div className="mb-4 text-green-500 text-sm">{successMessage}</div>}

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
            </ button>
          </form>
        )}
        <div className='mt-4 text-center'>
          {isRegisterForm ? (
            <p className='text-sm'>
              Bạn đã có tài khoản?{' '}
              <button 
                onClick={() => {
                  setRegisterForm(false);
                  resetMessages();
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
                  setRegisterForm(true);
                  resetMessages();
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
  );
};

export default LoginPopup;