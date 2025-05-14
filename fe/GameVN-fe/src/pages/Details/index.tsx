import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../constants'
import { Product } from '../../types'
import ProductSpecifications from '../../components/ProductSpecifications'

const DetailsPage: React.FC = () => {
  const { category, id } = useParams<{ category: 'mouse' | 'keyboard' | 'headphone'; id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product>(`${API_URL}/mouse/${id}`)
        setProduct(response.data)
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [category, id])

  if (loading) {
    return <div className='container mx-auto p-4 text-center'>Đang tải thông tin sản phẩm...</div>
  }

  if (error) {
    return <div className='container mx-auto p-4 text-red-500'>{error}</div>
  }

  if (!product) {
    return <div className='container mx-auto p-4'>Sản phẩm không tồn tại.</div>
  }

  const handleIncrease = () => {
    if (selectedQuantity < product.stock) {
      setSelectedQuantity(selectedQuantity + 1)
      setError('')
    } else {
      setError(`Bạn chỉ có thể đặt tối đa ${product.stock} sản phẩm.`)
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
    if (value > product.stock) {
      setError(`Bạn chỉ có thể đặt tối đa ${product.stock} sản phẩm.`)
    } else if (value < 1) {
      setError('Số lượng phải lớn hơn hoặc bằng 1.')
    } else {
      setSelectedQuantity(value)
      setError('')
    }
  }

  const handleAddToCart = () => {
    const productDetails = {
      id: product._id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      quantity: selectedQuantity,
      category: product.category
    }

    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart')
    const cartItems = existingCart ? JSON.parse(existingCart) : []

    // Check if product already exists in cart
    const existingProductIndex = cartItems.findIndex((item: any) => item.id === productDetails.id)
    if (existingProductIndex !== -1) {
      // Update quantity if product exists
      cartItems[existingProductIndex].quantity += selectedQuantity
    } else {
      // Add new product to cart
      cartItems.push(productDetails)
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems))

    // Navigate to cart page
    navigate('/cart')
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Product Image */}
        <div className='sticky top-4'>
          <img src={product.image_url} alt={product.name} className='w-full h-auto rounded-lg shadow-md' />
        </div>

        {/* Product Details */}
        <div>
          <h1 className='text-2xl font-bold mb-4'>{product.name}</h1>

          {/* Brand and Rating */}
          <div className='flex items-center mb-2'>
            <span className='text-gray-600 text-sm mr-4'>Thương hiệu: {product.brand}</span>
            <div className='flex items-center'>
              <span className='text-yellow-500 mr-1'>
                {'★'.repeat(Math.min(5, Math.floor(product.sold_count / 10)))}
                {'☆'.repeat(5 - Math.min(5, Math.floor(product.sold_count / 10)))}
              </span>
              <span className='text-gray-500 text-sm'>({product.sold_count})</span>
            </div>
          </div>

          {/* Price */}
          <div className='text-xl text-red-500 font-bold mb-4'>{product.price.toLocaleString('vi-VN')}đ</div>

          {/* Stock Status */}
          <div className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Tạm hết hàng'}
          </div>

          {/* Product Specifications (Summary) */}
          <div className='mb-6'>
            <ProductSpecifications product={product} />
          </div>

          {/* Quantity Selector */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Số lượng:</label>
            <div className='flex items-center space-x-2'>
              <button
                onClick={handleDecrease}
                className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                aria-label='Giảm số lượng'
                disabled={selectedQuantity <= 1}
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
                max={product.stock}
              />
              <button
                onClick={handleIncrease}
                className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                aria-label='Tăng số lượng'
                disabled={selectedQuantity >= product.stock}
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

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full px-6 py-3 rounded-lg transition-colors duration-200 ${
              product.stock <= 0 || selectedQuantity > product.stock
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={product.stock <= 0 || selectedQuantity > product.stock}
          >
            {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
          </button>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
        <h2 className='text-xl font-bold mb-4'>Mô tả sản phẩm</h2>
        <div className='prose max-w-none text-gray-700'>
          {product.description || 'Sản phẩm chất lượng cao với thiết kế hiện đại, phù hợp cho nhu cầu sử dụng đa dạng.'}
        </div>
      </div>
    </div>
  )
}

export default DetailsPage
