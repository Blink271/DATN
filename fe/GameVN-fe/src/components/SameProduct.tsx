import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Product } from '../types'
import { API_URL } from '../constants'

interface RelatedProductsProps {
  currentProductBrand: string
  currentProductId: string
  category: string
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductBrand, currentProductId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get<Product[]>(`${API_URL}/${category}`)

        // Lọc sản phẩm cùng hãng, loại trừ sản phẩm hiện tại và giới hạn 5 sản phẩm
        const filteredProducts = response.data
          .filter((product) => product.brand === currentProductBrand && product._id !== currentProductId)
          .slice(0, 5)

        setRelatedProducts(filteredProducts)
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm liên quan')
        console.error('Error fetching related products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductBrand, currentProductId, category])

  if (loading) {
    return <div className='text-center py-4'>Đang tải sản phẩm liên quan...</div>
  }

  if (error) {
    return <div className='text-center py-4 text-red-500'>{error}</div>
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className='mt-8 bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Sản phẩm cùng thương hiệu</h2>
      <div className='flex overflow-x-auto space-x-4 scrollbar-hide pb-2'>
        {relatedProducts.map((product) => (
          <Link to={`/product/${category}/${product._id}`} key={product._id}>
            <div className='flex-none w-48 border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
              <img src={product.image_url} alt={product.name} className='w-full h-28 object-contain rounded-lg mb-2' />

              {product.sold_count > 50 && (
                <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                  🔥 Bán chạy
                </span>
              )}

              <h3 className='text-sm font-bold mb-1 line-clamp-2' title={product.name}>
                {product.name}
              </h3>

              <div className='text-sm'>
                <span className='text-red-500 font-bold'>{product.price.toLocaleString()}đ</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
