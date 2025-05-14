import React from 'react'
import CategoryFields from './CategoryFields'
import { ProductFormData } from '../types'

interface ProductFormProps {
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  handleCategoryChange: (category: 'mouse' | 'keyboard' | 'headphone') => void
  loading: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, setFormData, handleCategoryChange, loading }) => {
  return (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Tên sản phẩm</label>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Thuơng hiệu</label>
        <input
          type='text'
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Giá</label>
        <input
          type='number'
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Số lượng</label>
        <input
          type='number'
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Đường link hình ảnh</label>
        <input
          type='text'
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Danh mục</label>
        <select
          value={formData.category}
          onChange={(e) => handleCategoryChange(e.target.value as 'mouse' | 'keyboard' | 'headphone')}
          className='w-full p-2 border rounded'
          disabled={loading}
        >
          <option value='mouse'>Chuột</option>
          <option value='keyboard'>Bàn phím</option>
          <option value='headphone'>Tai nghe</option>
        </select>
      </div>
      <CategoryFields category={formData.category} formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default ProductForm
