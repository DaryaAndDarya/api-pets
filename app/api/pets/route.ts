import { type NextRequest, NextResponse } from "next/server"
import { 
  getPetsData, 
  addPet, 
  updatePetsData, 
  initialPetsData,
  deletePet,
  updatePet 
} from "@/lib/pets-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = searchParams.get("size")
    const fluffyParam = searchParams.get("fluffy")
    const search = searchParams.get("search")
    const reset = searchParams.get("reset")

    if (reset === "true") {
      updatePetsData(initialPetsData)
      return NextResponse.json({ message: "Pets data reset to initial state" })
    }

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
      filteredPets = filteredPets.filter((pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    const result = {
      pets: filteredPets,
      total_count: filteredPets.length,
      fluffy_count: filteredPets.filter((pet) => pet.isFluffy).length,
      non_fluffy_count: filteredPets.filter((pet) => !pet.isFluffy).length,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching pets:", error)
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reset = searchParams.get("reset")

    if (reset === "true") {
      updatePetsData(initialPetsData)
      return NextResponse.json({ message: "Pets data reset to initial state" })
    }

    const body = await request.json()

    // Валидация обязательных полей
    const requiredFields = ["name", "funFact", "size", "isFluffy"]
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
      size: body.size,
      isFluffy: body.isFluffy,
    })

    return NextResponse.json(newPet, { status: 201 })
  } catch (error) {
    console.error("Error adding pet:", error)
    return NextResponse.json(
      { error: "Failed to add pet" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const success = deletePet(id)
    if (!success) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Pet deleted successfully" })
  } catch (error) {
    console.error("Error deleting pet:", error)
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const updatedPet = updatePet(id, {
      name: body.name,
      funFact: body.funFact,
      size: body.size,
      isFluffy: body.isFluffy,
    })

    if (!updatedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPet)
  } catch (error) {
    console.error("Error updating pet:", error)
    return NextResponse.json(
      { error: "Failed to update pet" },
      { status: 500 }
    )
  }
}

export async function RESET(request: NextRequest) {
  try {
    updatePetsData(initialPetsData)
    return NextResponse.json({ message: "Pets data reset to initial state" })
  } catch (error) {
    console.error("Error resetting pets data:", error)
    return NextResponse.json(
      { error: "Failed to reset pets data" },
      { status: 500 }
    )
  }
}
