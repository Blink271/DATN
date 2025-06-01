import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../../components/FilterBar'
import { Product, PadDetails } from '../../types'
import axios from 'axios'
import { API_URL } from '../../constants'

const PadPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(12)
  const [pad, setPad] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMice = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product[]>(`${API_URL}/pad`)
        setPad(response.data)
      } catch (err) {
        setError('Không thể tải danh sách tay cầm')
        console.error('Error fetching mice:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMice()
  }, [])

  if (loading) {
    return <div className='text-center py-8'>Đang tải danh sách lót chuột...</div>
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>
  }

  if (pad.length === 0) {
    return <div className='text-center py-8'>Không có sản phẩm lót chuột nào</div>
  }

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12)
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Danh mục lót chuột</h1>
      <FilterBar />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {pad.slice(0, visibleCount).map((product) => {
          const details = product.details as PadDetails
          return (
            <Link to={`/product/pad/${product._id}`} key={product._id}>
              <div className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer h-full flex flex-col'>
                <img src={product.image_url} alt={product.name} className='w-full h-40 object-cover rounded-lg mb-2' />
                {product.sold_count > 50 && (
                  <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full w-[90px] mb-2'>
                    🔥 Bán chạy
                  </span>
                )}
                <h3 className='text-sm font-bold mb-1 line-clamp-2'>{product.name}</h3>
                <p className='text-xs text-gray-500 mb-2'>{product.brand}</p>

                {/* Mouse specific details */}
                <div className='space-y-1 text-xs text-gray-600 mb-2'>
                  <div className='flex items-center'>
                    <span className='mr-1'>•</span>
                    <span>
                      Kích thước: {details.width} x {details.height} x {details.thick}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='mr-1'>•</span>
                    <span>Chất liệu: {details.type}</span>
                  </div>
                </div>

                <div className='mt-auto'>
                  <div className='text-sm mb-1'>
                    <span className='text-red-500 font-bold mr-2'>{product.price.toLocaleString('vi-VN')}đ</span>
                  </div>

                  <div className='flex justify-between items-center text-xs'>
                    <div className='flex items-center'>
                      <span className='text-yellow-500 mr-1'>
                        {'★'.repeat(Math.min(5, Math.floor(product.sold_count / 10)))}
                        {'☆'.repeat(5 - Math.min(5, Math.floor(product.sold_count / 10)))}
                      </span>
                      <span className='text-gray-500'>({product.sold_count})</span>
                    </div>
                    <span className='text-gray-500'>{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {visibleCount < pad.length && (
        <div className='flex justify-center mt-6'>
          <button
            onClick={handleLoadMore}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  )
}

export default PadPage
