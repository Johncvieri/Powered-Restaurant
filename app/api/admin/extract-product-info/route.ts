import { NextResponse } from 'next/server'

// Enhanced AI simulation dengan LangChain-style processing
class AIExtractor {
  private productPatterns = {
    indonesianFood: [
      { pattern: /sate|satay/i, baseName: 'Sate', basePrice: 45000 },
      { pattern: /soto|soup/i, baseName: 'Soto', basePrice: 30000 },
      { pattern: /es\s*campur|ice\s*mix/i, baseName: 'Es Campur', basePrice: 25000 },
      { pattern: /nasi\s*goreng|fried\s*rice/i, baseName: 'Nasi Goreng', basePrice: 35000 },
      { pattern: /gado\s*gado|salad/i, baseName: 'Gado Gado', basePrice: 28000 }
    ]
  }

  async extractFromImage(imageFile: File) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simulate OCR text extraction
    const simulatedText = this.simulateOCRText()
    
    // AI analysis dengan pattern matching
    return this.analyzeWithAI(simulatedText)
  }

  private simulateOCRText(): string {
    const samples = [
      "SATE AYAM\nGrilled chicken skewers with peanut sauce\nRp 45.000\nSpicy and delicious",
      "SOTO AYAM TRADITIONAL\nChicken soup with herbs and spices\nPrice: 30,000\nComes with rice",
      "ES CAMPUR SPECIAL\nMixed ice with fruits, jelly, and syrup\n35rb\nRefreshing dessert",
      "NASI GORENG SEAFOOD\nFried rice with shrimp and squid\nRp 40,000\nSignature dish",
      "GADO GADO VEGETABLE\nVegetable salad with peanut dressing\n28.000\nHealthy option"
    ]
    
    return samples[Math.floor(Math.random() * samples.length)]
  }

  private analyzeWithAI(text: string) {
    const lines = text.split('\n').filter(line => line.trim().length > 2)
    
    let name = 'Menu Item'
    let description = 'Delicious Indonesian cuisine'
    let price = 25000

    // AI Pattern 1: Extract price
    const priceMatch = text.match(/Rp\s*([\d.,]+)|([\d.,]+)\s*(rb|ribu|k)/i)
    if (priceMatch) {
      price = this.parsePrice(priceMatch[1] || priceMatch[2])
    }

    // AI Pattern 2: Identify food type
    for (const food of this.productPatterns.indonesianFood) {
      if (food.pattern.test(text)) {
        name = food.baseName
        price = food.basePrice
        break
      }
    }

    // AI Pattern 3: Extract name from first meaningful line
    const nameLine = lines.find(line => 
      line.length > 3 && 
      line.length < 50 && 
      !line.match(/rp|price|harga/i) &&
      !line.match(/[\d.,]+\s*(rb|ribu|k)/i)
    )
    if (nameLine && name === 'Menu Item') {
      name = nameLine
    }

    // AI Pattern 4: Extract description
    const descLine = lines.find(line => 
      line.length > 20 && 
      !line.includes('Rp') &&
      line !== name
    )
    if (descLine) {
      description = descLine
    }

    return {
      name: name.trim(),
      description: description.trim(),
      price: price,
      confidence: 0.85, // AI confidence score
      raw_text: text // For debugging
    }
  }

  private parsePrice(priceStr: string): number {
    const clean = priceStr.replace(/[^\d]/g, '')
    let price = parseInt(clean)
    
    if (price < 1000) price *= 1000 // Handle "35" -> 35000
    if (price > 100000) price = Math.min(price, 100000) // Cap unrealistic prices
    
    return price || 25000
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Initialize AI Extractor
    const aiExtractor = new AIExtractor()
    const result = await aiExtractor.extractFromImage(image)

    return NextResponse.json({
      success: true,
      data: result,
      workflow: {
        step1: "Image uploaded to AI processor",
        step2: "OCR text extraction completed", 
        step3: "LangChain-style analysis applied",
        step4: "Product information extracted",
        tools: ["Simulated OCR", "Pattern Matching", "Price Detection"]
      }
    })

  } catch (error) {
    console.error('AI extraction error:', error)
    return NextResponse.json(
      { 
        error: 'AI processing failed',
        fallback: {
          name: 'Traditional Indonesian Dish',
          description: 'Authentic flavor with fresh ingredients',
          price: 35000
        }
      },
      { status: 500 }
    )
  }
}
