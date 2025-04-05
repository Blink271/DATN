import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DetailsPage from './pages/Details'
import CartPage from './pages/Cart'
import Mouse from './pages/Mouse'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className='min-h-screen p-4'>
          <Routes>
            {/* Route cho trang chủ */}
            <Route path='/' element={<Home />} />

            <Route path='/mouse' element={<Mouse />} />

            {/* Route cho trang chi tiết sản phẩm */}
            <Route path='/product/:id' element={<DetailsPage />} />

            {/* Route cho trang giỏ hàng */}
            <Route path='/cart' element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
