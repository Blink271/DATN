import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AdminHeader from './componentsAdmin/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DetailsPage from './pages/Details'
import CartPage from './pages/Cart'
import Mouse from './pages/Mouse'
import AdminDashboard from './pageAdmin/Home'
import AdminUsers from './pageAdmin/User'
import AdminProducts from './pageAdmin/Product'
import AdminOrders from './pageAdmin/Order'
import AdminDiscounts from './pageAdmin/Discount'
import AdminBanners from './pageAdmin/Banner'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/*'
          element={
            <div>
              <Header />
              <main className='min-h-screen p-4'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/mouse' element={<Mouse />} />
                  <Route path='/product/:id' element={<DetailsPage />} />
                  <Route path='/cart' element={<CartPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
        {/* Admin Routes */}
        <Route
          path='/admin/*'
          element={
            <div>
              <AdminHeader />
              <main className='min-h-screen p-4'>
                <Routes>
                  <Route path='/' element={<AdminDashboard />} />
                  <Route path='/users' element={<AdminUsers />} />
                  <Route path='/products' element={<AdminProducts />} />
                  <Route path='/orders' element={<AdminOrders />} />
                  <Route path='/discounts' element={<AdminDiscounts />} />
                  <Route path='/banners' element={<AdminBanners />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
