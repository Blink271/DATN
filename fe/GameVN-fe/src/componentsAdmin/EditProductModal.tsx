import React, { useState } from 'react'
import Modal from './Modal'
import ProductForm from './ProductForm'
import { ProductFormData } from '../types'

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: ProductFormData) => Promise<boolean>
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  handleCategoryChange: (category: 'mouse' | 'keyboard' | 'headphone') => void
  loading: boolean
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  formData,
  setFormData,
  handleCategoryChange,
  loading
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const success = await onSave(formData)
      if (success) {
        onClose()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Edit Product'>
      <div className='space-y-4'>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleCategoryChange={handleCategoryChange}
          loading={loading || isSubmitting}
        />

        <div className='flex justify-end space-x-2 pt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors'
            disabled={loading || isSubmitting}
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors'
            disabled={loading || isSubmitting}
          >
            {isSubmitting ? 'Lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProductModal
