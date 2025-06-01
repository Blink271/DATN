import React from 'react'
import Modal from './Modal'
import ProductForm from './ProductForm'
import { ProductFormData } from '../types'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: ProductFormData, resetForm: () => void) => Promise<boolean>
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  handleCategoryChange: (category: 'mouse' | 'keyboard' | 'headphone' | 'handheld' | 'pad') => void
  loading: boolean
  resetForm: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  handleCategoryChange,
  loading,
  resetForm
}) => {
  const handleSave = async () => {
    const success = await onSave(formData, resetForm)
    if (success) {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Thêm sản phẩm'>
      <div className='space-y-4'>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleCategoryChange={handleCategoryChange}
          loading={loading}
        />
        <div className='flex justify-end space-x-2 pt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors'
            disabled={loading}
          >
            {loading ? 'Lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddProductModal
