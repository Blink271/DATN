import React from 'react'
import { ProductFormData } from '../types'

interface CategoryFieldsProps {
  category: 'mouse' | 'keyboard' | 'headphone'
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
}

const CategoryFields: React.FC<CategoryFieldsProps> = ({ category, formData, setFormData }) => {
  if (category === 'mouse') {
    return (
      <>
        <label className='block text-sm font-medium text-gray-700 mb-1'>DPI</label>
        <input
          type='number'
          value={formData.mouseDetails?.dpi || 0}
          onChange={(e) =>
            setFormData({
              ...formData,
              mouseDetails: { ...formData.mouseDetails!, dpi: Number(e.target.value) }
            })
          }
          className='w-full p-2 border rounded'
        />
        <label className='block text-sm font-medium text-gray-700 mb-1'>Cảm biến</label>
        <input
          type='text'
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
          Kết nối không dây
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
        <label className='block text-sm font-medium text-gray-700 mb-1'>Số lượng nút</label>
        <input
          type='number'
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
  } else if (category === 'keyboard') {
    return (
      <>
        <input
          type='text'
          placeholder='Loại Switch'
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
          placeholder='Bố cục'
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
          type='number'
          placeholder='Số lượng phím nhận cùng lúc'
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
          Kết nối không dây
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
  } else if (category === 'headphone') {
    return (
      <>
        <select
          value={formData.headphoneDetails?.driver_size || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              headphoneDetails: { ...formData.headphoneDetails!, driver_size: e.target.value }
            })
          }
          className='w-full p-2 border rounded'
        >
          <option value=''>Loại tai nghe</option>
          <option value='nhét tai'>Nhét tai</option>
          <option value='trùm tai'>Trùm tai</option>
        </select>
        <input
          type='text'
          placeholder='Tần số phản hồi'
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
          Kết nối không dây
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
          Âm thanh vòm
        </label>
      </>
    )
  }
  return null
}

export default CategoryFields
