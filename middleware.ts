import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Get the origin from request headers
  const origin = request.headers.get('origin')
  
  // Only set CORS headers if we have a valid origin
  if (origin) {
    // For production (Vercel deployment), allow requests from your frontend domain
    if (process.env.NODE_ENV === 'production') {
      if (origin === 'https://api-pets-project.vercel.app') {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
    } else {
      // For development, allow localhost ports
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174'
      ]
      
      if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
      }
    }
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
