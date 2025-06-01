import React from 'react'
import { Product } from '../types'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  loading: boolean
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, loading }) => {
  return (
    <div className='bg-white rounded shadow overflow-x-auto'>
      <table className='min-w-full'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-3 text-left'>Tên</th>
            <th className='p-3 text-left'>Thương hiệu</th>
            <th className='p-3 text-left'>Giá</th>
            <th className='p-3 text-left'>Số lượng</th>
            <th className='p-3 text-left'>Danh mục</th>
            <th className='p-3 text-left'></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className='border-b'>
              <td className='p-3'>{product.name}</td>
              <td className='p-3'>{product.brand}</td>
              <td className='p-3'>{product.price}đ</td>
              <td className='p-3'>{product.stock}</td>
              <td className='p-3'>
                {{
                  mouse: 'Chuột',
                  keyboard: 'Bàn phím',
                  headphone: 'Tai nghe',
                  handheld: 'Tay cầm chơi game',
                  pad: 'Lót chuột'
                }[product.category] || product.category}
              </td>
              <td className='p-3'>
                <button
                  onClick={() => onEdit(product)}
                  className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                  disabled={loading}
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  disabled={loading}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
