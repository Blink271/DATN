import { Product } from '../types'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='product-card'>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()} VNĐ</p>
      <button>Thêm vào giỏ</button>
    </div>
  )
}

export default ProductCard
