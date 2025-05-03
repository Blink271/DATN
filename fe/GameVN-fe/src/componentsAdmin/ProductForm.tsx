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
        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Brand</label>
        <input
          type='text'
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
        <input
          type='number'
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Stock</label>
        <input
          type='number'
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Image URL</label>
        <input
          type='text'
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className='w-full p-2 border rounded'
          disabled={loading}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
        <select
          value={formData.category}
          onChange={(e) => handleCategoryChange(e.target.value as 'mouse' | 'keyboard' | 'headphone')}
          className='w-full p-2 border rounded'
          disabled={loading}
        >
          <option value='mouse'>Mouse</option>
          <option value='keyboard'>Keyboard</option>
          <option value='headphone'>Headphone</option>
        </select>
      </div>
      <CategoryFields category={formData.category} formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default ProductForm
