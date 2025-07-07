"use client"

import { useEffect, useRef } from 'react'
import { swaggerSpec } from "@/lib/swagger"

export default function ApiDocsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Create and append the script
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js'
      script.async = true
      script.defer = true
      script.onload = () => {
        // Create and append the CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css'
        document.head.appendChild(link)

        // Initialize Swagger UI
        const SwaggerUIBundle = window.SwaggerUIBundle as typeof SwaggerUIBundle
        const ui = new SwaggerUIBundle({
          dom_id: '#swagger-ui',
          spec: swaggerSpec,
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          // Add these options to ensure the first endpoint is expanded
          defaultModelsExpandDepth: -1,
          defaultModelExpandDepth: -1,
          defaultModelRendering: 'example',
          displayRequestDuration: true,
          docExpansion: 'list'
        })
        window.ui = ui
        
        // Ensure the first endpoint is expanded after initialization
        if (ui) {
          ui.initOAuth({})
          
          // Use the correct method to expand operations
          const operations = document.querySelectorAll<HTMLElement>('.opblock');
          operations.forEach(operation => {
            operation.click();
          });
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pets Catalog API Documentation</h1>
          <p className="text-gray-600">RESTful API для управления каталогом домашних животных</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div id="swagger-ui" ref={containerRef} />
        </div>
      </div>
    </div>
  )
}
