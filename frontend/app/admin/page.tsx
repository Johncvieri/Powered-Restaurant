'use client'

import { useState } from 'react'
import { Upload, Image as ImageIcon, DollarSign, Save } from 'lucide-react'

export default function AdminPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: ''
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      // Simulate AI extraction
      setTimeout(() => {
        setProductData({
          name: 'Product Name Extracted',
          description: 'Product description extracted from image',
          price: '45000'
        })
      }, 1000)
    }
  }

  const saveProduct = async () => {
    alert('Product saved successfully!')
    setSelectedFile(null)
    setPreviewUrl('')
    setProductData({ name: '', description: '', price: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-display">Admin Panel</h1>
          <p className="text-gray-600 mb-8 font-body">Upload product images and AI will extract information automatically</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                
                <label htmlFor="file-upload" className="cursor-pointer block">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="text-gray-500 py-12">
                      <Upload size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="font-body">Click to upload product image</p>
                      <p className="text-sm opacity-70 mt-2 font-body">AI will extract product info automatically</p>
                    </div>
                  )}
                </label>
              </div>

              <button
                onClick={saveProduct}
                disabled={!productData.name}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2 font-body"
              >
                <Save size={20} />
                Save Product to Menu
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg font-body"
                  placeholder="Extracted name will appear here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg font-body"
                  placeholder="Extracted description will appear here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                  Price (Rp)
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg font-body"
                  placeholder="Extracted price will appear here"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
                      }
