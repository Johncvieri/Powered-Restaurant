import { NextResponse } from 'next/server'
import midtransClient from 'midtrans-client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Create Core API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
});

export async function POST(request: Request) {
  try {
    const { items, total, customer_email, customer_name } = await request.json();

    // Create order in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email,
        customer_name,
        total_amount: total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Prepare Midtrans transaction
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${order.id}-${Date.now()}`,
        gross_amount: total
      },
      item_details: items.map((item: any) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name
      })),
      customer_details: {
        first_name: customer_name,
        email: customer_email
      },
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL}/order/success`,
        error: `${process.env.NEXTAUTH_URL}/order/error`,
        pending: `${process.env.NEXTAUTH_URL}/order/pending`
      }
    };

    // Create Midtrans transaction
    const transaction = await snap.createTransaction(parameter);
    
    // Update order with payment token
    await supabase
      .from('orders')
      .update({ 
        payment_token: transaction.token,
        midtrans_order_id: parameter.transaction_details.order_id
      })
      .eq('id', order.id);

    return NextResponse.json({
      success: true,
      payment_url: transaction.redirect_url,
      token: transaction.token,
      order_id: order.id
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed. Please try again.' },
      { status: 500 }
    );
  }
}
