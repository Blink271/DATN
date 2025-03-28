import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import FilterBar from '../../components/FilterBar'

const MousePage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(12)

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12)
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Danh mục Chuột</h1>
      <FilterBar />
      <div className='grid grid-cols-4 gap-6'>
        {products.slice(0, visibleCount).map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
              <img src={product.image} alt={product.name} className='w-full h-40 object-cover rounded-lg mb-2' />
              <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                🔥 Bán chạy
              </span>
              <h3 className='text-sm font-bold mb-1'>{product.name}</h3>
              <div className='text-sm mb-2'>
                <span className='line-through text-gray-400 mr-2'>{product.oldPrice.toLocaleString()}đ</span>
                <span className='text-red-500 font-bold'>{product.price.toLocaleString()}đ</span>
                <span className='text-xs text-red-500 ml-2'>-{product.discount}%</span>
              </div>
              <div className='text-xs text-yellow-500 flex items-center'>
                {'★'.repeat(product.rating)}
                {'☆'.repeat(5 - product.rating)}
                <span className='ml-1 text-gray-500'>({product.reviews} đánh giá)</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < products.length && (
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

export default MousePage
