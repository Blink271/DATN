// components/Footer.tsx
import { FaFacebookF, FaTiktok, FaYoutube, FaUsers } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

export default function Footer() {
  return (
    <footer className='bg-white text-black px-8 py-10 border-t border-gray-200'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-sm'>
        {/* VỀ GEARVN */}
        <div>
          <h3 className='font-semibold mb-2'>VỀ GEARVN</h3>
          <ul className='space-y-1'>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* CHÍNH SÁCH */}
        <div>
          <h3 className='font-semibold mb-2'>CHÍNH SÁCH</h3>
          <ul className='space-y-1'>
            <li>Chính sách bảo hành</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* THÔNG TIN */}
        <div>
          <h3 className='font-semibold mb-2'>THÔNG TIN</h3>
          <ul className='space-y-1'>
            <li>Hệ thống cửa hàng</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn trả góp</li>
            <li>Tra cứu địa chỉ bảo hành</li>
          </ul>
        </div>

        {/* TỔNG ĐÀI HỖ TRỢ */}
        <div>
          <h3 className='font-semibold mb-2'>
            TỔNG ĐÀI HỖ TRỢ <span className='text-xs text-gray-500'>(8:00 - 21:00)</span>
          </h3>
          <ul className='space-y-1'>
            <li>
              Mua hàng:{' '}
              <a href='tel:19005301' className='text-blue-600'>
                1900.5301
              </a>
            </li>
            <li>
              Bảo hành:{' '}
              <a href='tel:19005325' className='text-blue-600'>
                1900.5325
              </a>
            </li>
            <li>
              Khiếu nại:{' '}
              <a href='tel:18006173' className='text-blue-600'>
                1800.6173
              </a>
            </li>
            <li>
              Email:{' '}
              <a href='mailto:cskh@gearvn.com' className='text-blue-600'>
                cskh@gearvn.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className='mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between'>
        <span className='mb-4 md:mb-0 font-medium'>KẾT NỐI VỚI CHÚNG TÔI</span>
        <div className='flex gap-4 text-2xl text-black'>
          <a href='#'>
            <FaFacebookF />
          </a>
          <a href='#'>
            <FaTiktok />
          </a>
          <a href='#'>
            <FaYoutube />
          </a>
          <a href='#'>
            <SiZalo />
          </a>
          <a href='#'>
            <FaUsers />
          </a>
        </div>
      </div>
    </footer>
  )
}
