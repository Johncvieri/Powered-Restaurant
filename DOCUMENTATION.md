# Restaurant AI App - Technical Documentation

## Architecture Overview
- **Frontend**: Next.js 14 with App Router
- **AI/ML**: LangChain for product extraction + n8n for workflow orchestration
- **Database**: Supabase (PostgreSQL)
- **Payment**: Midtrans Sandbox Integration
- **Deployment**: Vercel + n8n Cloud

## n8n Workflows
1. **Product Extraction Flow**: Image Upload → OCR → AI Analysis → Database Save
2. **Payment Processing**: Order → Midtrans → Callback → Status Update

## AI Integration
Using LangChain simulation for:
- OCR text extraction from product images
- Smart parsing of product name, description, price
- Future: OpenAI integration for better accuracy

## Payment Flow
1. Customer checks out → Create Midtrans transaction
2. Redirect to Midtrans payment page
3. Midtrans callback updates order status
4. Customer sees confirmation
