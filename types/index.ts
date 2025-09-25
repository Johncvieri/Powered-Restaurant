export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  created_at?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface AIExtractionResult {
  name: string
  description: string
  price: number
  confidence: number
  raw_text?: string
}

export interface CheckoutRequest {
  items: CartItem[]
  total: number
  customer?: {
    name?: string
    email?: string
    phone?: string
  }
}

export interface CheckoutResponse {
  success: boolean
  payment_url: string
  token: string
  order_id: string
  message?: string
}
