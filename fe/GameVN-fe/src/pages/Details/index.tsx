import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../../data/products'

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <div className='container mx-auto p-4'>Sản phẩm không tồn tại.</div>
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-2 gap-6'>
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
          <button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Mô tả sản phẩm</h2>
        <p className='text-gray-700'>
          Chuột Razer Deathadder Essential White là một trong những dòng chuột bán chạy nhất của Razer, được thiết kế để
          mang lại trải nghiệm chơi game tốt nhất với độ chính xác cao, thiết kế công thái học và độ bền vượt trội.
        </p>
      </div>
    </div>
  )
}

export default DetailsPage
