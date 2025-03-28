import React, { useState } from 'react'

const Slider: React.FC = () => {
  const slides = [
    'https://picsum.photos/800/300?random=1',
    'https://picsum.photos/800/300?random=2',
    'https://picsum.photos/800/300?random=3'
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
