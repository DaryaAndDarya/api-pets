import { type NextRequest, NextResponse } from "next/server"
import { findPetById, updatePet, deletePet } from "@/lib/pets-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pet = findPetById(id)

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    return NextResponse.json(pet)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Проверяем, существует ли животное
    const existingPet = findPetById(id)
    if (!existingPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    // Валидация размера, если он предоставлен
    if (body.size && !["Small", "Medium", "Large"].includes(body.size)) {
      return NextResponse.json({ error: "Size must be Small, Medium, or Large" }, { status: 400 })
    }

    // Валидация типа isFluffy, если он предоставлен
    if (body.isFluffy !== undefined && typeof body.isFluffy !== "boolean") {
      return NextResponse.json({ error: "isFluffy must be a boolean" }, { status: 400 })
    }

    const updatedPet = updatePet(id, body)

    return NextResponse.json(updatedPet)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON or internal server error" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = deletePet(id)

    if (!success) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
