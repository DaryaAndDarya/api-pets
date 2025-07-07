import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Database, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pets Catalog API</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            RESTful API для управления каталогом домашних животных с полной документацией и примерами использования
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>RESTful API</CardTitle>
              <CardDescription>Полный набор эндпоинтов для CRUD операций с животными</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• GET /api/pets - список животных</li>
                <li>• POST /api/pets - добавление</li>
                <li>• PUT /api/pets/[id] - обновление</li>
                <li>• DELETE /api/pets/[id] - удаление</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Фильтрация и поиск</CardTitle>
              <CardDescription>Мощные возможности фильтрации и поиска по различным параметрам</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Фильтр по размеру</li>
                <li>• Фильтр по пушистости</li>
                <li>• Поиск по имени</li>
                <li>• Статистика и аналитика</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Swagger документация</CardTitle>
              <CardDescription>Интерактивная документация с возможностью тестирования API</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Интерактивные примеры</li>
                <li>• Схемы данных</li>
                <li>• Тестирование в браузере</li>
                <li>• OpenAPI 3.0 спецификация</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Button asChild size="lg">
              <a href="/api-docs">Открыть документацию API</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/api/pets">Тестировать API</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Примеры использования API</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Получить всех животных</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <code>GET /api/pets</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Фильтр по размеру</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <code>GET /api/pets?size=Small</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Поиск по имени</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <code>GET /api/pets?search=Luna</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Статистика</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <code>GET /api/pets/stats</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
