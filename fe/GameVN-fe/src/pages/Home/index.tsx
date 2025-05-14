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
            <img
              src='https://file.hstatic.net/200000722513/file/thu_cu_doi_moi_banner_web_slider_800x400.jpg'
              alt='Banner 1'
              className='rounded-lg shadow-md w-full'
            />
            <img
              src='https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_web_slider_800x400.jpg'
              alt='Banner 2'
              className='rounded-lg shadow-md w-full'
            />
            <img
              src='https://file.hstatic.net/200000722513/file/thang_04_laptop_gaming_banner_web_slider_800x400.jpg'
              alt='Banner 3'
              className='rounded-lg shadow-md w-full'
            />
            <img
              src='https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_web_slider_800x400.jpg'
              alt='Banner 4'
              className='rounded-lg shadow-md w-full'
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      <ProductList />
    </div>
  )
}

export default Home
