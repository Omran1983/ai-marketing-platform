# AI Marketing Platform

A comprehensive AI-first marketing platform built with Next.js, Supabase, and Prisma. Features campaign management, AI-powered creative generation, analytics, and queue-based job processing.

## 🚀 Live Demo

**Demo Credentials:**
- Admin: `admin@example.com` / `TempPass123!`
- Viewer: `viewer@example.com` / `TempPass123!`

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** PostgreSQL (Supabase), Prisma ORM
- **Queue:** BullMQ with Upstash Redis
- **Deployment:** Vercel
- **Testing:** Jest, React Testing Library

## 📋 Requirements

- Node.js 18.x or later
- npm 9.x or later
- PostgreSQL database (Supabase recommended)
- Redis instance (Upstash recommended)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd ai-marketing-platform
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Redis for BullMQ
UPSTASH_REDIS_URL="redis://your-redis-url"

# AI Provider
PROVIDER="mock" # mock|meta|tiktok

# Optional external API keys
META_ACCESS_TOKEN=""
TIKTOK_ACCESS_TOKEN=""

# App Configuration
APP_NAME="AI Marketing Platform"
APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run generate

# Push database schema
npm run db:push

# Seed with demo data
npm run db:seed
```

### 4. Build and Start

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

### 5. Run Tests

```bash
npm test
```

## 📚 API Documentation

OpenAPI specification available at: `/api/openapi.json`

### Example API Calls

#### 1. Health Check
```bash
curl -X GET http://localhost:3000/api/health
```

#### 2. Create Product (requires authentication)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{
    "name": "Premium Headphones",
    "description": "High-quality wireless headphones",
    "price": 299.99,
    "category": "Electronics"
  }'
```

#### 3. Generate Creative
```bash
curl -X POST http://localhost:3000/api/creatives \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{
    "type": "IMAGE",
    "prompt": "Create an engaging ad for premium headphones"
  }'
```

#### 4. Create Campaign
```bash
curl -X POST http://localhost:3000/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-session-token" \
  -d '{
    "name": "Q1 Electronics Campaign",
    "budget": 5000,
    "audience": {"ageRange": "25-45", "interests": ["technology"]}
  }'
```

#### 5. Get Analytics
```bash
curl -X GET "http://localhost:3000/api/analytics?campaignId=your-campaign-id" \
  -H "Cookie: next-auth.session-token=your-session-token"
```

## 🎯 Features

### ✅ Core Features
- **Product Catalog CRUD** - Complete product management system
- **AI Creative Generation** - Mock AI provider for images, copy, and video
- **Campaign Management** - Create, schedule, and manage marketing campaigns
- **Queue System** - BullMQ-based job scheduling and processing
- **Analytics Dashboard** - Campaign performance metrics and insights
- **Audit Logging** - Complete user action tracking
- **Admin Panel** - User management, roles, and API keys
- **Multi-tenant** - Isolated data per organization

### 🔐 Authentication & Authorization
- NextAuth.js with credentials provider
- Role-based access control (Admin, Editor, Viewer)
- Session management
- Protected API routes

### 🤖 AI Integration
- Pluggable AI provider system
- Mock provider for demo (no API keys required)
- Support for Meta and TikTok providers
- Deterministic mock responses for testing

### 📊 Analytics & Reporting
- Campaign performance metrics
- Real-time data visualization
- Export capabilities
- Custom date ranges

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # NextAuth configuration
│   ├── ai-providers.ts   # AI provider implementations
│   └── queue.ts          # BullMQ setup
├── types/                 # TypeScript type definitions
prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
__tests__/               # Test files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:push` - Push schema to database
- `npm run generate` - Generate Prisma client
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL in .env
   - Ensure database is accessible
   - Run `npm run db:push` to sync schema

2. **Authentication Issues**
   - Check NEXTAUTH_SECRET is set
   - Verify NEXTAUTH_URL matches your domain
   - Clear browser cookies and try again

3. **Queue Not Working**
   - Verify UPSTASH_REDIS_URL is correct
   - Check Redis connection
   - For demo, set PROVIDER=mock to use in-memory queue

4. **Build Errors**
   - Run `npm run generate` to update Prisma client
   - Clear `.next` folder and rebuild
   - Check all environment variables are set

## 📦 Dependencies

### Core
- Next.js 15.5.2
- React 19.1.0
- TypeScript 5.x
- Prisma 5.x
- NextAuth.js 4.x

### UI/Styling
- Tailwind CSS 4.x
- Headless UI 2.x
- Heroicons 2.x

### Database & Queue
- @prisma/client
- BullMQ
- IORedis

### Testing
- Jest
- React Testing Library
- Node Mocks HTTP

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Set production environment variables
export NODE_ENV=production
export DATABASE_URL="your-production-db-url"
# ... other env vars

# Start the server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Search existing GitHub issues
3. Create a new issue with detailed description

---

**Built with ❤️ using Next.js, Supabase, and Prisma**
# ai-marketing-platform
