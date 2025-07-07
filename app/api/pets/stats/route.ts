import { NextResponse } from "next/server"
import { getPetsData } from "@/lib/pets-data"

export async function GET() {
  try {
    const data = getPetsData()

    // Подсчитываем распределение по размерам
    const sizeDistribution = data.pets.reduce(
      (acc, pet) => {
        acc[pet.size] = (acc[pet.size] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      total_count: data.total_count,
      fluffy_count: data.fluffy_count,
      non_fluffy_count: data.non_fluffy_count,
      size_distribution: sizeDistribution,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
