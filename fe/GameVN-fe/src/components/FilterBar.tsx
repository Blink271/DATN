import React from 'react'

const FilterBar: React.FC = () => {

  return (
    <div className='flex items-center justify-between mb-6'>
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
