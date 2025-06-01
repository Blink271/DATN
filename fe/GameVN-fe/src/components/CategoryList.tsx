import React from 'react'
import { Link } from 'react-router-dom'
import { FaKeyboard, FaMouse, FaHeadphones, FaGamepad } from 'react-icons/fa'

const categories = [
  { icon: FaKeyboard, name: 'Bàn phím', cat: 'keyboard' },
  { icon: FaMouse, name: 'Chuột', cat: 'mouse' },
  { icon: FaHeadphones, name: 'Tai nghe', cat: 'headphone' },
  { icon: FaGamepad, name: 'Tay cầm chơi game', cat: 'handheld' },
  { icon: FaMouse, name: 'Pad chuột', cat: 'pad' }
]

const CategoryList: React.FC = () => {
  return (
    <aside className='w-1/4 bg-gray-100 p-4 rounded-lg shadow-md'>
      <ul className='space-y-4'>
        <li className='font-bold text-lg'>Danh mục</li>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/${category.cat}`} className='flex items-center gap-2 hover:text-blue-600'>
              <category.icon /> <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategoryList
