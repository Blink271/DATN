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
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div className='flex justify-end space-x-2'>
          <button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded' disabled={loading}>
            Hủy
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
            Xóa
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteProductModal
