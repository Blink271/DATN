import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AxiosError } from 'axios'
import { API_URL_ORDER } from '../../constants'

enum CheckoutStep {
  CART = 1,
  INFO = 2,
  PAYMENT = 3,
  COMPLETION = 4
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

interface User {
  _id: string
  name: string
}

const CartPage = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.CART)
  const [showDiscountInput, setShowDiscountInput] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [requireInvoice, setRequireInvoice] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User | null>(null)

  const shippingFee = 40000
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + shippingFee

  // Load cart and user info on mount
  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch {
        setError('Không thể tải giỏ hàng.')
      }
    }

    // Load user info from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ _id: parsedUser._id, name: parsedUser.name })
        setName(parsedUser.name || '')
        setPhone(parsedUser.phone || '')
        setAddress(parsedUser.address || '')
      } catch {
        setError('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.')
      }
    }
  }, [])

  const handleCheckout = () => {
    if (!user) {
      setError('Vui lòng đăng nhập trước khi đặt hàng.')
      return
    }
    if (cartItems.length === 0) {
      setError('Giỏ hàng trống. Vui lòng thêm sản phẩm.')
      return
    }
    setCurrentStep(CheckoutStep.INFO)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(CheckoutStep.PAYMENT)
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Giỏ hàng trống. Vui lòng thêm sản phẩm.')
      return
    }

    if (!user) {
      setError('Vui lòng đăng nhập trước khi đặt hàng.')
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) {
      setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const orderData = {
        userId: user._id,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: total,
        shippingFee,
        name,
        phone,
        address,
        notes: notes || undefined,
        requireInvoice,
        discountCode: discountCode || undefined
      }

      interface OrderResponse {
        _id: string
      }

      const response = await axios.post<OrderResponse>(API_URL_ORDER, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data && response.data._id) {
        setCurrentStep(CheckoutStep.COMPLETION)
        // Clear cart after successful order
        localStorage.removeItem('cart')
        setCartItems([])
      } else {
        setError('Đặt hàng thất bại. Vui lòng thử lại!')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
        } else {
          setError(error.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại!')
        }
      } else {
        setError('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại!')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep > CheckoutStep.CART) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleContinueShopping = () => {
    // Navigate to the mouse page or another category page
    navigate('/')
  }

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const renderCartStep = () => (
    <>
      {cartItems.length === 0 ? (
        <div className='text-center py-4'>
          <p className='text-gray-600'>Giỏ hàng của bạn đang trống.</p>
          <button
            onClick={handleContinueShopping}
            className='mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors'
          >
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className='border-t border-b border-gray-200 py-4 mb-6'>
              <div className='flex justify-between items-start mb-4'>
                <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded m-1' />
                <div>
                  <h3 className='font-medium'>{item.name}</h3>
                  <button onClick={() => handleRemoveItem(item.id)} className='text-red-500 text-sm mt-1'>
                    Xoá
                  </button>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{item.price.toLocaleString()}đ</p>
                  <div className='flex items-center justify-end mt-1'>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className='w-6 h-6 border border-gray-300 rounded flex items-center justify-center'
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className='mx-2'>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className='w-6 h-6 border border-gray-300 rounded flex items-center justify-center'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Discount code */}
          {/* <div className='mb-6'>
            <button
              onClick={() => setShowDiscountInput(!showDiscountInput)}
              className='flex items-center text-gray-600'
            >
              Sử dụng mã giảm giá <span className='ml-1'>{showDiscountInput ? '▲' : '▼'}</span>
            </button>
            {showDiscountInput && (
              <div className='mt-2 flex'>
                <input
                  type='text'
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder='Nhập mã giảm giá'
                  className='flex-1 border border-gray-300 rounded-l px-3 py-2'
                />
                <button className='bg-blue-600 text-white px-4 py-2 rounded-r'>Áp dụng</button>
              </div>
            )}
          </div> */}

          {/* Summary */}
          <div className='border-t border-gray-200 pt-4 mb-6'>
            <div className='flex justify-between mb-2'>
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span>Phí vận chuyển:</span>
              <span>{shippingFee.toLocaleString()}đ</span>
            </div>
            <div className='flex justify-between font-bold text-lg'>
              <span>Tổng tiền:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>

          <div className='flex gap-4'>
            <button
              onClick={handleContinueShopping}
              className='w-1/2 bg-gray-300 text-black py-3 rounded font-medium hover:bg-gray-400 transition-colors'
            >
              TIẾP TỤC MUA HÀNG
            </button>
            <button
              onClick={handleCheckout}
              className='w-1/2 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        </>
      )}
    </>
  )

  const renderInfoStep = () => (
    <form onSubmit={handleSubmitOrder}>
      {/* Name input */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Nhập họ tên</label>
        <input
          type='text'
          className='w-full border border-gray-300 rounded px-3 py-2'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Họ và tên'
          required
        />
      </div>

      {/* Phone input */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Nhập số điện thoại</label>
        <input
          type='tel'
          className='w-full border border-gray-300 rounded px-3 py-2'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Số điện thoại (10 số)'
          required
        />
      </div>

      {/* Address input */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Địa chỉ nhận hàng</label>
        <textarea
          className='w-full border border-gray-300 rounded px-3 py-2'
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Địa chỉ giao hàng'
          required
        />
      </div>

      {/* Additional notes */}
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Lưu ý, yêu cầu khác (Không bắt buộc)</label>
        <textarea
          className='w-full border border-gray-300 rounded px-3 py-2'
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Ghi chú cho đơn hàng'
        />
      </div>

      {/* Invoice checkbox */}
      {/* <div className='mb-4'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox h-4 w-4 text-blue-600'
            checked={requireInvoice}
            onChange={(e) => setRequireInvoice(e.target.checked)}
          />
          <span className='ml-2'>Xuất hoá đơn cho đơn hàng</span>
        </label>
      </div> */}

      {/* Order summary */}
      <div className='border-t border-gray-200 pt-4 mb-6'>
        <div className='flex justify-between mb-2'>
          <span>Tạm tính:</span>
          <span>{subtotal.toLocaleString()}đ</span>
        </div>
        <div className='flex justify-between mb-2'>
          <span>Phí vận chuyển:</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>

      <div className='flex gap-4'>
        <button
          type='button'
          onClick={handleBack}
          className='w-1/2 bg-gray-300 text-black py-3 rounded font-medium hover:bg-gray-400 transition-colors'
        >
          TRỞ LẠI
        </button>
        <button
          type='submit'
          className='w-1/2 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'
        >
          ĐẶT HÀNG NGAY
        </button>
      </div>
    </form>
  )

  const renderPaymentStep = () => (
    <div className='text-center py-8'>
      <h2 className='text-xl font-bold mb-4'>Thông tin đặt hàng</h2>
      {error && <div className='mb-4 text-red-500'>{error}</div>}
      <div className='border-t border-gray-200 pt-4 mb-6'>
        <div className='flex justify-between font-bold text-lg'>
          <span>Họ tên:</span>
          <span>{name}</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>SĐT</span>
          <span>{phone}</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>Địa chỉ</span>
          <span>{address}</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>
      <div className='flex gap-4'>
        <button
          type='button'
          onClick={handleBack}
          className='w-1/2 bg-gray-300 text-black py-3 rounded font-medium hover:bg-gray-400 transition-colors'
        >
          TRỞ LẠI
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className='w-1/2 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400'
        >
          {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}
        </button>
      </div>
    </div>
  )

  const renderCompletionStep = () => (
    <div className='text-center py-8'>
      <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10 text-green-600'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      <h2 className='text-xl font-bold mb-2'>Đặt hàng thành công!</h2>
      <p className='text-gray-600 mb-6'>Cảm ơn bạn đã đặt hàng</p>
      <div className='flex gap-4 justify-center'>
        <Link to='/' className='w-1/2'>
          <button className='w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'>
            QUAY LẠI TRANG CHỦ
          </button>
        </Link>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case CheckoutStep.INFO:
        return renderInfoStep()
      case CheckoutStep.PAYMENT:
        return renderPaymentStep()
      case CheckoutStep.COMPLETION:
        return renderCompletionStep()
      default:
        return renderCartStep()
    }
  }

  return (
    <div className='max-w-md mx-auto p-4 font-sans'>
      <h1 className='text-2xl font-bold mb-6'>
        {currentStep === CheckoutStep.CART
          ? 'Thông tin giỏ hàng'
          : currentStep === CheckoutStep.INFO
            ? 'Thông tin khách mua hàng'
            : currentStep === CheckoutStep.PAYMENT
              ? 'Thanh toán'
              : 'Hoàn tất đơn hàng'}
      </h1>

      {/* Progress steps */}
      <div className='flex justify-between mb-8 relative'>
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className='flex flex-col items-center z-10'>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step}
            </div>
            <span className='text-sm'>
              {step === 1 ? 'Giỏ hàng' : step === 2 ? 'Thông tin đặt hàng' : step === 3 ? 'Thanh toán' : 'Hoàn tất'}
            </span>
          </div>
        ))}
        <div className='absolute top-4 left-0 right-0 h-0.5 bg-gray-300 -z-10'></div>
        <div
          className='absolute top-4 left-0 h-0.5 bg-blue-600 -z-10'
          style={{
            width: `${((currentStep - 1) / 3) * 100}%`
          }}
        ></div>
      </div>

      {error && <div className='mb-4 text-red-500'>{error}</div>}
      {renderCurrentStep()}
    </div>
  )
}

export default CartPage
