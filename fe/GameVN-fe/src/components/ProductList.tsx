import React from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const ProductList: React.FC = () => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Link to='/mouse'>
        <h2 className='text-xl font-bold mb-4 hover:underline cursor-pointer'>Chuột bán chạy</h2>
      </Link>
      <div className='flex overflow-x-auto space-x-4 scrollbar-hide'>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className='flex-none w-60 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow hover:cursor-pointer'>
              <img src={product.image} alt={product.name} className='w-full h-32 object-cover rounded-lg mb-2' />
              <span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2'>
                🔥 Bán chạy
              </span>
              <h3 className='text-sm font-bold mb-1'>{product.name}</h3>
              <ul className='text-xs text-gray-500 mb-2'>
                {product.features?.map((feature, index) => <li key={index}>{feature}</li>)}
              </ul>
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
    </div>
  )
}

export default ProductList
