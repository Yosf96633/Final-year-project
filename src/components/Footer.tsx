import React from 'react'
const Footer = () => {
  return (
     <footer className="w-full border-t py-6 text-center text-sm">
      <div className="container mx-auto px-4">
        <p className="mb-2 font-semibold text-lg">
            <span>Cambot</span>
        </p>
        <p className="mb-4">Your AI-powered campus query assistant.</p>
        <p>© {new Date().getFullYear()} Cambot. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer