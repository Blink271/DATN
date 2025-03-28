import React from 'react'

const FilterBar: React.FC = () => {
  const filters = [
    { label: 'Bộ lọc', icon: '🔍' },
    { label: 'Tình trạng sản phẩm' },
    { label: 'Giá' },
    { label: 'Hãng' },
    { label: 'Kết nối' },
    { label: 'LED' },
    { label: 'Loại sản phẩm' },
    { label: 'Màu sắc' },
    { label: 'Pin' }
  ]

  return (
    <div className='flex items-center justify-between mb-6'>
      <div className='flex space-x-2'>
        {filters.map((filter, index) => (
          <button
            key={index}
            className='border px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-100 transition'
          >
            {filter.icon && <span className='mr-2'>{filter.icon}</span>}
            {filter.label}
          </button>
        ))}
      </div>
      <div>
        <button className='border px-4 py-2 rounded-lg text-sm flex items-center hover:bg-gray-100 transition'>
          <span className='mr-2'>📋</span>
          Xếp theo: Nổi bật
        </button>
      </div>
    </div>
  )
}

export default FilterBar
