import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.headers.append('Access-Control-Allow-Origin', 'http://localhost:3001')
  response.headers.append('Access-Control-Allow-Origin', 'http://localhost:5173')
  response.headers.append('Access-Control-Allow-Origin', 'http://localhost:5174')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
