import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-10 shadow-inner">
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer> 
  )
}

export default Footer
