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
            <div className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer h-full flex flex-col'>
              <img src={product.image} alt={product.name} className='w-full h-40 object-cover rounded-lg mb-2' />
              <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full w-[90px]'>🔥 Bán chạy</span>
              <h3 className='text-sm font-bold mb-1 line-clamp-2'>{product.name}</h3>

              <div className='space-y-1 text-xs text-gray-600 mb-2'>
                {product.features?.map((feature, index) => (
                  <div key={index} className='flex items-center'>
                    <span className='mr-1'>•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className='mt-auto'>
                <div className='text-sm mb-1'>
                  <span className='line-through text-gray-400 mr-2'>{product.oldPrice.toLocaleString()}đ</span>
                  <span className='text-red-500 font-bold mr-2'>{product.price.toLocaleString()}đ</span>
                  <span className='text-xm font-bold text-red-500'>-{product.discount}%</span>
                </div>

                <div className='text-xs flex items-center'>
                  <span className='text-yellow-500 mr-1'>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className='text-gray-500'>({product.reviews} đánh giá)</span>
                </div>
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
