export interface Product {
  id: number
  name: string
  image: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  reviews: number
  features?: string[]
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
    features: ['Không', 'Có dây', 'Led RGB']
  },
  {
    id: 2,
    name: 'Chuột Razer DeathAdder Essential',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 400000,
    oldPrice: 790000,
    discount: 49,
    rating: 5,
    reviews: 2,
    features: ['Không', 'Có dây', 'Led RGB']
  },
  {
    id: 3,
    name: 'Chuột Không Dây Rapoo M21 Silent',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 150000,
    oldPrice: 200000,
    discount: 25,
    rating: 0,
    reviews: 0,
    features: ['Pin rời', 'Không dây', 'DPI - 1.000']
  },
  {
    id: 4,
    name: 'Chuột Steelseries Aerox 3 Wireless Snow Edition',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 2490000,
    oldPrice: 3490000,
    discount: 29,
    rating: 0,
    reviews: 0,
    features: ['Pin sạc', 'Không dây', 'Led RGB']
  },
  {
    id: 5,
    name: 'Chuột Steelseries Aerox 3 Wireless Onyx',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 2190000,
    oldPrice: 3190000,
    discount: 31,
    rating: 0,
    reviews: 0,
    features: ['Có dây', 'RGB']
  },
  {
    id: 6,
    name: 'Chuột Logitech G102 Lightsync RGB',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 450000,
    oldPrice: 600000,
    discount: 25,
    rating: 4,
    reviews: 10,
    features: ['Có dây', 'Led RGB', 'DPI - 8.000']
  },
  {
    id: 7,
    name: 'Chuột Corsair Harpoon RGB Wireless',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 1200000,
    oldPrice: 1500000,
    discount: 20,
    rating: 5,
    reviews: 5,
    features: ['Không dây', 'Led RGB', 'Pin sạc']
  },
  {
    id: 8,
    name: 'Chuột ASUS ROG Gladius II Origin',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 1800000,
    oldPrice: 2200000,
    discount: 18,
    rating: 4,
    reviews: 8,
    features: ['Có dây', 'Led RGB', 'DPI - 12.000']
  },
  {
    id: 9,
    name: 'Chuột MSI Clutch GM41 Lightweight Wireless',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 2000000,
    oldPrice: 2500000,
    discount: 20,
    rating: 5,
    reviews: 3,
    features: ['Không dây', 'Led RGB', 'Pin sạc']
  },
  {
    id: 10,
    name: 'Chuột HyperX Pulsefire FPS Pro RGB',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 900000,
    oldPrice: 1200000,
    discount: 25,
    rating: 4,
    reviews: 6,
    features: ['Có dây', 'Led RGB', 'DPI - 16.000']
  },
  {
    id: 11,
    name: 'Chuột Gaming Fuhlen G90',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 550000,
    oldPrice: 700000,
    discount: 21,
    rating: 4,
    reviews: 12,
    features: ['Có dây', 'Led RGB', 'DPI - 4.000']
  },
  {
    id: 12,
    name: 'Chuột DareU EM908 RGB',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 350000,
    oldPrice: 500000,
    discount: 30,
    rating: 3,
    reviews: 8,
    features: ['Có dây', 'Led RGB', 'DPI - 6.000']
  },
  {
    id: 13,
    name: 'Chuột Logitech MX Master 3',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 2500000,
    oldPrice: 3000000,
    discount: 17,
    rating: 5,
    reviews: 20,
    features: ['Không dây', 'Pin sạc', 'Ergonomic']
  },
  {
    id: 14,
    name: 'Chuột Razer Basilisk X Hyperspeed',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 1200000,
    oldPrice: 1500000,
    discount: 20,
    rating: 4,
    reviews: 15,
    features: ['Không dây', 'Pin rời', 'DPI - 16.000']
  },
  {
    id: 15,
    name: 'Chuột SteelSeries Rival 3',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 600000,
    oldPrice: 800000,
    discount: 25,
    rating: 4,
    reviews: 10,
    features: ['Có dây', 'Led RGB', 'DPI - 8.500']
  },
  {
    id: 16,
    name: 'Chuột Cooler Master MM711',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 900000,
    oldPrice: 1200000,
    discount: 25,
    rating: 5,
    reviews: 18,
    features: ['Có dây', 'Led RGB', 'Siêu nhẹ']
  },
  {
    id: 17,
    name: 'Chuột Zowie EC2',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 1500000,
    oldPrice: 1800000,
    discount: 17,
    rating: 4,
    reviews: 12,
    features: ['Có dây', 'Ergonomic', 'DPI - 3.200']
  },
  {
    id: 18,
    name: 'Chuột Corsair M65 RGB Elite',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 1700000,
    oldPrice: 2000000,
    discount: 15,
    rating: 5,
    reviews: 14,
    features: ['Có dây', 'Led RGB', 'DPI - 18.000']
  },
  {
    id: 19,
    name: 'Chuột HyperX Pulsefire Haste',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 800000,
    oldPrice: 1000000,
    discount: 20,
    rating: 4,
    reviews: 10,
    features: ['Có dây', 'Led RGB', 'Siêu nhẹ']
  },
  {
    id: 20,
    name: 'Chuột Logitech G Pro Wireless',
    image: `https://picsum.photos/400/200?random=${Math.random() * 100}`,
    price: 3000000,
    oldPrice: 3500000,
    discount: 14,
    rating: 5,
    reviews: 25,
    features: ['Không dây', 'Pin sạc', 'DPI - 25.000']
  }
]
