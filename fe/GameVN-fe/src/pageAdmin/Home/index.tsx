import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../componentsAdmin/Sidebar'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { API_URL, API_URL_USER, API_URL_ORDER } from '../../constants'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Product {
  _id: string
  name: string
  sold_count: number
  price: number
  category: string
}

interface Order {
  _id: string
  status: string
  totalAmount: number
  created_at: string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSold: 0,
    totalRevenue: 0
  })
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = localStorage.getItem('token') || ''
        const config = { headers: { Authorization: `Bearer ${token}` } }

        // Fetch all data in parallel
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(API_URL_USER, config),
          axios.get(API_URL, config),
          axios.get(API_URL_ORDER, config)
        ])

        // Process data
        const allProducts: Product[] = productsRes.data
        const allOrders: Order[] = ordersRes.data
        const completedOrders = allOrders.filter((order) => order.status === 'completed')

        // Calculate stats
        const totalUsers = usersRes.data.length
        const totalProducts = allProducts.length
        const totalSold = allProducts.reduce((sum, product) => sum + product.sold_count, 0)
        const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0)

        // Get current year revenue by month
        const monthlyRevenue = Array(12).fill(0)
        completedOrders.forEach((order) => {
          const orderDate = new Date(order.created_at)
          if (orderDate.getFullYear() === selectedYear) {
            const month = orderDate.getMonth()
            monthlyRevenue[month] += order.totalAmount
          }
        })

        // Sort products by sold_count
        const sortedProducts = [...allProducts].sort((a, b) => b.sold_count - a.sold_count)

        setStats({ totalUsers, totalProducts, totalSold, totalRevenue })
        setProducts(sortedProducts)
        setOrders(completedOrders)
      } catch {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value))
  }

  // Prepare chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: Array(12)
          .fill(0)
          .map((_, month) => {
            return orders
              .filter((order) => {
                const orderDate = new Date(order.created_at)
                return (
                  orderDate.getFullYear() === selectedYear &&
                  orderDate.getMonth() === month &&
                  order.status === 'completed'
                )
              })
              .reduce((sum, order) => sum + order.totalAmount, 0)
          }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `Doanh thu năm ${selectedYear}` }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Doanh thu (VND)' },
        ticks: {
          callback: (value: number) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        }
      }
    }
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <AdminSidebar />
      <main className='flex-1 p-6 overflow-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Trang thống kê</h2>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500'></div>
          </div>
        ) : error ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded' role='alert'>
            <p className='font-bold'>Lỗi</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Thống kê tổng quan */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                <div className='flex items-center'>
                  <span className='text-3xl mr-4'>👤</span>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-700'>Người dùng</h3>
                    <p className='text-2xl font-bold text-gray-900'>{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                <div className='flex items-center'>
                  <span className='text-3xl mr-4'>📦</span>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-700'>Sản phẩm</h3>
                    <p className='text-2xl font-bold text-gray-900'>{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                <div className='flex items-center'>
                  <span className='text-3xl mr-4'>🛒</span>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-700'>Đã bán</h3>
                    <p className='text-2xl font-bold text-gray-900'>{stats.totalSold}</p>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                <div className='flex items-center'>
                  <span className='text-3xl mr-4'>💰</span>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-700'>Doanh thu</h3>
                    <p className='text-2xl font-bold text-gray-900'>
                      {stats.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top sản phẩm */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Top 5 Sản Phẩm Bán Chạy</h3>
                {products.length > 0 ? (
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-gray-700'>
                      <thead>
                        <tr className='bg-gray-50 border-b'>
                          <th className='text-left p-3 font-semibold'>Tên</th>
                          <th className='text-left p-3 font-semibold'>Danh mục</th>
                          <th className='text-right p-3 font-semibold'>Số lượng</th>
                          <th className='text-right p-3 font-semibold'>Doanh thu ước tính</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.slice(0, 5).map((product) => (
                          <tr key={product._id} className='border-b hover:bg-gray-50'>
                            <td className='p-3'>{product.name}</td>
                            <td className='p-3 capitalize'>{product.category}</td>
                            <td className='text-right p-3'>{product.sold_count}</td>
                            <td className='text-right p-3'>
                              {(product.sold_count * product.price).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className='text-gray-500'>Không có dữ liệu sản phẩm.</p>
                )}
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>Top 5 Sản Phẩm Bán Chậm</h3>
                {products.length > 0 ? (
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-gray-700'>
                      <thead>
                        <tr className='bg-gray-50 border-b'>
                          <th className='text-left p-3 font-semibold'>Tên</th>
                          <th className='text-left p-3 font-semibold'>Danh mục</th>
                          <th className='text-right p-3 font-semibold'>Số lượng</th>
                          <th className='text-right p-3 font-semibold'>Doanh thu ước tính</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...products]
                          .reverse()
                          .slice(0, 5)
                          .map((product) => (
                            <tr key={product._id} className='border-b hover:bg-gray-50'>
                              <td className='p-3'>{product.name}</td>
                              <td className='p-3 capitalize'>{product.category}</td>
                              <td className='text-right p-3'>{product.sold_count}</td>
                              <td className='text-right p-3'>
                                {(product.sold_count * product.price).toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className='text-gray-500'>Không có dữ liệu sản phẩm.</p>
                )}
              </div>
            </div>

            {/* Biểu đồ doanh thu */}
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-gray-800'>Doanh Thu Theo Tháng</h3>
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className='border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {Array.from({ length: 5 }, (_, i) => selectedYear - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
