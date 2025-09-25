import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database service functions
export const databaseService = {
  async getMenuItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Database error:', error)
      // Fallback to sample data
      return this.getSampleMenu()
    }
    
    return data || []
  },

  async saveProduct(productData: any) {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([{
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop',
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      throw new Error(`Database save failed: ${error.message}`)
    }
    
    return data?.[0]
  },

  getSampleMenu() {
    return [
      {
        id: '1',
        name: 'Sate Ayam',
        description: 'Grilled chicken skewers with peanut sauce',
        price: 45000,
        image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=400&fit=crop',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Soto Ayam',
        description: 'Traditional chicken soup with herbs',
        price: 30000,
        image_url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=400&fit=crop',
        created_at: new Date().toISOString()
      }
    ]
  }
}
