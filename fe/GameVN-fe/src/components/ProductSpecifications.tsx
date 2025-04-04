import { useState } from 'react'
import { Product } from '../data/products'

interface Props {
  specifications: Product['specifications'] // Chỉ lấy phần specifications từ Product
}

const ProductSpecifications = ({ specifications }: Props) => {
  const [showFullSpecs, setShowFullSpecs] = useState(false)

  const specEntries = Object.entries(specifications || {}).map(([key, value]) => ({
    name: getDisplayName(key),
    value,
    key
  }))

  const initialSpecs = specEntries.slice(0, 5)
  const remainingSpecs = specEntries.slice(5)

  return (
    <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
      <h2 className='text-lg font-bold mb-4 text-gray-800'>Thông số kỹ thuật</h2>

      <div className='space-y-3'>
        {initialSpecs.map(({ name, value, key }) => (
          <div key={key} className='grid grid-cols-2 gap-4'>
            <span className='text-gray-600 text-sm'>{name}</span>
            <span className='font-medium text-sm text-gray-800'>{value}</span>
          </div>
        ))}
      </div>

      {remainingSpecs.length > 0 && (
        <>
          <button
            onClick={() => setShowFullSpecs(true)}
            className='mt-4 text-blue-600 text-sm font-medium hover:underline flex items-center'
          >
            Xem tất cả thông số
            <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          {showFullSpecs && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
              <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto'>
                <div className='p-6'>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold text-gray-800'>Thông số chi tiết</h2>
                    <button onClick={() => setShowFullSpecs(false)} className='text-gray-500 hover:text-gray-700'>
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>

                  <div className='space-y-3 divide-y divide-gray-100'>
                    {specEntries.map(({ name, value, key }) => (
                      <div key={key} className='grid grid-cols-2 gap-4 py-3'>
                        <span className='text-gray-600'>{name}</span>
                        <span className='font-medium text-gray-800'>{value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowFullSpecs(false)}
                    className='mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium'
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Helper function to convert keys to display names
function getDisplayName(key: string): string {
  const names: Record<string, string> = {
    status: 'Tình trạng',
    connection: 'Kết nối',
    led: 'Đèn LED',
    dpi: 'Độ phân giải',
    size: 'Kích thước',
    weight: 'Trọng lượng',
    buttons: 'Số nút bấm',
    sensor: 'Cảm biến',
    pollingRate: 'Tần số phản hồi',
    warranty: 'Bảo hành'
  }
  return names[key] || key
}

export default ProductSpecifications
