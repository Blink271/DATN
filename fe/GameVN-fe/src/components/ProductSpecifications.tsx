import { useState } from 'react'
import { Product, MouseDetails, KeyboardDetails, HeadphoneDetails, HandheldDetails, PadDetails } from '../types'

interface Props {
  product: Product
}

const ProductSpecifications = ({ product }: Props) => {
  const [showFullSpecs, setShowFullSpecs] = useState(false)
  const details = product.details as MouseDetails | KeyboardDetails | HeadphoneDetails | HandheldDetails | PadDetails

  const getSpecifications = () => {
    const baseSpecs = [
      { name: 'Thương hiệu', value: product.brand },
      { name: 'Tình trạng', value: product.stock > 0 ? 'Còn hàng' : 'Hết hàng' },
      { name: 'Đã bán', value: product.sold_count }
    ]

    switch (product.category) {
      case 'mouse': {
        const mouseDetails = details as MouseDetails
        return [
          ...baseSpecs,
          { name: 'DPI', value: mouseDetails.dpi },
          { name: 'Loại cảm biến', value: mouseDetails.sensor_type },
          { name: 'Kết nối', value: mouseDetails.wireless ? 'Không dây' : 'Có dây' },
          { name: 'Đèn LED', value: mouseDetails.rgb ? 'Có RGB' : 'Không RGB' },
          { name: 'Số nút bấm', value: mouseDetails.buttons }
        ]
      }
      case 'keyboard': {
        const keyboardDetails = details as KeyboardDetails
        return [
          ...baseSpecs,
          { name: 'Loại switch', value: keyboardDetails.switch_type },
          { name: 'Bố cục', value: keyboardDetails.layout },
          { name: 'Key rollover', value: keyboardDetails.key_rollover },
          { name: 'Kết nối', value: keyboardDetails.wireless ? 'Không dây' : 'Có dây' },
          { name: 'Đèn LED', value: keyboardDetails.rgb ? 'Có RGB' : 'Không RGB' }
        ]
      }
      case 'headphone': {
        const headphoneDetails = details as HeadphoneDetails
        return [
          ...baseSpecs,
          { name: 'Kiểu', value: headphoneDetails.driver_size },
          { name: 'Tần số đáp ứng', value: headphoneDetails.frequency_response },
          { name: 'Kết nối', value: headphoneDetails.wireless ? 'Không dây' : 'Có dây' },
          { name: 'Microphone', value: headphoneDetails.microphone ? 'Có' : 'Không' },
          { name: 'Âm thanh vòm', value: headphoneDetails.surround_sound ? 'Có' : 'Không' }
        ]
      }
      case 'handheld': {
        const handheldDetails = details as HandheldDetails
        return [
          ...baseSpecs,
          { name: 'Dung lượng pin', value: `${handheldDetails.pin} mAh` },
          { name: 'Kết nối', value: handheldDetails.wireless ? 'Không dây' : 'Có dây' },
          { name: 'Đèn LED', value: handheldDetails.rgb ? 'Có RGB' : 'Không RGB' },
          { name: 'Số nút bấm', value: handheldDetails.buttons }
        ]
      }
      case 'pad': {
        const padDetails = details as PadDetails
        return [
          ...baseSpecs,
          { name: 'Kích thước', value: `${padDetails.width} x ${padDetails.height} x ${padDetails.thick} mm` },
          { name: 'Loại pad', value: padDetails.type }
        ]
      }
      default:
        return baseSpecs
    }
  }

  const specifications = getSpecifications()
  const initialSpecs = specifications.slice(0, 5)
  const remainingSpecs = specifications.slice(5)

  return (
    <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'>
      <h2 className='text-lg font-bold mb-4 text-gray-800'>Thông số kỹ thuật</h2>

      <div className='space-y-3'>
        {initialSpecs.map(({ name, value }, index) => (
          <div key={index} className='grid grid-cols-2 gap-4'>
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
                    {specifications.map(({ name, value }, index) => (
                      <div key={index} className='grid grid-cols-2 gap-4 py-3'>
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

export default ProductSpecifications
