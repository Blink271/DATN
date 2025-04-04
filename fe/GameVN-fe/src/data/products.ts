export interface Product {
  id: number
  name: string
  image: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  reviews: number
  quantity: number
  description?: string
  features?: string[]
  specifications?: {
    status?: string
    connection?: string
    led?: string
    battery?: string
    dpi?: string
    size?: string
    weight?: string
    buttons?: string
    sensor?: string
    pollingRate?: string
    warranty?: string
    material?: string
    switches?: string
  }
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Chuột Razer Deathadder Essential White',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 410000,
    oldPrice: 790000,
    discount: 48,
    rating: 0,
    reviews: 0,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    features: ['Không', 'Có dây', 'Led RGB'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '6400',
      size: '127 x 61.7 x 42.7 mm',
      weight: '96g',
      buttons: '5',
      sensor: 'Razer 5G Optical',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 2,
    name: 'Chuột Razer DeathAdder Essential',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 400000,
    oldPrice: 790000,
    discount: 49,
    rating: 5,
    reviews: 2,
    features: ['Không', 'Có dây', 'Led RGB'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '6400',
      size: '127 x 61.7 x 42.7 mm',
      weight: '96g',
      buttons: '5',
      sensor: 'Razer 5G Optical',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 3,
    name: 'Chuột Không Dây Rapoo M21 Silent',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 150000,
    oldPrice: 200000,
    discount: 25,
    rating: 0,
    reviews: 0,
    features: ['Pin rời', 'Không dây', 'DPI - 1.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Không dây',
      battery: 'Pin AA',
      dpi: '1000',
      size: '113 x 61 x 36 mm',
      weight: '85g',
      buttons: '3',
      pollingRate: '125Hz',
      warranty: '12 tháng'
    }
  },
  {
    id: 4,
    name: 'Chuột Steelseries Aerox 3 Wireless Snow Edition',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 2490000,
    oldPrice: 3490000,
    discount: 29,
    rating: 0,
    reviews: 0,
    features: ['Pin sạc', 'Không dây', 'Led RGB'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Không dây',
      led: 'RGB',
      battery: 'Pin sạc',
      dpi: '18000',
      size: '120 x 66 x 37.5 mm',
      weight: '66g',
      buttons: '6',
      sensor: 'TrueMove Air',
      pollingRate: '1000Hz',
      warranty: '24 tháng',
      material: 'Nhựa nguyên sinh'
    }
  },
  {
    id: 5,
    name: 'Chuột Steelseries Aerox 3 Wireless Onyx',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 2190000,
    oldPrice: 3190000,
    discount: 31,
    rating: 0,
    reviews: 0,
    features: ['Có dây', 'RGB'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '8500',
      size: '120 x 66 x 37.5 mm',
      weight: '59g',
      buttons: '6',
      sensor: 'TrueMove Core',
      pollingRate: '1000Hz',
      warranty: '24 tháng',
      material: 'Nhựa nguyên sinh'
    }
  },
  {
    id: 6,
    name: 'Chuột Logitech G102 Lightsync RGB',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 450000,
    oldPrice: 600000,
    discount: 25,
    rating: 4,
    reviews: 15,
    features: ['Có dây', 'Led RGB', 'DPI - 8.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '8000',
      size: '116.6 x 62.15 x 38.2 mm',
      weight: '85g',
      buttons: '6',
      sensor: 'Mercury',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 7,
    name: 'Chuột Corsair Katar Pro XT',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 690000,
    oldPrice: 890000,
    discount: 22,
    rating: 5,
    reviews: 10,
    features: ['Có dây', 'Led RGB', 'DPI - 18.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '18000',
      size: '115.8 x 64.2 x 37.8 mm',
      weight: '73g',
      buttons: '6',
      sensor: 'PixArt PMW3391',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 8,
    name: 'Chuột ASUS ROG Gladius II Origin',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 1490000,
    oldPrice: 1990000,
    discount: 25,
    rating: 4,
    reviews: 8,
    features: ['Có dây', 'Led RGB', 'DPI - 12.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '12000',
      size: '126 x 67 x 45 mm',
      weight: '110g',
      buttons: '6',
      sensor: 'PixArt PMW3360',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 9,
    name: 'Chuột HyperX Pulsefire FPS Pro',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 990000,
    oldPrice: 1290000,
    discount: 23,
    rating: 5,
    reviews: 12,
    features: ['Có dây', 'Led RGB', 'DPI - 16.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '16000',
      size: '127.6 x 71.1 x 41 mm',
      weight: '95g',
      buttons: '6',
      sensor: 'PixArt PMW3389',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 10,
    name: 'Chuột Zowie EC2-B',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 1590000,
    oldPrice: 1790000,
    discount: 11,
    rating: 4,
    reviews: 5,
    features: ['Có dây', 'Không Led', 'DPI - 3.200'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      dpi: '3200',
      size: '120 x 64 x 40 mm',
      weight: '90g',
      buttons: '5',
      sensor: 'PixArt PMW3360',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 11,
    name: 'Chuột Razer Viper Mini',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 890000,
    oldPrice: 1090000,
    discount: 18,
    rating: 5,
    reviews: 20,
    features: ['Có dây', 'Led RGB', 'DPI - 8.500'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '8500',
      size: '118.3 x 53.5 x 38.3 mm',
      weight: '61g',
      buttons: '6',
      sensor: 'Razer Optical',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 12,
    name: 'Chuột Logitech MX Master 3',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 2490000,
    oldPrice: 2990000,
    discount: 17,
    rating: 5,
    reviews: 30,
    features: ['Không dây', 'Pin sạc', 'DPI - 4.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Không dây',
      battery: 'Pin sạc',
      dpi: '4000',
      size: '124.9 x 84.3 x 51 mm',
      weight: '141g',
      buttons: '7',
      pollingRate: '125Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 13,
    name: 'Chuột SteelSeries Rival 3',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 690000,
    oldPrice: 890000,
    discount: 22,
    rating: 4,
    reviews: 18,
    features: ['Có dây', 'Led RGB', 'DPI - 8.500'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '8500',
      size: '120.6 x 67 x 37.9 mm',
      weight: '77g',
      buttons: '6',
      sensor: 'TrueMove Core',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 14,
    name: 'Chuột Cooler Master MM711',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 990000,
    oldPrice: 1290000,
    discount: 23,
    rating: 5,
    reviews: 10,
    features: ['Có dây', 'Led RGB', 'DPI - 16.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '16000',
      size: '116.6 x 62.6 x 38.3 mm',
      weight: '60g',
      buttons: '6',
      sensor: 'PixArt PMW3389',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 15,
    name: 'Chuột Glorious Model O',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 1490000,
    oldPrice: 1790000,
    discount: 17,
    rating: 5,
    reviews: 25,
    features: ['Có dây', 'Led RGB', 'DPI - 12.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Có dây',
      led: 'RGB',
      dpi: '12000',
      size: '128 x 66 x 37.5 mm',
      weight: '67g',
      buttons: '6',
      sensor: 'PixArt PMW3360',
      pollingRate: '1000Hz',
      warranty: '24 tháng'
    }
  },
  {
    id: 20,
    name: 'Chuột Logitech G Pro Wireless',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    quantity: 100,
    description: 'Mới 100% - Fullbox',
    price: 3000000,
    oldPrice: 3500000,
    discount: 14,
    rating: 5,
    reviews: 25,
    features: ['Không dây', 'Pin sạc', 'DPI - 25.000'],
    specifications: {
      status: 'Mới 100% - Fullbox',
      connection: 'Không dây',
      battery: 'Pin sạc',
      dpi: '25600',
      size: '125 x 63.5 x 40 mm',
      weight: '80g',
      buttons: '8',
      sensor: 'HERO 25K',
      pollingRate: '1000Hz',
      warranty: '24 tháng',
      material: 'Nhựa cao cấp',
      switches: 'Omron 20M'
    }
  }
]
