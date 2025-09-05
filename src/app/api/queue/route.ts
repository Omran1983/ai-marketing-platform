import { NextRequest } from 'next/server'
import { apiResponse, apiError, getAuthenticatedUser } from '@/lib/api-utils'
import { getQueueStats } from '@/lib/queue'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    const stats = await getQueueStats()
    
    return apiResponse(stats)
  } catch (error: any) {
    return apiError(error.message, error.message === 'Unauthorized' ? 401 : 500)
  }
}