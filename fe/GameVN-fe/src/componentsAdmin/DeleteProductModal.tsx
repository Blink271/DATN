import React from 'react'
import Modal from './Modal'

interface DeleteProductModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => Promise<boolean>
  loading: boolean
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ isOpen, onClose, onDelete, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Delete Product'>
      <div className='space-y-4'>
        <p>Are you sure you want to delete this product?</p>
        <div className='flex justify-end space-x-2'>
          <button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded' disabled={loading}>
            Cancel
          </button>
          <button
            onClick={async () => {
              const success = await onDelete()
              if (success) {
                onClose()
              }
            }}
            className='bg-red-500 text-white px-4 py-2 rounded'
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductModal
