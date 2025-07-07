import { type NextRequest, NextResponse } from "next/server"
import { getPetsData, addPet } from "@/lib/pets-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = searchParams.get("size")
    const fluffyParam = searchParams.get("fluffy")
    const search = searchParams.get("search")

    const data = getPetsData()
    let filteredPets = [...data.pets]

    // Фильтрация по размеру
    if (size && ["Small", "Medium", "Large"].includes(size)) {
      filteredPets = filteredPets.filter((pet) => pet.size === size)
    }

    // Фильтрация по пушистости
    if (fluffyParam !== null) {
      const isFluffy = fluffyParam === "true"
      filteredPets = filteredPets.filter((pet) => pet.isFluffy === isFluffy)
    }

    // Поиск по имени
    if (search) {
      filteredPets = filteredPets.filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Пересчитываем статистику для отфильтрованных результатов
    const fluffyCount = filteredPets.filter((pet) => pet.isFluffy).length
    const nonFluffyCount = filteredPets.length - fluffyCount

    return NextResponse.json({
      pets: filteredPets,
      total_count: filteredPets.length,
      fluffy_count: fluffyCount,
      non_fluffy_count: nonFluffyCount,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация обязательных полей
    const requiredFields = ["name", "funFact", "image", "size", "isFluffy"]
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Валидация размера
    if (!["Small", "Medium", "Large"].includes(body.size)) {
      return NextResponse.json({ error: "Size must be Small, Medium, or Large" }, { status: 400 })
    }

    // Валидация типа isFluffy
    if (typeof body.isFluffy !== "boolean") {
      return NextResponse.json({ error: "isFluffy must be a boolean" }, { status: 400 })
    }

    const newPet = addPet({
      name: body.name,
      funFact: body.funFact,
      image: body.image,
      size: body.size,
      isFluffy: body.isFluffy,
    })

    return NextResponse.json(newPet, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON or internal server error" }, { status: 400 })
  }
}
