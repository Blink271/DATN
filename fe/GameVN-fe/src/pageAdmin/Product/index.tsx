import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import ProductTable from '../../componentsAdmin/ProductTable'
import AddProductModal from '../../componentsAdmin/AddProductModal'
import EditProductModal from '../../componentsAdmin/EditProductModal'
import DeleteProductModal from '../../componentsAdmin/DeleteProductModal'
import useProductManagement from '../../hook/useProductManagement'
import { Product, ProductFormData, MouseDetails, KeyboardDetails, HeadphoneDetails } from '../../types'

const AdminProducts: React.FC = () => {
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
  const [localLoading, setLocalLoading] = useState(false)

  const { products, loading, handleAddProduct, handleEditProduct, handleDeleteProduct } = useProductManagement()

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

  const handleEditClick = async (product: Product) => {
    setSelectedProduct(product)
    setLocalLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${product.category}/${product._id}`)
      const productData = response.data as Product

      // Base form data
      const baseFormData = {
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        image_url: productData.image_url,
        category: productData.category
      }

      // Handle details based on category
      let formData: ProductFormData
      switch (productData.category) {
        case 'mouse': {
          const mouseDetails = productData.details as MouseDetails
          formData = {
            ...baseFormData,
            mouseDetails: {
              dpi: mouseDetails.dpi,
              sensor_type: mouseDetails.sensor_type,
              wireless: mouseDetails.wireless,
              rgb: mouseDetails.rgb,
              buttons: mouseDetails.buttons
            },
            keyboardDetails: undefined,
            headphoneDetails: undefined
          }
          break
        }
        case 'keyboard': {
          const keyboardDetails = productData.details as KeyboardDetails
          formData = {
            ...baseFormData,
            keyboardDetails: {
              switch_type: keyboardDetails.switch_type,
              layout: keyboardDetails.layout,
              key_rollover: keyboardDetails.key_rollover,
              wireless: keyboardDetails.wireless,
              rgb: keyboardDetails.rgb
            },
            mouseDetails: undefined,
            headphoneDetails: undefined
          }
          break
        }
        case 'headphone': {
          const headphoneDetails = productData.details as HeadphoneDetails
          formData = {
            ...baseFormData,
            headphoneDetails: {
              driver_size: headphoneDetails.driver_size,
              frequency_response: headphoneDetails.frequency_response,
              wireless: headphoneDetails.wireless,
              microphone: headphoneDetails.microphone,
              surround_sound: headphoneDetails.surround_sound
            },
            mouseDetails: undefined,
            keyboardDetails: undefined
          }
          break
        }
        default:
          throw new Error('Invalid product category')
      }

      setFormData(formData)
      setIsEditModalOpen(true)
    } catch (error) {
      console.error('Error fetching product details:', error)
      toast.error('Failed to load product details')
    } finally {
      setLocalLoading(false)
    }
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
              disabled={loading || localLoading}
            >
              Add Product
            </button>
          </div>
          {loading || localLoading ? (
            <div className='text-center'>Loading...</div>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEditClick}
              onDelete={(product) => {
                setSelectedProduct(product)
                setIsDeleteModalOpen(true)
              }}
              loading={loading || localLoading}
            />
          )}
          <AddProductModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddProduct}
            formData={formData}
            setFormData={setFormData}
            handleCategoryChange={handleCategoryChange}
            loading={loading || localLoading}
            resetForm={resetForm}
          />
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false)
              setSelectedProduct(null)
            }}
            onSave={(formData) =>
              selectedProduct ? handleEditProduct(formData, selectedProduct._id) : Promise.resolve(false)
            }
            formData={formData}
            setFormData={setFormData}
            handleCategoryChange={handleCategoryChange}
            loading={loading || localLoading}
          />
          <DeleteProductModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setSelectedProduct(null)
            }}
            onDelete={() =>
              selectedProduct
                ? handleDeleteProduct(selectedProduct._id, selectedProduct.category)
                : Promise.resolve(false)
            }
            loading={loading || localLoading}
          />
        </main>
      </div>
    </div>
  )
}

export default AdminProducts
