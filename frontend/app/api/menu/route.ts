import { NextResponse } from 'next/server'

const sampleMenu = [
  {
    id: '1',
    name: 'Sate Ayam',
    description: 'Grilled chicken skewers with peanut sauce',
    price: 45000,
    image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Soto Ayam',
    description: 'Traditional chicken soup with herbs',
    price: 30000,
    image_url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Es Campur',
    description: 'Mixed ice dessert with fruits and jelly',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=400&fit=crop'
  }
]

export async function GET() {
  try {
    return NextResponse.json(sampleMenu)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}
