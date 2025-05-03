import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Product, MouseDetails } from '../types'
import { API_URL } from '../constants'

const ProductLists: React.FC = () => {
  const [mice, setMice] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMice = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product[]>(`${API_URL}/mouse`)
        setMice(response.data)
      } catch (err) {
        setError('Không thể tải danh sách chuột')
        console.error('Error fetching mice:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMice()
  }, [])

  if (loading) {
    return <div className='text-center py-8'>Đang tải danh sách chuột...</div>
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>
  }

  if (mice.length === 0) {
    return <div className='text-center py-8'>Không có sản phẩm chuột nào</div>
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Link to='/mouse'>
        <h2 className='text-xl font-bold mb-4 hover:underline cursor-pointer'>Chuột bán chạy</h2>
      </Link>
      <div className='flex overflow-x-auto space-x-4 scrollbar-hide pb-2'>
        {mice.map((mouse) => {
          const details = mouse.details as MouseDetails

          return (
            <Link to={`/product/mouse/${mouse._id}`} key={mouse._id}>
              <div className='flex-none w-60 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
                <img src={mouse.image_url} alt={mouse.name} className='w-full h-32 object-contain rounded-lg mb-2' />

                {mouse.sold_count > 50 && (
                  <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                    🔥 Bán chạy
                  </span>
                )}

                <h3 className='text-sm font-bold mb-1 line-clamp-1' title={mouse.name}>
                  {mouse.name}
                </h3>

                {/* Thông số kỹ thuật gọn gàng */}
                <ul className='text-xs text-gray-500 mb-2 space-y-1'>
                  <li className='flex'>
                    <span className='font-medium w-16'>Thương hiệu:</span>
                    <span>{mouse.brand}</span>
                  </li>
                  <li className='flex'>
                    <span className='font-medium w-16'>DPI:</span>
                    <span>{details.dpi}</span>
                  </li>
                  <li className='flex'>
                    <span className='font-medium w-16'>Kết nối:</span>
                    <span>{details.wireless ? 'Không dây' : 'Có dây'}</span>
                  </li>
                </ul>

                <div className='text-sm mb-2'>
                  <span className='text-red-500 font-bold'>{mouse.price.toLocaleString()}đ</span>
                </div>

                {/* <div className='text-xs text-yellow-500 flex items-center'>
                  {'★'.repeat(Math.floor(mouse.rating || 0))}
                  {'☆'.repeat(5 - Math.floor(mouse.rating || 0))}
                  <span className='ml-1 text-gray-500'>({mouse.reviews?.length || 0})</span>
                </div> */}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProductLists
