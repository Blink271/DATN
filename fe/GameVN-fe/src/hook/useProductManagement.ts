import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Product, ProductFormData, MouseDetails, HeadphoneDetails, KeyboardDetails } from '../types'

const API_URL = 'http://localhost:3000/api/products'

const useProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setProducts(response.data as Product[])
      toast.success('Fetched products successfully!')
    } catch {
      toast.error('Error fetching products')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (formData: ProductFormData): boolean => {
    if (!formData.name || !formData.brand || !formData.description || formData.price <= 0 || formData.stock < 0) {
      toast.error('Please fill in all required fields with valid values')
      return false
    }
    if (formData.category === 'mouse' && (!formData.mouseDetails?.dpi || !formData.mouseDetails?.sensor_type)) {
      toast.error('Please fill in all mouse details')
      return false
    }
    if (
      formData.category === 'keyboard' &&
      (!formData.keyboardDetails?.switch_type || !formData.keyboardDetails?.layout)
    ) {
      toast.error('Please fill in all keyboard details')
      return false
    }
    if (
      formData.category === 'headphone' &&
      (!formData.headphoneDetails?.driver_size || !formData.headphoneDetails?.frequency_response)
    ) {
      toast.error('Please fill in all headphone details')
      return false
    }
    return true
  }

  const handleAddProduct = async (formData: ProductFormData, resetForm: () => void): Promise<boolean> => {
    if (!validateForm(formData)) return false

    setLoading(true)
    try {
      // Base payload
      const payload: Partial<Product> & {
        mouseDetails?: MouseDetails
        keyboardDetails?: KeyboardDetails
        headphoneDetails?: HeadphoneDetails
      } = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        image_url: formData.image_url
      }

      // Add category-specific details
      switch (formData.category) {
        case 'mouse':
          if (formData.mouseDetails) {
            payload.details = formData.mouseDetails
          }
          break
        case 'keyboard':
          if (formData.keyboardDetails) {
            payload.details = formData.keyboardDetails
          }
          break
        case 'headphone':
          if (formData.headphoneDetails) {
            payload.details = formData.headphoneDetails
          }
          break
        default:
          throw new Error(`Invalid product category: ${formData.category}`)
      }

      const response = await axios.post<Product>(`${API_URL}/${formData.category}`, payload)

      setProducts((prev) => [...prev, response.data])
      resetForm()
      toast.success('Product added successfully!')
      return true
    } catch {
      toast.error('Failed to add product')
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = async (formData: ProductFormData, productId: string): Promise<boolean> => {
    if (!validateForm(formData)) return false

    setLoading(true)
    try {
      // Base payload
      const payload: Partial<Product> & {
        mouseDetails?: MouseDetails
        keyboardDetails?: KeyboardDetails
        headphoneDetails?: HeadphoneDetails
      } = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        image_url: formData.image_url
      }

      // Add category-specific details
      switch (formData.category) {
        case 'mouse':
          if (formData.mouseDetails) {
            payload.details = formData.mouseDetails
          }
          break
        case 'keyboard':
          if (formData.keyboardDetails) {
            payload.details = formData.keyboardDetails
          }
          break
        case 'headphone':
          if (formData.headphoneDetails) {
            payload.details = formData.headphoneDetails
          }
          break
        default:
          throw new Error(`Invalid product category: ${formData.category}`)
      }

      const response = await axios.put<Product>(`${API_URL}/${formData.category}/${productId}`, payload)

      setProducts((prev) => prev.map((p) => (p._id === productId ? response.data : p)))

      toast.success('Product updated successfully!')
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string, category: string) => {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/${category}/${productId}`)
      setProducts((prev) => prev.filter((p) => p._id !== productId))
      toast.success('Product deleted successfully!')
      return true
    } catch {
      toast.error('Error deleting product')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    fetchProducts,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct
  }
}

export default useProductManagement
