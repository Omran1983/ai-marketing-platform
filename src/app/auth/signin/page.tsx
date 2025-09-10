'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials - please check your email and password')
      } else {
        // Redirect to the callback URL or dashboard
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError('Something went wrong. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { 
      email: 'admin@example.com', 
      password: 'TempPass123!', 
      role: 'Administrator',
      description: 'Full access to all features'
    },
    { 
      email: 'viewer@example.com', 
      password: 'TempPass123!', 
      role: 'Viewer',
      description: 'Read-only access'
    }
  ]

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <h1 className="text-display">Welcome back</h1>
          <p className="text-body mt-2">
            Sign in to your AI Marketing Hub account
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="surface-elevated">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-title text-sm">Demo Accounts</h3>
            <p className="text-caption mt-1">Try the platform with these test accounts</p>
          </div>
          <div className="p-4 space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => fillDemo(account.email, account.password)}
                className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{account.email}</div>
                    <div className="text-xs text-gray-500">{account.description}</div>
                  </div>
                  <span className="status-badge bg-blue-50 text-blue-700 text-xs">
                    {account.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sign In Form */}
        <form className="surface-elevated-high" onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-headline">Sign In</h2>
            <p className="text-body mt-1">Enter your credentials to access your account</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input pl-10"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="form-input pl-10 pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-caption">
            Secure authentication powered by NextAuth.js
          </p>
        </div>
      </div>
    </div>
  )
}