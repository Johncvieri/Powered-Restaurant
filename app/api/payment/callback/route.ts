import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Need service key for updates
)

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify the notification (in production, verify signature)
    const { order_id, transaction_status, gross_amount } = body;

    // Update order status based on payment result
    let status = 'pending';
    
    switch (transaction_status) {
      case 'capture':
      case 'settlement':
        status = 'completed';
        break;
      case 'deny':
      case 'cancel':
      case 'expire':
        status = 'failed';
        break;
      case 'pending':
        status = 'pending';
        break;
    }

    // Update order in database
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        payment_data: body,
        updated_at: new Date().toISOString()
      })
      .eq('midtrans_order_id', order_id);

    if (error) throw error;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    );
  }
}
