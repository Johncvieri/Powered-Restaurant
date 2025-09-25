// This component can be generated using v0.dev AI builder
// Example of AI-generated component for cart functionality

'use client'

import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        <span>Cart</span>
        <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">
          {items.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            {/* Cart items will be implemented here */}
          </div>
        </div>
      )}
    </div>
  )
}
