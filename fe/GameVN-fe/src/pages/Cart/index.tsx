import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

enum CheckoutStep {
  CART = 1,
  INFO = 2,
  PAYMENT = 3,
  COMPLETION = 4
}

const CartPage = () => {
  const location = useLocation()
  const product = location.state

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.CART)
  const [quantity, setQuantity] = useState(1)
  const [showDiscountInput, setShowDiscountInput] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [name, setName] = useState('Nguyễn Văn A')
  const [phone, setPhone] = useState('0123456789')
  const [address, setAddress] = useState('Hà Nội, Việt Nam')
  const [notes, setNotes] = useState('Ghi chú thêm cho đơn hàng')
  const [requireInvoice, setRequireInvoice] = useState(false)

  const shippingFee = 40000
  const total = product ? product.price * quantity + shippingFee : 0

  const handleCheckout = () => {
    setCurrentStep(CheckoutStep.INFO)
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(CheckoutStep.PAYMENT)
    // Trong thực tế, bạn sẽ xử lý thanh toán ở đây
  }

  const renderCartStep = () => (
    <>
      {product && (
        <div className='border-t border-b border-gray-200 py-4 mb-6'>
          <div className='flex justify-between items-start mb-4'>
            <img src={product.image} alt={product.name} className='w-16 h-16 object-cover rounded m-1' />
            
            <div>
              <h3 className='font-medium'>{product.name}</h3>
              <button className='text-red-500 text-sm mt-1'>Xoá</button>
            </div>
            <div className='text-right'>
              <p className='font-medium'>{product.price.toLocaleString()}đ</p>
              <div className='flex items-center justify-end mt-1'>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='w-6 h-6 border border-gray-300 rounded flex items-center justify-center'
                >
                  -
                </button>
                <span className='mx-2'>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className='w-6 h-6 border border-gray-300 rounded flex items-center justify-center'
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discount code */}
      <div className='mb-6'>
        <button onClick={() => setShowDiscountInput(!showDiscountInput)} className='flex items-center text-gray-600'>
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
      </div>

      {/* Summary */}
      <div className='border-t border-gray-200 pt-4 mb-6'>
        <div className='flex justify-between mb-2'>
          <span>Phí vận chuyển:</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className='w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'
      >
        ĐẶT HÀNG NGAY
      </button>
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
        />
      </div>

      {/* Invoice checkbox */}
      <div className='mb-4'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox h-4 w-4 text-blue-600'
            checked={requireInvoice}
            onChange={(e) => setRequireInvoice(e.target.checked)}
          />
          <span className='ml-2'>Xuất hoá đơn cho đơn hàng</span>
        </label>
      </div>

      {/* Order summary */}
      <div className='border-t border-gray-200 pt-4 mb-6'>
        <div className='flex justify-between mb-2'>
          <span>Phí vận chuyển:</span>
          <span>{shippingFee.toLocaleString()}đ</span>
        </div>
        <div className='flex justify-between font-bold text-lg'>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'
      >
        ĐẶT HÀNG NGAY
      </button>
    </form>
  )

  const renderPaymentStep = () => (
    <div className='text-center py-8'>
      <h2 className='text-xl font-bold mb-4'>Trang Thanh Toán</h2>
      <p className='mb-6'>Đây là nơi bạn sẽ tích hợp cổng thanh toán</p>
      <div className='border-t border-gray-200 pt-4 mb-6'>
        <div className='flex justify-between font-bold text-lg'>
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString()}đ</span>
        </div>
      </div>
      <button
        onClick={() => setCurrentStep(CheckoutStep.COMPLETION)}
        className='w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'
      >
        HOÀN TẤT ĐƠN HÀNG
      </button>
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
      <Link to='/'>
        <button className='w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition-colors'>
          QUAY LẠI TRANG CHỦ
        </button>
      </Link>
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
          ? 'Mua thêm sản phẩm khác'
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

      {renderCurrentStep()}
    </div>
  )
}

export default CartPage
