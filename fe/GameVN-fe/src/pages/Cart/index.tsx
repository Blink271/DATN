import React from 'react'

const Cart: React.FC = () => {
  return (
    <div>
      <main className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-4'>Your Cart</h1>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          <p>Your cart is empty.</p>
        </div>
      </main>
    </div>
  )
}

export default Cart
