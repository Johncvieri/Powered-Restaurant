import { NextResponse } from 'next/server'
import midtransClient from 'midtrans-client'

// Initialize Midtrans client
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-your-key-here',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-your-key-here'
})

export async function POST(request: Request) {
  try {
    const { items, total, customer = {} } = await request.json()

    // Validate required fields
    if (!items || !total) {
      return NextResponse.json(
        { error: 'Items and total are required' },
        { status: 400 }
      )
    }

    // Create unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Prepare transaction parameters
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total
      },
      item_details: items.map((item: any) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
        category: 'Food',
        merchant_name: 'Choolights Restaurant'
      })),
      customer_details: {
        first_name: customer.name || 'Customer',
        email: customer.email || 'customer@example.com',
        phone: customer.phone || '+628123456789'
      },
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/order/success`,
        error: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/order/error`
      },
      expiry: {
        unit: 'hours',
        duration: 2
      }
    }

    // Create Midtrans transaction
    const transaction = await snap.createTransaction(parameter)

    // Simulate saving to database (in real app, save to Supabase)
    console.log('Order created:', {
      orderId,
      total,
      items,
      paymentUrl: transaction.redirect_url,
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      payment_url: transaction.redirect_url,
      token: transaction.token,
      order_id: orderId
    })

  } catch (error: any) {
    console.error('Checkout error:', error)
    
    // Fallback untuk development (tanpa Midtrans)
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        payment_url: 'https://simulator.sandbox.midtrans.com/snap/v1/transactions',
        token: 'dev-token-' + Date.now(),
        order_id: 'DEV-ORDER-' + Date.now(),
        message: 'Development mode: Redirect to Midtrans simulator'
      })
    }

    return NextResponse.json(
      { error: 'Payment service unavailable. Please try again.' },
      { status: 500 }
    )
  }
}
