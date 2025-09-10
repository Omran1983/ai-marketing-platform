# 🚀 AI Marketing Platform - Vercel Deployment Guide

This guide will help you deploy the AI Marketing Platform to Vercel with free-tier compatible settings.

## 📋 Prerequisites

Before deployment, you'll need:

1. **GitHub Account** - To connect your repository to Vercel
2. **Vercel Account** - Free account at [vercel.com](https://vercel.com)
3. **Neon.tech Account** - Free PostgreSQL database at [neon.tech](https://neon.tech)
4. **Upstash Account** - Free Redis instance at [upstash.com](https://upstash.com)

## 🛠️ Step-by-Step Vercel Deployment

### 1. Prepare Your Repository

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/ai-marketing-platform.git
   git push -u origin main
   ```

### 2. Set Up Database (Neon.tech)

1. Go to [https://neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard (Connection Details > Connection String)
4. Note both the connection URL and direct URL

### 3. Set Up Redis (Upstash)

1. Go to [https://upstash.com](https://upstash.com) and create a free account
2. Create a new Redis database
3. Copy the connection URL

### 4. Generate Authentication Secret

Generate a secure secret for NextAuth:
```bash
# Generate a 32-character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Root Directory: Leave as is
   - Build Command: `next build`
   - Output Directory: `.next`

### 6. Configure Environment Variables

In the Vercel project settings, add these environment variables:

| Variable | Required | Value |
|----------|----------|-------|
| DATABASE_URL | Yes | Your Neon.tech connection string |
| DIRECT_URL | Yes | Your Neon.tech direct URL |
| NEXTAUTH_SECRET | Yes | Your generated 32-character secret |
| NEXTAUTH_URL | Yes | `https://your-project.vercel.app` |
| UPSTASH_REDIS_URL | Yes | Your Upstash Redis URL |
| PROVIDER | No | `mock` (for demo) or AI service keys |

Optional AI Service Keys:
| Variable | Required | Description |
|----------|----------|-------------|
| HUGGING_FACE_API_KEY | No | For Hugging Face AI features |
| OPENAI_API_KEY | No | For OpenAI features |
| ANTHROPIC_API_KEY | No | For Anthropic features |

### 7. Configure Cron Jobs (Vercel Hobby Plan)

The Vercel Hobby plan only supports daily cron jobs. The platform is configured to work within these limitations:

```json
{
  "crons": [
    {
      "path": "/api/analytics/sync",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/scraper/run-daily",
      "schedule": "0 1 * * *"
    },
    {
      "path": "/api/budget/monitor",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### 8. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete (5-10 minutes)
3. Your application will be available at `https://your-project-name.vercel.app`

## 🔧 Post-Deployment Setup

### 1. Initialize Database

After deployment, you'll need to set up the database:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Link to your project:
   ```bash
   vercel link
   ```

3. Run database migrations:
   ```bash
   vercel env pull
   vercel exec -- npm run db:push
   ```

4. Seed the database with demo data:
   ```bash
   vercel exec -- npm run db:seed
   ```

### 2. Test Your Deployment

1. Visit your deployed URL
2. Sign in with demo credentials:
   - Admin: `admin@example.com` / `TempPass123!`
   - Viewer: `viewer@example.com` / `TempPass123!`

3. Test core features:
   - Navigate to the dashboard
   - Try creating a campaign
   - Test the AI Creative Studio
   - Check analytics

## 🚨 Vercel Hobby Plan Limitations

### Cron Job Restrictions
- Only daily cron jobs are supported (no hourly or minute-level scheduling)
- Maximum of 25 cron jobs per project
- Jobs can only run for 60 seconds

### Resource Limits
- Serverless functions timeout after 10 seconds
- 1GB memory limit per function
- 1000 function invocations per day

### Bandwidth Limits
- 100GB bandwidth per month
- 50GB serverless function execution time per month

## 🛠️ Optimizations for Vercel

### 1. Image Optimization
The platform uses Next.js Image component for automatic optimization:
- Images are automatically resized and compressed
- WebP format is used when supported
- Images are cached at the edge

### 2. Caching Strategies
- API responses are cached where appropriate
- Static assets are served from the edge network
- Database queries are optimized with proper indexing

### 3. Environment-Specific Configurations
- Development uses SQLite for easy local setup
- Production uses PostgreSQL for scalability
- Redis is used for queue management in production

## 🧪 Monitoring and Debugging

### 1. Vercel Analytics
- Built-in analytics dashboard
- Performance metrics
- Real-time logs

### 2. Error Tracking
- Automatic error reporting
- Source maps for debugging
- Performance insights

### 3. Custom Domain
To use a custom domain:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Error
- Verify DATABASE_URL and DIRECT_URL are correct
- Ensure Neon.tech database is active
- Check firewall settings in Neon.tech dashboard

#### Authentication Issues
- Verify NEXTAUTH_SECRET is set correctly
- Ensure NEXTAUTH_URL matches your Vercel domain
- Clear browser cookies and local storage

#### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are properly listed in package.json
- Verify Node.js version compatibility

#### Performance Issues
- Check Vercel analytics for slow API endpoints
- Optimize database queries
- Implement proper caching strategies

## 📈 Scaling Beyond Free Tier

When you're ready to scale:

### 1. Upgrade Database
- Move from Neon.tech free tier to paid plan
- Increase connection limits and storage

### 2. Upgrade Redis
- Move from Upstash free tier to paid plan
- Increase memory and bandwidth limits

### 3. Vercel Pro Plan
- Remove cron job limitations
- Increase function timeout limits
- Get more bandwidth and execution time

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon.tech Documentation](https://neon.tech/docs)
- [Upstash Documentation](https://docs.upstash.com)

For support, create an issue on your GitHub repository or check the community forums.