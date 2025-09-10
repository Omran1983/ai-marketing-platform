# 🚀 AI Marketing Platform - Deployment Guide

This guide will help you deploy the AI Marketing Platform to production.

## 📋 Prerequisites

Before deployment, you'll need:

1. **Node.js 18.x or later**
2. **PostgreSQL Database** (Neon.tech recommended for free tier)
3. **Redis Instance** (Upstash recommended for free tier)
4. **Domain Name** (for production deployment)

## 🛠️ Step-by-Step Deployment

### 1. Database Setup

#### Option A: Using Neon.tech (Recommended)
1. Go to [https://neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard
4. Update your `.env` file:
   ```
   DATABASE_URL="your-neon-connection-string"
   DIRECT_URL="your-neon-connection-string"
   ```

#### Option B: Using Local PostgreSQL
1. Install PostgreSQL on your server
2. Create a database:
   ```sql
   CREATE DATABASE aimarketing;
   CREATE USER aimarketing_user WITH ENCRYPTED PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE aimarketing TO aimarketing_user;
   ```
3. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://aimarketing_user:your-password@localhost:5432/aimarketing?sslmode=disable"
   DIRECT_URL="postgresql://aimarketing_user:your-password@localhost:5432/aimarketing?sslmode=disable"
   ```

### 2. Redis Setup

#### Option A: Using Upstash (Recommended)
1. Go to [https://upstash.com](https://upstash.com) and create a free account
2. Create a new Redis database
3. Copy the connection URL
4. Update your `.env` file:
   ```
   UPSTASH_REDIS_URL="your-upstash-redis-url"
   ```

#### Option B: Using Local Redis
1. Install Redis on your server
2. Start Redis service
3. Update your `.env` file:
   ```
   UPSTASH_REDIS_URL="redis://localhost:6379"
   ```

### 3. Authentication Setup

Generate a secure secret for NextAuth:
```bash
# Generate a 32-character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update your `.env` file:
```
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### 4. AI Services Setup (Optional)

#### Hugging Face API
1. Go to [https://huggingface.co](https://huggingface.co) and create an account
2. Go to Settings > Access Tokens
3. Create a new token
4. Update your `.env` file:
   ```
   HUGGING_FACE_API_KEY="your-huggingface-api-key"
   ```

#### OpenAI API
1. Go to [https://platform.openai.com](https://platform.openai.com) and create an account
2. Go to API Keys and create a new key
3. Update your `.env` file:
   ```
   OPENAI_API_KEY="your-openai-api-key"
   ```

### 5. Application Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma client:
   ```bash
   npm run generate
   ```

3. Push database schema:
   ```bash
   npm run db:push
   ```

4. Seed database with demo data:
   ```bash
   npm run db:seed
   ```

### 6. Build and Deploy

#### For Vercel (Recommended)
See the dedicated [Vercel Deployment Guide](VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to Vercel with free-tier compatibility.

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - DATABASE_URL
   - DIRECT_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - UPSTASH_REDIS_URL
   - Any AI API keys you want to use
4. Deploy automatically on push to main branch

#### For Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables:
   ```bash
   export NODE_ENV=production
   export DATABASE_URL="your-production-db-url"
   export NEXTAUTH_SECRET="your-secret"
   export NEXTAUTH_URL="https://your-domain.com"
   export UPSTASH_REDIS_URL="your-redis-url"
   # ... other env vars
   ```

3. Start the server:
   ```bash
   npm start
   ```

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string |
| DIRECT_URL | Yes | Direct database connection string |
| NEXTAUTH_SECRET | Yes | 32+ character random string |
| NEXTAUTH_URL | Yes | Your production domain |
| UPSTASH_REDIS_URL | Yes | Redis connection URL |
| HUGGING_FACE_API_KEY | No | For Hugging Face AI features |
| OPENAI_API_KEY | No | For OpenAI features |
| ANTHROPIC_API_KEY | No | For Anthropic features |
| PROVIDER | No | AI provider (mock, openai, huggingface) |

## 🧪 Testing Your Deployment

1. Check health endpoint:
   ```bash
   curl https://your-domain.com/api/health
   ```

2. Test authentication:
   - Visit your domain
   - Try signing in with demo credentials:
     - Admin: `admin@example.com` / `TempPass123!`
     - Viewer: `viewer@example.com` / `TempPass123!`

3. Test AI features:
   - Go to Creative Studio
   - Try generating content
   - Check if progress tracking works

## 🚨 Common Issues and Solutions

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure database is accessible
- Check firewall settings

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

### Queue System Not Working
- Verify UPSTASH_REDIS_URL is correct
- Check Redis connection
- For demo, set PROVIDER=mock

### Build Errors
- Run `npm run generate` to update Prisma client
- Clear `.next` folder and rebuild
- Check all environment variables are set

## 📈 Post-Deployment Steps

1. **Change Default Passwords**
   - Log in as admin user
   - Change the default passwords for security

2. **Configure Your Organization**
   - Update tenant information
   - Set your preferred currency, timezone, and language

3. **Add Your Own Content**
   - Create your products
   - Add your clients
   - Build your campaigns

4. **Monitor Performance**
   - Check the analytics dashboard
   - Set up alerts for important metrics

## 🆘 Support

If you encounter issues:
1. Check the logs for error messages
2. Verify all environment variables are set correctly
3. Ensure database and Redis connections are working
4. Check the troubleshooting section in README.md

For additional help, create an issue on the GitHub repository.