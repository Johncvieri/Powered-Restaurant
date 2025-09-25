import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json(menuItems || [])
  } catch (error) {
    // Fallback to sample data if database fails
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
      }
    ]
    
    return NextResponse.json(sampleMenu)
  }
}
