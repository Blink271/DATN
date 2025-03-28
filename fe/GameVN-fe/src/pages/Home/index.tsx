import Slider from '../../components/Slider'
import ProductList from '../../components/ProductList'
import CategoryList from '../../components/CategoryList'

const Home: React.FC = () => {
  return (
    <div className='container mx-auto flex flex-col gap-6'>
      {/* Main content */}
      <div className='flex gap-4'>
        {/* Sidebar danh mục */}
        <CategoryList />

        {/* Slider and Banners */}
        <div className='w-3/4 flex flex-col gap-6'>
          {/* Slider */}
          <Slider />

          {/* Banners */}
          <div className='grid grid-cols-2 gap-4'>
            <img src='https://picsum.photos/400/200?random=1' alt='Banner 1' className='rounded-lg shadow-md' />
            <img src='https://picsum.photos/400/200?random=2' alt='Banner 2' className='rounded-lg shadow-md' />
            <img src='https://picsum.photos/400/200?random=3' alt='Banner 3' className='rounded-lg shadow-md' />
            <img src='https://picsum.photos/400/200?random=4' alt='Banner 4' className='rounded-lg shadow-md' />
          </div>
        </div>
      </div>

      {/* Product List */}
      <ProductList />
    </div>
  )
}

export default Home
