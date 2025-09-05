'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  CubeIcon,
  PhotoIcon,
  MegaphoneIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  BanknotesIcon,
  UserGroupIcon,
  GlobeAltIcon,
  TrophyIcon,
  FireIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  revenue: number
  campaigns: number
  impressions: number
  clickRate: number
  conversions: number
  totalSpend: number
  products: number
  creatives: number
  activeUsers: number
  globalReach: number
  aiInsights: number
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  description: string
  trend?: number[]
}

function PremiumMetricCard({ title, value, change, changeType, icon: Icon, gradient, description, trend }: MetricCardProps) {
  return (
    <div className="metric-card hover-glow group">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-4 rounded-2xl ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className={`flex items-center space-x-2 metric-change ${changeType} animate-pulse-premium`}>
          {changeType === 'positive' ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
          <span className="font-bold">{change}</span>
        </div>
      </div>
      <div>
        <div className="metric-value mb-2">{value}</div>
        <div className="metric-label mb-3">{title}</div>
        <p className="text-caption">{description}</p>
        {trend && (
          <div className="mt-4 flex items-center space-x-1">
            {trend.map((point, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-gradient-to-t from-blue-200 to-blue-500 rounded-full opacity-60"
                style={{ height: `${point}px` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setStats({
          revenue: 847650.25,
          campaigns: 12,
          impressions: 2847320,
          clickRate: 4.7,
          conversions: 8947,
          totalSpend: 156890.50,
          products: 89,
          creatives: 234,
          activeUsers: 15847,
          globalReach: 47,
          aiInsights: 1247
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="animate-fade-in space-y-8">
        <div className="surface-premium p-8 animate-shimmer">
          <div className="h-12 bg-gradient-to-r from-transparent via-white to-transparent rounded mb-4"></div>
          <div className="h-6 bg-gradient-to-r from-transparent via-white to-transparent rounded w-2/3"></div>
        </div>
        <div className="grid-premium">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="surface-elevated p-8 animate-shimmer">
              <div className="h-16 w-16 bg-gradient-to-r from-transparent via-white to-transparent rounded-2xl mb-6"></div>
              <div className="h-8 bg-gradient-to-r from-transparent via-white to-transparent rounded mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-transparent via-white to-transparent rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const premiumMetrics = [
    {
      title: 'Total Revenue',
      value: `$${stats?.revenue?.toLocaleString() || '0'}`,
      change: '+34.2%',
      changeType: 'positive' as const,
      icon: BanknotesIcon,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      description: 'Revenue generated this quarter from all campaigns',
      trend: [20, 35, 25, 40, 30, 45, 35, 50]
    },
    {
      title: 'AI Insights Generated',
      value: stats?.aiInsights?.toLocaleString() || '0',
      change: '+67.8%',
      changeType: 'positive' as const,
      icon: SparklesIcon,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
      description: 'Actionable insights powered by advanced AI algorithms',
      trend: [15, 25, 35, 20, 40, 30, 45, 55]
    },
    {
      title: 'Global Reach',
      value: `${stats?.globalReach || '0'} Countries`,
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: GlobeAltIcon,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      description: 'International markets reached by your campaigns',
      trend: [25, 30, 20, 35, 25, 40, 30, 45]
    },
    {
      title: 'Active Campaigns',
      value: stats?.campaigns?.toString() || '0',
      change: '+28.1%',
      changeType: 'positive' as const,
      icon: RocketLaunchIcon,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
      description: 'High-performance campaigns delivering results',
      trend: [30, 20, 35, 25, 40, 30, 35, 45]
    },
    {
      title: 'Total Impressions',
      value: `${(stats?.impressions! / 1000000).toFixed(1)}M`,
      change: '+45.6%',
      changeType: 'positive' as const,
      icon: EyeIcon,
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      description: 'Brand visibility across all marketing channels',
      trend: [20, 40, 30, 45, 35, 50, 40, 55]
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.clickRate || '0'}%`,
      change: '+8.9%',
      changeType: 'positive' as const,
      icon: TrophyIcon,
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      description: 'Optimized conversion rates through AI targeting',
      trend: [25, 30, 35, 25, 40, 35, 45, 40]
    }
  ]

  const quickActions = [
    {
      title: '🚀 AI Campaign Builder',
      description: 'Create high-converting campaigns with AI assistance',
      href: '/dashboard/campaigns',
      icon: RocketLaunchIcon,
      gradient: 'from-blue-500 to-purple-600',
      premium: true
    },
    {
      title: '🎨 Smart Creative Studio',
      description: 'Generate stunning visuals with AI-powered tools',
      href: '/dashboard/creative',
      icon: SparklesIcon,
      gradient: 'from-purple-500 to-pink-600',
      premium: true
    },
    {
      title: '📊 Predictive Analytics',
      description: 'Get AI insights for future campaign performance',
      href: '/dashboard/analytics',
      icon: ChartBarIcon,
      gradient: 'from-green-500 to-emerald-600',
      premium: true
    },
    {
      title: '🧠 AI Product Optimizer',
      description: 'Optimize product listings with machine learning',
      href: '/dashboard/products',
      icon: LightBulbIcon,
      gradient: 'from-orange-500 to-red-600',
      premium: true
    }
  ]

  const aiInsights = [
    {
      type: 'optimization',
      title: 'Campaign Performance Boost',
      message: 'Your "Summer Sale" campaign can increase ROI by 23% with audience targeting adjustments.',
      confidence: 94,
      action: 'Apply AI Recommendations'
    },
    {
      type: 'prediction',
      title: 'Trending Product Alert',
      message: 'Wireless earbuds are trending up 67% - perfect time to launch a promotional campaign.',
      confidence: 87,
      action: 'Create Campaign'
    },
    {
      type: 'alert',
      title: 'Budget Optimization',
      message: 'Reallocate $2,400 from Campaign A to Campaign B for 18% better performance.',
      confidence: 91,
      action: 'Optimize Budget'
    }
  ]

  return (
    <div className="animate-slide-up space-y-8">
      {/* Premium Hero Section */}
      <div className="surface-premium p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-flow"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-display">
                    Welcome back, {session?.user?.name?.split(' ')[0]} ✨
                  </h1>
                  <p className="text-body text-gray-600 mt-2">
                    Your AI-powered marketing empire is thriving • {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <FireIcon className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold">Performance: Excellent</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <TrophyIcon className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">ROI: +{((stats?.revenue! / stats?.totalSpend! - 1) * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <UserGroupIcon className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">{stats?.activeUsers?.toLocaleString()} Active Users</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-gradient-premium mb-2">
                ${((stats?.revenue! / stats?.totalSpend! - 1) * 100).toFixed(1)}% ROI
              </div>
              <p className="text-caption">This Quarter's Return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Metrics Grid */}
      <div className="grid-premium">
        {premiumMetrics.map((metric, index) => (
          <div key={metric.title} style={{ animationDelay: `${index * 150}ms` }} className="animate-scale-in">
            <PremiumMetricCard {...metric} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI-Powered Quick Actions */}
        <div className="lg:col-span-2">
          <div className="surface-elevated-high">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <RocketLaunchIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-headline">AI-Powered Actions</h2>
                  <p className="text-body">Supercharge your marketing with intelligent automation</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <a
                    key={action.title}
                    href={action.href}
                    className="group relative p-6 surface-elevated rounded-2xl hover-lift overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-title font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {action.title}
                      </h3>
                      <p className="text-body text-sm">{action.description}</p>
                      {action.premium && (
                        <div className="mt-3">
                          <span className="status-badge bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            ✨ AI POWERED
                          </span>
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div>
          <div className="surface-elevated-high">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse-premium">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-headline">AI Insights</h2>
                  <p className="text-body">Smart recommendations</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {aiInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="p-4 surface rounded-xl hover-lift group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                      {insight.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-medium">{insight.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {insight.message}
                  </p>
                  <button className="btn-premium text-xs py-2 px-4 w-full">
                    {insight.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Performance Dashboard */}
      <div className="surface-premium p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-headline text-gradient-premium">Performance Command Center</h2>
            <p className="text-body mt-2">Real-time analytics and predictive intelligence</p>
          </div>
          <button className="btn-premium">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Advanced Analytics
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BanknotesIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-premium">${stats?.revenue?.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Total Revenue</div>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-premium">{stats?.conversions?.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Conversions</div>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <GlobeAltIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-premium">{stats?.globalReach}</div>
            <div className="text-sm text-gray-600 mt-1">Countries Reached</div>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-gradient-premium">{stats?.aiInsights?.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">AI Insights</div>
          </div>
        </div>
      </div>
    </div>
  )
}