'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Star, Truck, Shield, Utensils, Heart } from 'lucide-react'
import Image from 'next/image'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  popular?: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  // Sample data - fixed copy errors
  const sampleMenu: MenuItem[] = [
    {
      id: "1",
      name: "Sate Ayam",
      description: "Grilled chicken skewers with rich peanut sauce",
      price: 45000,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop",
      popular: true
    },
    {
      id: "2", 
      name: "Soto Ayam",
      description: "Traditional chicken soup with aromatic herbs",
      price: 30000,
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=400&fit=crop",
      popular: false
    },
    {
      id: "3",
      name: "Es Campur",
      description: "Refreshing mixed ice with fruits and jelly",
      price: 25000,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop",
      popular: true
    }
  ]

  const features = [
    {
      icon: Utensils,
      title: "Fresh Ingredients",
      description: "Locally sourced ingredients for authentic flavor",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
      icon: Truck,
      title: "Easy Ordering", 
      description: "Seamless checkout via Midtrans/Xendit",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
    },
    {
      icon: Shield,
      title: "Instant Confirmation",
      description: "Your order processed immediately after payment",
      image: "https://images.unsplash.com/photo-1563013541-3f7e0f69f5c7?w=400&h=300&fit=crop"
    }
  ]

  useEffect(() => {
    setMenuItems(sampleMenu)
  }, [])

  const addToCart = (item: MenuItem) => {
    setCartCount(prev => prev + 1)
    // Simulate add to cart functionality
    console.log('Added to cart:', item.name)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Utensils className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-600">Choolights</h1>
                <p className="text-gray-600 text-sm">Authentic Indonesian Cuisine</p>
              </div>
            </div>
            
            <button className="relative bg-red-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-red-700 transition duration-200">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-800 text-white py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop")'
          }}
        ></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Experience Authentic<br />Indonesian Cuisine
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Traditional flavors meet modern convenience. Taste the real Indonesia with our carefully crafted dishes.
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            View Full Menu
          </button>
        </div>
      </section>

      {/* Why Choolights Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choolights?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover why food lovers choose us for authentic Indonesian dining experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {menuItems.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300 group">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Heart size={14} />
                      Popular
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-200 flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to enjoy delicious Indonesian food
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                </div>
                
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-red-600" size={24} />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Utensils className="text-white" size={16} />
                </div>
                <h3 className="text-xl font-bold">Choolights</h3>
              </div>
              <p className="text-gray-400">
                Serving authentic Indonesian cuisine with love and tradition since 2024.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <p className="text-gray-400">hello@choolights.com</p>
              <p className="text-gray-400">+62 812 3456 7890</p>
              <p className="text-gray-400">Jakarta, Indonesia</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Opening Hours</h4>
              <p className="text-gray-400">Monday - Sunday: 10:00 - 22:00</p>
              <p className="text-gray-400">Open Everyday</p>
              <p className="text-gray-400">Free Delivery Available</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Choolights Restaurant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
