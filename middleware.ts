import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get the origin from request headers
  const origin = request.headers.get('origin')
  
  // Set CORS headers based on request origin
  if (origin) {
    // For production, allow requests from specific domains
    const allowedOrigins = [
      'https://api-pets-project.vercel.app',
      'http://localhost:5173', // Add your frontend domain here
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5174'
    ]
    
    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }
  }
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
