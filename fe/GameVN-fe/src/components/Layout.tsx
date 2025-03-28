import React from 'react'
import { Link } from 'react-router-dom'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-blue-600 text-white p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>GameVN</h1>
          <nav>
            <Link to='/' className='mr-4 hover:underline'>
              Home
            </Link>
            <Link to='/about' className='hover:underline'>
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-grow container mx-auto p-4'>{children}</main>
      <footer className='bg-gray-800 text-white p-4 text-center'>
        <p>© 2023 GameVN. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
