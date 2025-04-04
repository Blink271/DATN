import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../../data/products'
import ProductSpecifications from '../../components/ProductSpecifications'

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === Number(id))
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [error, setError] = useState('')

  if (!product) {
    return <div className='container mx-auto p-4'>Sản phẩm không tồn tại.</div>
  }

  const handleIncrease = () => {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity(selectedQuantity + 1)
      setError('')
    } else {
      setError(`Bạn chỉ có thể đặt tối đa ${product.quantity} sản phẩm.`)
    }
  }

  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1)
      setError('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value > product.quantity) {
      setError(`Bạn chỉ có thể đặt tối đa ${product.quantity} sản phẩm.`)
    } else if (value < 1) {
      setError('Số lượng phải lớn hơn hoặc bằng 1.')
    } else {
      setSelectedQuantity(value)
      setError('')
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Product Image */}
        <div>
          <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg shadow-md' />
        </div>

        {/* Product Details */}
        <div>
          <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
          <div className='text-yellow-500 flex items-center mb-2'>
            {'★'.repeat(product.rating)}
            {'☆'.repeat(5 - product.rating)}
            <span className='ml-2 text-gray-500'>({product.reviews} đánh giá)</span>
          </div>
          <div className='text-lg mb-4'>
            <span className='line-through text-gray-400 mr-2'>{product.oldPrice.toLocaleString()}đ</span>
            <span className='text-red-500 font-bold'>{product.price.toLocaleString()}đ</span>
            <span className='text-xs text-red-500 ml-2'>-{product.discount}%</span>
          </div>
          <ul className='list-disc list-inside text-gray-700 mb-4'>
            {product.features?.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>

          {/* Improved Quantity Selector */}
          <div className='mb-4'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={handleDecrease}
                className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                aria-label='Giảm số lượng'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 12H4' />
                </svg>
              </button>
              
              <input
                type='number'
                value={selectedQuantity}
                onChange={handleInputChange}
                className='w-20 text-center border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                min='1'
                max={product.quantity}
              />
              
              <button
                onClick={handleIncrease}
                className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                aria-label='Tăng số lượng'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
              </button>
            </div>
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          </div>

          <button
            className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
              selectedQuantity > product.quantity
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={selectedQuantity > product.quantity}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Product Specifications */}
      {product.specifications && (
        <div className='mt-8'>
          <ProductSpecifications specifications={product.specifications} />
        </div>
      )}

      {/* Product Description */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Mô tả sản phẩm</h2>
        <p className='text-gray-700'>
          {product.name} là sản phẩm chất lượng cao với thiết kế hiện đại, phù hợp cho nhu cầu sử dụng đa dạng. Sản phẩm
          được bảo hành chính hãng {product.specifications?.warranty || '12 tháng'}.
        </p>
      </div>
    </div>
  )
}

export default DetailsPage