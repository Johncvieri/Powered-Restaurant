#!/bin/bash

echo "🚀 Deploying Restaurant AI App..."

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

# Setup n8n (if using n8n cloud)
echo "⚙️ Setting up n8n workflows..."
# n8n deployment commands here

echo "✅ Deployment complete!"
echo "📱 Frontend: https://your-app.vercel.app"
echo "🔧 Admin: https://your-app.vercel.app/admin"
echo "🔄 n8n: https://your-n8n.herokuapp.com"
