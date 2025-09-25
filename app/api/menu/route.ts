import { NextResponse } from 'next/server'
import { databaseService } from '../../../lib/supabase'

export async function GET() {
  try {
    const menuItems = await databaseService.getMenuItems()
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Menu API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    )
  }
}
