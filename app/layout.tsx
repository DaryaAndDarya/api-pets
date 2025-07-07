import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'API PETS'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.SwaggerUIBundle = function(options) {
                return SwaggerUIBundle(options)
              }
              window.SwaggerUIBundle.presets = SwaggerUIBundle.presets
              window.SwaggerUIBundle.plugins = SwaggerUIBundle.plugins
            `
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
