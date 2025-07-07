import { type NextRequest, NextResponse } from "next/server"
import { updatePetsData, initialPetsData } from "@/lib/pets-data"

export async function GET(request: NextRequest) {
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
