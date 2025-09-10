# ⚡ Quick Deployment - AI Marketing Platform

This guide shows you exactly how to deploy the AI Marketing Platform using free services and placeholder values.

## 🚀 15-Minute Deployment Process

### Step 1: Set Up Free Database (Neon.tech)

1. Go to https://neon.tech
2. Click "Sign Up" and create a free account (no credit card required)
3. Create a new project:
   - Project name: `aimarketing`
   - Region: Choose closest to you
4. Copy your connection string:
   - It will look like: `postgresql://[user]:[password]@[host].neon.tech:5432/[database]?sslmode=require`

### Step 2: Set Up Free Redis (Upstash)

1. Go to https://upstash.com
2. Click "Sign Up" and create a free account (no credit card required)
3. Create a new Redis database:
   - Database name: `aimarketing`
   - Region: Choose closest to you
4. Copy your Redis URL:
   - It will look like: `redis://default:[password]@[host].upstash.io:6379`

### Step 3: Generate Secrets

In your project directory, run:
```bash
npm run generate:secrets
```

This will output something like:
```
NEXTAUTH_SECRET (32-character hex string):
a1b2c3d4e5f6789012345678901234567890abcd

Database Password (16-character alphanumeric):
X8K2pL9mN4qR7sT1
```

### Step 4: Configure Environment

1. Copy the template:
   ```bash
   cp .env .env.local
   ```

2. Edit `.env.local` with these values:
   ```bash
   # Database (from Neon.tech)
   DATABASE_URL="postgresql://[your-user]:[your-password]@[your-host].neon.tech:5432/[your-database]?sslmode=require"
   DIRECT_URL="postgresql://[your-user]:[your-password]@[your-host].neon.tech:5432/[your-database]?sslmode=require"
   
   # Auth Secret (from generate:secrets)
   NEXTAUTH_SECRET="a1b2c3d4e5f6789012345678901234567890abcd"
   
   # Auth URL (for local development)
   NEXTAUTH_URL="http://localhost:3000"
   
   # Redis (from Upstash)
   UPSTASH_REDIS_URL="redis://default:[your-password]@[your-host].upstash.io:6379"
   
   # For local development, leave AI keys blank to use mock services
   HUGGING_FACE_API_KEY=""
   OPENAI_API_KEY=""
   ANTHROPIC_API_KEY=""
   
   # Application
   APP_NAME="AI Marketing Platform"
   APP_URL="http://localhost:3000"
   PROVIDER="mock"
   ```

### Step 5: Run Setup

```bash
npm run setup
```

### Step 6: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and log in with:
- Admin: `admin@example.com` / `TempPass123!`
- Viewer: `viewer@example.com` / `TempPass123!`

### Step 7: Deploy to Vercel (Production)

1. Push your code to GitHub
2. Go to https://vercel.com and create a free account
3. Click "New Project" and import your repository
4. In Environment Variables, add all the same variables from your `.env.local`
5. Click "Deploy"

## 🎯 Alternative: Ultra-Fast Local Setup

If you want to just test it quickly without any external services:

1. Install PostgreSQL and Redis locally:
   ```bash
   # On Windows with Chocolatey
   choco install postgresql redis
   
   # On macOS with Homebrew
   brew install postgresql redis
   
   # On Ubuntu/Debian
   sudo apt install postgresql redis
   ```

2. Start local services:
   ```bash
   # Start PostgreSQL
   sudo service postgresql start
   
   # Start Redis
   redis-server
   ```

3. Create local database:
   ```bash
   # Connect to PostgreSQL
   sudo -u postgres psql
   
   # Create database and user
   CREATE DATABASE aimarketing;
   CREATE USER aimarketing WITH ENCRYPTED PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE aimarketing TO aimarketing;
   \q
   ```

4. Update `.env.local`:
   ```bash
   DATABASE_URL="postgresql://aimarketing:password@localhost:5432/aimarketing?sslmode=disable"
   DIRECT_URL="postgresql://aimarketing:password@localhost:5432/aimarketing?sslmode=disable"
   UPSTASH_REDIS_URL="redis://localhost:6379"
   NEXTAUTH_SECRET="a1b2c3d4e5f6789012345678901234567890abcd"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. Run setup and start:
   ```bash
   npm run setup
   npm run dev
   ```

## 📋 What You Get

With either approach, you'll have:
- ✅ Fully functional AI Marketing Platform
- ✅ Working database with sample data
- ✅ Operational queue system
- ✅ AI Creative Studio (using mock services)
- ✅ User authentication
- ✅ All dashboard features

## 🔧 Production Considerations

For production deployment:
1. Use a custom domain
2. Configure proper SSL certificates
3. Set up proper backup strategies
4. Add monitoring and alerting
5. Consider upgrading from free tiers for better performance

## 🆘 Troubleshooting

### Common Issues

1. **Database connection failed**:
   - Verify DATABASE_URL is correct
   - Ensure database service is running
   - Check firewall settings

2. **Redis connection failed**:
   - Verify UPSTASH_REDIS_URL is correct
   - Ensure Redis service is running

3. **Authentication issues**:
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain

### Need Help?

Run the health check:
```bash
npm run health
```

This will diagnose common configuration issues.

## 🎉 Success!

Once deployed, you'll have a fully functional AI Marketing Platform that can:
- Manage client portfolios
- Create AI-generated marketing content
- Run marketing campaigns
- Track analytics and performance
- Optimize budgets with AI
- Scrape competitive intelligence