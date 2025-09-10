# Deployment Environment Variables
# Copy these to your Vercel Environment Variables

# Database (Required - Get from neon.tech)
DATABASE_URL=postgresql://username:password@host.neon.tech:5432/database?sslmode=require

# Authentication (Required)
NEXTAUTH_SECRET=your-32-character-random-secret-here
NEXTAUTH_URL=https://your-vercel-domain.vercel.app

# Optional: AI Services (if using)
# OPENAI_API_KEY=your-openai-key
# ANTHROPIC_API_KEY=your-anthropic-key