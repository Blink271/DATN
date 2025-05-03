interface Product {
  _id: string
  name: string
  brand: string
  description: string
  price: number
  stock: number
  image_url: string
  category: 'mouse' | 'keyboard' | 'headphone'
  sold_count: number
  created_at: string
  details: MouseDetails | KeyboardDetails | HeadphoneDetails
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

export type { Product, MouseDetails, KeyboardDetails, HeadphoneDetails, ProductFormData }
