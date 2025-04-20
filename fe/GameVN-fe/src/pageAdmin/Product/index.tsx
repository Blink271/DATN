import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import Modal from '../../componentsAdmin/Modal'

interface Product {
  id: number
  name: string
  brand: string
  description: string
  price: number
  stock: number
  image_url: string
  category: 'mouse' | 'keyboard' | 'headphone'
  sold_count: number
  created_at: string
}

interface MouseDetails {
  dpi: number
  sensor_type: string
  wireless: boolean
  rgb: boolean
  buttons: number
}

interface KeyboardDetails {
  switch_type: string
  layout: string
  key_rollover: string
  wireless: boolean
  rgb: boolean
}

interface HeadphoneDetails {
  driver_size: string
  frequency_response: string
  wireless: boolean
  microphone: boolean
  surround_sound: boolean
}

interface ProductFormData {
  name: string
  brand: string
  description: string
  price: number
  stock: number
  image_url: string
  category: 'mouse' | 'keyboard' | 'headphone'
  mouseDetails?: MouseDetails
  keyboardDetails?: KeyboardDetails
  headphoneDetails?: HeadphoneDetails
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    description: '',
    price: 0,
    stock: 0,
    image_url: '',
    category: 'mouse',
    mouseDetails: { dpi: 0, sensor_type: '', wireless: false, rgb: false, buttons: 0 }
  })

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Gaming Mouse',
        brand: 'Logitech',
        description: 'High precision gaming mouse',
        price: 59.99,
        stock: 100,
        image_url: 'mouse.jpg',
        category: 'mouse',
        sold_count: 50,
        created_at: '2023-01-01'
      }
    ]
    setProducts(mockProducts)
  }, [])

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        ...formData,
        id: products.length + 1,
        sold_count: 0,
        created_at: new Date().toISOString()
      }
    ])
    setIsAddModalOpen(false)
    resetForm()
  }

  const handleEditProduct = () => {
    if (selectedProduct && formData) {
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...formData, id: product.id, sold_count: product.sold_count, created_at: product.created_at }
            : product
        )
      )
      setIsEditModalOpen(false)
      setSelectedProduct(null)
      resetForm()
    }
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((product) => product.id !== selectedProduct.id))
      setIsDeleteModalOpen(false)
      setSelectedProduct(null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: 0,
      stock: 0,
      image_url: '',
      category: 'mouse',
      mouseDetails: { dpi: 0, sensor_type: '', wireless: false, rgb: false, buttons: 0 }
    })
  }

  const handleCategoryChange = (category: 'mouse' | 'keyboard' | 'headphone') => {
    setFormData({
      ...formData,
      category,
      mouseDetails:
        category === 'mouse' ? { dpi: 0, sensor_type: '', wireless: false, rgb: false, buttons: 0 } : undefined,
      keyboardDetails:
        category === 'keyboard'
          ? { switch_type: '', layout: '', key_rollover: '', wireless: false, rgb: false }
          : undefined,
      headphoneDetails:
        category === 'headphone'
          ? { driver_size: '', frequency_response: '', wireless: false, microphone: false, surround_sound: false }
          : undefined
    })
  }

  const renderCategoryFields = () => {
    if (formData.category === 'mouse') {
      return (
        <>
          <input
            type='number'
            placeholder='DPI'
            value={formData.mouseDetails?.dpi || 0}
            onChange={(e) =>
              setFormData({
                ...formData,
                mouseDetails: { ...formData.mouseDetails!, dpi: Number(e.target.value) }
              })
            }
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Sensor Type'
            value={formData.mouseDetails?.sensor_type || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                mouseDetails: { ...formData.mouseDetails!, sensor_type: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.mouseDetails?.wireless || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mouseDetails: { ...formData.mouseDetails!, wireless: e.target.checked }
                })
              }
              className='mr-2'
            />
            Wireless
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.mouseDetails?.rgb || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mouseDetails: { ...formData.mouseDetails!, rgb: e.target.checked }
                })
              }
              className='mr-2'
            />
            RGB
          </label>
          <input
            type='number'
            placeholder='Buttons'
            value={formData.mouseDetails?.buttons || 0}
            onChange={(e) =>
              setFormData({
                ...formData,
                mouseDetails: { ...formData.mouseDetails!, buttons: Number(e.target.value) }
              })
            }
            className='w-full p-2 border rounded'
          />
        </>
      )
    } else if (formData.category === 'keyboard') {
      return (
        <>
          <input
            type='text'
            placeholder='Switch Type'
            value={formData.keyboardDetails?.switch_type || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                keyboardDetails: { ...formData.keyboardDetails!, switch_type: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Layout'
            value={formData.keyboardDetails?.layout || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                keyboardDetails: { ...formData.keyboardDetails!, layout: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Key Rollover'
            value={formData.keyboardDetails?.key_rollover || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                keyboardDetails: { ...formData.keyboardDetails!, key_rollover: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.keyboardDetails?.wireless || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keyboardDetails: { ...formData.keyboardDetails!, wireless: e.target.checked }
                })
              }
              className='mr-2'
            />
            Wireless
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.keyboardDetails?.rgb || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keyboardDetails: { ...formData.keyboardDetails!, rgb: e.target.checked }
                })
              }
              className='mr-2'
            />
            RGB
          </label>
        </>
      )
    } else if (formData.category === 'headphone') {
      return (
        <>
          <input
            type='text'
            placeholder='Driver Size'
            value={formData.headphoneDetails?.driver_size || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                headphoneDetails: { ...formData.headphoneDetails!, driver_size: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Frequency Response'
            value={formData.headphoneDetails?.frequency_response || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                headphoneDetails: { ...formData.headphoneDetails!, frequency_response: e.target.value }
              })
            }
            className='w-full p-2 border rounded'
          />
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.headphoneDetails?.wireless || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  headphoneDetails: { ...formData.headphoneDetails!, wireless: e.target.checked }
                })
              }
              className='mr-2'
            />
            Wireless
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.headphoneDetails?.microphone || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  headphoneDetails: { ...formData.headphoneDetails!, microphone: e.target.checked }
                })
              }
              className='mr-2'
            />
            Microphone
          </label>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={formData.headphoneDetails?.surround_sound || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  headphoneDetails: { ...formData.headphoneDetails!, surround_sound: e.target.checked }
                })
              }
              className='mr-2'
            />
            Surround Sound
          </label>
        </>
      )
    }
    return null
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1'>
        <AdminSidebar />
        <main className='flex-1 p-6 bg-gray-50 overflow-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Product Management</h2>
            <button
              onClick={() => {
                resetForm()
                setIsAddModalOpen(true)
              }}
              className='bg-green-500 text-white px-4 py-2 rounded'
            >
              Add Product
            </button>
          </div>
          <div className='bg-white rounded shadow overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-3 text-left'>ID</th>
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
                  <tr key={product.id} className='border-b'>
                    <td className='p-3'>{product.id}</td>
                    <td className='p-3'>{product.name}</td>
                    <td className='p-3'>{product.brand}</td>
                    <td className='p-3'>${product.price}</td>
                    <td className='p-3'>{product.stock}</td>
                    <td className='p-3'>{product.category}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => {
                          setSelectedProduct(product)
                          setFormData({
                            name: product.name,
                            brand: product.brand,
                            description: product.description,
                            price: product.price,
                            stock: product.stock,
                            image_url: product.image_url,
                            category: product.category,
                            mouseDetails:
                              product.category === 'mouse'
                                ? { dpi: 16000, sensor_type: 'Optical', wireless: true, rgb: true, buttons: 6 }
                                : undefined,
                            keyboardDetails:
                              product.category === 'keyboard'
                                ? {
                                    switch_type: 'Cherry MX',
                                    layout: 'ANSI',
                                    key_rollover: 'NKRO',
                                    wireless: false,
                                    rgb: true
                                  }
                                : undefined,
                            headphoneDetails:
                              product.category === 'headphone'
                                ? {
                                    driver_size: '50mm',
                                    frequency_response: '20-20000Hz',
                                    wireless: true,
                                    microphone: true,
                                    surround_sound: true
                                  }
                                : undefined
                          })
                          setIsEditModalOpen(true)
                        }}
                        className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsDeleteModalOpen(true)
                        }}
                        className='bg-red-500 text-white px-2 py-1 rounded'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Modal */}
          <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add New Product'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Brand'
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <textarea
                placeholder='Description'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='Price'
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='Stock'
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Image URL'
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value as 'mouse' | 'keyboard' | 'headphone')}
                className='w-full p-2 border rounded'
              >
                <option value='mouse'>Mouse</option>
                <option value='keyboard'>Keyboard</option>
                <option value='headphone'>Headphone</option>
              </select>
              {renderCategoryFields()}
              <div className='flex justify-end space-x-2 pt-4'>
                <button onClick={() => setIsAddModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Cancel
                </button>
                <button onClick={handleAddProduct} className='bg-green-500 text-white px-4 py-2 rounded'>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Edit Product Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title='Edit Product'>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Brand'
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <textarea
                placeholder='Description'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='Price'
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='Stock'
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className='w-full p-2 border rounded'
              />
              <input
                type='text'
                placeholder='Image URL'
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className='w-full p-2 border rounded'
              />
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value as 'mouse' | 'keyboard' | 'headphone')}
                className='w-full p-2 border rounded'
              >
                <option value='mouse'>Mouse</option>
                <option value='keyboard'>Keyboard</option>
                <option value='headphone'>Headphone</option>
              </select>
              {renderCategoryFields()}
              <div className='flex justify-end space-x-2 pt-4'>
                <button onClick={() => setIsEditModalOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded'>
                  Cancel
                </button>
                <button onClick={handleEditProduct} className='bg-blue-500 text-white px-4 py-2 rounded'>
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Delete Product Modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title='Delete Product'>
            <div className='space-y-4'>
              <p>Are you sure you want to delete this product?</p>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                >
                  Cancel
                </button>
                <button onClick={handleDeleteProduct} className='bg-red-500 text-white px-4 py-2 rounded'>
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  )
}

export default AdminProducts
