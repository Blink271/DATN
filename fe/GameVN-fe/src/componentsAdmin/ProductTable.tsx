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
            <th className='p-3 text-left'>Name</th>
            <th className='p-3 text-left'>Brand</th>
            <th className='p-3 text-left'>Price</th>
            <th className='p-3 text-left'>Stock</th>
            <th className='p-3 text-left'>Category</th>
            <th className='p-3 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className='border-b'>
              <td className='p-3'>{product.name}</td>
              <td className='p-3'>{product.brand}</td>
              <td className='p-3'>{product.price}đ</td>
              <td className='p-3'>{product.stock}</td>
              <td className='p-3'>{product.category}</td>
              <td className='p-3'>
                <button
                  onClick={() => onEdit(product)}
                  className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className='bg-red-500 text-white px-2 py-1 rounded'
                  disabled={loading}
                >
                  Delete
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
