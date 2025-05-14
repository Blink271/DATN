import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Product, MouseDetails, HeadphoneDetails, KeyboardDetails } from '../types'
import { API_URL } from '../constants'

const ProductLists: React.FC = () => {
  const [mice, setMice] = useState<Product[]>([])
  const [headphone, setHeadphone] = useState<Product[]>([])
  const [keyboard, setKeyboard] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const responsemouse = await axios.get<Product[]>(`${API_URL}/mouse`)
        const responsehp = await axios.get<Product[]>(`${API_URL}/headphone`)
        const responsekeyboard = await axios.get<Product[]>(`${API_URL}/keyboard`)
        setMice(responsemouse.data)
        setHeadphone(responsehp.data)
        setKeyboard(responsekeyboard.data)
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm')
        console.error('Error fetching mice:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [])

  if (loading) {
    return <div className='text-center py-8'>Đang tải danh sách sản phẩm...</div>
  }

  if (error) {
    return <div className='text-center py-8 text-red-500'>{error}</div>
  }
 
  return (
    <>
    {/* Danh sách chuột */}
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Link to='/mouse'>
        <h2 className='text-xl font-bold mb-4 hover:underline cursor-pointer'>Chuột</h2>
      </Link>
      {mice.length === 0 ? (
        <div className='text-center py-8'>Không có sản phẩm chuột nào</div>
      ) : (
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
                </div>
              </Link>
            )
          })}
        </div>
      )}   
    </div>

    {/* Danh sách tai nghe */}
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Link to='/headphone'>
        <h2 className='text-xl font-bold mb-4 hover:underline cursor-pointer'>Tai Nghe</h2>
      </Link>
      {headphone.length === 0 ? (
        <div className='text-center py-8'>Không có sản phẩm Tai nghe nào</div>
      ) : (
        <div className='flex overflow-x-auto space-x-4 scrollbar-hide pb-2'>
          {headphone.map((headphone) => {
            const details = headphone.details as HeadphoneDetails

            return (
              <Link to={`/product/mouse/${headphone._id}`} key={headphone._id}>
                <div className='flex-none w-60 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
                  <img src={headphone.image_url} alt={headphone.name} className='w-full h-32 object-contain rounded-lg mb-2' />

                  {headphone.sold_count > 50 && (
                    <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                      🔥 Bán chạy
                    </span>
                  )}

                  <h3 className='text-sm font-bold mb-1 line-clamp-1' title={headphone.name}>
                    {headphone.name}
                  </h3>

                  {/* Thông số kỹ thuật gọn gàng */}
                  <ul className='text-xs text-gray-500 mb-2 space-y-1'>
                    <li className='flex'>
                      <span className='font-medium w-16'>Thương hiệu:</span>
                      <span>{headphone.brand}</span>
                    </li>
                    <li className='flex'>
                      <span className='font-medium w-16'>DPI:</span>
                      <span>{details.microphone ? 'Có Mic' : 'Không có Mic'}</span>
                    </li>
                    <li className='flex'>
                      <span className='font-medium w-16'>Kết nối:</span>
                      <span>{details.wireless ? 'Không dây' : 'Có dây'}</span>
                    </li>
                  </ul>

                  <div className='text-sm mb-2'>
                    <span className='text-red-500 font-bold'>{headphone.price.toLocaleString()}đ</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}   
    </div>

    {/* Danh sách bàn phím */}
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Link to='/keyboard'>
        <h2 className='text-xl font-bold mb-4 hover:underline cursor-pointer'>Bàn phím</h2>
      </Link>
      {keyboard.length === 0 ? (
        <div className='text-center py-8'>Không có sản phẩm bàn phím nào</div>
      ) : (
        <div className='flex overflow-x-auto space-x-4 scrollbar-hide pb-2'>
          {keyboard.map((keyboard) => {
            const details = keyboard.details as KeyboardDetails

            return (
              <Link to={`/product/keyboard/${keyboard._id}`} key={keyboard._id}>
                <div className='flex-none w-60 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
                  <img src={keyboard.image_url} alt={keyboard.name} className='w-full h-32 object-contain rounded-lg mb-2' />

                  {keyboard.sold_count > 50 && (
                    <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                      🔥 Bán chạy
                    </span>
                  )}

                  <h3 className='text-sm font-bold mb-1 line-clamp-1' title={keyboard.name}>
                    {keyboard.name}
                  </h3>

                  {/* Thông số kỹ thuật gọn gàng */}
                  <ul className='text-xs text-gray-500 mb-2 space-y-1'>
                    <li className='flex'>
                      <span className='font-medium w-16'>Thương hiệu:</span>
                      <span>{keyboard.brand}</span>
                    </li>
                    <li className='flex'>
                      <span className='font-medium w-16'>DPI:</span>
                      <span>{details.switch_type}</span>
                    </li>
                    <li className='flex'>
                      <span className='font-medium w-16'>Kết nối:</span>
                      <span>{details.wireless ? 'Không dây' : 'Có dây'}</span>
                    </li>
                  </ul>

                  <div className='text-sm mb-2'>
                    <span className='text-red-500 font-bold'>{keyboard.price.toLocaleString()}đ</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}   
    </div>
    </>
    
  )
}

export default ProductLists
