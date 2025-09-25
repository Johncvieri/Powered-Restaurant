import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Simulate LangChain OCR processing
async function processImageWithAI(imageFile: File) {
  // In real implementation, this would call LangChain + OCR
  // For now, we'll simulate AI processing with smart parsing
  
  const text = await simulateOCR(imageFile);
  
  // AI extraction logic
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let name = 'Product';
  let description = 'Delicious food item';
  let price = 0;

  // Simple AI parsing logic
  lines.forEach(line => {
    const cleanLine = line.trim();
    
    // Detect price (Rp 45,000 or 45000)
    const priceMatch = cleanLine.match(/Rp\s*([\d.,]+)|(\d+)\s*(ribu|rb|k)/i) || 
                      cleanLine.match(/(\d{4,})/);
    if (priceMatch && !price) {
      price = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3]) * 1000 || 
              parseInt(priceMatch[1] || priceMatch[2]);
    }
    
    // Detect product name (usually first meaningful line)
    if (cleanLine.length > 3 && cleanLine.length < 50 && 
        !priceMatch && name === 'Product') {
      name = cleanLine;
    }
    
    // Detect description (longer text)
    if (cleanLine.length > 20 && description === 'Delicious food item') {
      description = cleanLine;
    }
  });

  return { name, description, price: price || 25000 };
}

async function simulateOCR(imageFile: File): Promise<string> {
  // Simulate different product types based on "AI analysis"
  const products = [
    `Sate Ayam\nGrilled chicken skewers with rich peanut sauce\nRp 45.000`,
    `Soto Ayam\nTraditional chicken soup with aromatic herbs\nRp 30,000`,
    `Es Campur\nRefreshing mixed ice with fruits and jelly\n35rb`,
    `Nasi Goreng\nSpecial fried rice with egg and vegetables\n25000`
  ];
  
  // Return random product simulation (like AI would analyze)
  return products[Math.floor(Math.random() * products.length)];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const extractedData = await processImageWithAI(image);

    return NextResponse.json({
      success: true,
      data: extractedData,
      message: 'AI analysis complete using LangChain simulation'
    });

  } catch (error) {
    console.error('AI extraction error:', error);
    return NextResponse.json(
      { error: 'AI processing failed' },
      { status: 500 }
    );
  }
}
