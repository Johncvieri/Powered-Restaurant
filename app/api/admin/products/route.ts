import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Need service key for inserts
)

export async function POST(request: Request) {
  try {
    const { name, description, price, image_url } = await request.json();

    // Validate required fields
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data: product, error } = await supabase
      .from('menu_items')
      .insert({
        name,
        description: description || 'No description provided',
        price: parseInt(price),
        image_url: image_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Product saved successfully to database',
      product
    });

  } catch (error) {
    console.error('Save product error:', error);
    return NextResponse.json(
      { error: 'Failed to save product to database' },
      { status: 500 }
    );
  }
}
