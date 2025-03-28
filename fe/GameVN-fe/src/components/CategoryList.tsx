import React from 'react'

const categories = [
  { icon: 'fas fa-laptop', name: 'Laptop' },
  { icon: 'fas fa-gamepad', name: 'Laptop Gaming' },
  { icon: 'fas fa-desktop', name: 'PC GVN' },
  { icon: 'fas fa-microchip', name: 'Main, CPU, VGA' },
  { icon: 'fas fa-hdd', name: 'Case, Nguồn, Tản' },
  { icon: 'fas fa-memory', name: 'Ổ cứng, RAM, Thẻ nhớ' },
  { icon: 'fas fa-volume-up', name: 'Loa, Micro, Webcam' },
  { icon: 'fas fa-tv', name: 'Màn hình' },
  { icon: 'fas fa-keyboard', name: 'Bàn phím' },
  { icon: 'fas fa-mouse', name: 'Chuột & Lót chuột' },
  { icon: 'fas fa-headphones', name: 'Tai nghe' },
  { icon: 'fas fa-chair', name: 'Ghế - Bàn' },
  { icon: 'fas fa-network-wired', name: 'Phần mềm, mạng' },
  { icon: 'fas fa-gamepad', name: 'Handheld, Console' },
  { icon: 'fas fa-plug', name: 'Phụ kiện' },
  { icon: 'fas fa-concierge-bell', name: 'Dịch vụ' }
]

const CategoryList: React.FC = () => {
  return (
    <aside className='w-1/4 bg-gray-100 p-4 rounded-lg shadow-md'>
      <ul className='space-y-4'>
        <li className='font-bold text-lg'>Danh mục</li>
        {categories.map((category, index) => (
          <li key={index}>
            <a href='#' className='flex items-center gap-2 hover:text-blue-600'>
              <i className={category.icon}></i> {category.name}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategoryList
