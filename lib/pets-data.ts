export interface Pet {
  id: string
  name: string
  funFact: string

  size: "Small" | "Medium" | "Large"
  isFluffy: boolean
}

export interface PetsData {
  pets: Pet[]
  total_count: number
  fluffy_count: number
  non_fluffy_count: number
}

// Добавляем ID к каждому животному для удобства работы с API
export const initialPetsData: PetsData = {
  pets: [
    {
      id: "1",
      name: "Luna",
      funFact: "Incredible sense of smell - 100,000x better than humans",
      size: "Medium",
      isFluffy: true,
    },
    {
      id: "2",
      name: "Whiskers",
      funFact: "Purring helps heal bones and reduce pain",
      size: "Small",
      isFluffy: true,
    },
    {
      id: "3",
      name: "Cocoa",
      funFact: "Can jump 3 feet high and do 'binkies' when happy",
      size: "Small",
      isFluffy: true,
    },
    {
      id: "4",
      name: "Peanut",
      funFact: "Uses 10+ different sounds to communicate",
      size: "Small",
      isFluffy: true,
    },
    {
      id: "5",
      name: "Chewy",
      funFact: "Cheek pouches stretch 3x their head size",
      size: "Small",
      isFluffy: true,
    },
    {
      id: "6",
      name: "Sunny",
      funFact: "Has 3,000 feathers with fluorescent pigments",  
      size: "Small",
      isFluffy: false,
    },
    {
      id: "7",
      name: "Bubbles",
      funFact: "Memories last months and can live 40+ years",   
      size: "Small",
      isFluffy: false,
    },
    {
      id: "8",
      name: "Spike",
      funFact: "Changes beard color to show emotions",
      size: "Medium",
      isFluffy: false,
    },
    {
      id: "9",
      name: "Ziggy",
      funFact: "Sleeps 14-18 hours and does 'war dances'",
      size: "Small",
      isFluffy: true,
    },
    {
      id: "10",
      name: "Shelly",
      funFact: "Existed for 230 million years alongside dinosaurs",
      size: "Medium",
      isFluffy: false,
    },
  ],
  total_count: 10,
  fluffy_count: 6,
  non_fluffy_count: 4,
}

// В реальном приложении это было бы в базе данных
let petsData = { ...initialPetsData }

export const getPetsData = () => petsData

export const updatePetsData = (newData: PetsData) => {
  petsData = newData
}

export const addPet = (pet: Omit<Pet, "id">): Pet => {
  const newId = (Math.max(...petsData.pets.map((p) => Number.parseInt(p.id))) + 1).toString()
  const newPet: Pet = { ...pet, id: newId }

  petsData.pets.push(newPet)
  petsData.total_count++

  if (pet.isFluffy) {
    petsData.fluffy_count++
  } else {
    petsData.non_fluffy_count++
  }

  return newPet
}

export const updatePet = (id: string, updates: Partial<Omit<Pet, "id">>): Pet | null => {
  const petIndex = petsData.pets.findIndex((p) => p.id === id)
  if (petIndex === -1) return null

  const oldPet = petsData.pets[petIndex]
  const updatedPet = { ...oldPet, ...updates }

  // Обновляем счетчики если изменилось свойство isFluffy
  if (updates.isFluffy !== undefined && updates.isFluffy !== oldPet.isFluffy) {
    if (updates.isFluffy) {
      petsData.fluffy_count++
      petsData.non_fluffy_count--
    } else {
      petsData.fluffy_count--
      petsData.non_fluffy_count++
    }
  }

  petsData.pets[petIndex] = updatedPet
  return updatedPet
}

export const deletePet = (id: string): boolean => {
  const petIndex = petsData.pets.findIndex((p) => p.id === id)
  if (petIndex === -1) return false

  const pet = petsData.pets[petIndex]
  petsData.pets.splice(petIndex, 1)
  petsData.total_count--

  if (pet.isFluffy) {
    petsData.fluffy_count--
  } else {
    petsData.non_fluffy_count--
  }

  return true
}

export const findPetById = (id: string): Pet | null => {
  return petsData.pets.find((p) => p.id === id) || null
}
