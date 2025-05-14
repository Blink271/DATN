import React, { useState } from 'react'

const Slider: React.FC = () => {
  const slides = [
    'https://file.hstatic.net/200000722513/file/thang_04_layout_web_-07.png',
    'https://file.hstatic.net/200000722513/file/layout_web_-09_d2c2f20ee0af491b8bf40d032ff74dbf.png',
    'https://file.hstatic.net/200000722513/file/thang_04_layout_web_-02.png'
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className='relative'>
      <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} className='rounded-lg shadow-md w-full' />
      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        ›
      </button>
    </div>
  )
}

export default Slider
