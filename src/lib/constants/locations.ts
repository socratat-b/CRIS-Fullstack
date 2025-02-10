import citiesData from '@/lib/jsons/cities.json'
import provincesData from '@/lib/jsons/provinces.json'
import barangaysData from '@/lib/jsons/barangays.json'
import municipalitiesData from '@/lib/jsons/municipalities.json'

export const COUNTRY = 'Philippines'

interface Province {
  name: string
  region: string
}

interface City {
  name: string
  region: string
  province: string | null
  subMunicipalities: string[]
  municipalities: string[]
}

interface Municipality {
  name: string
  region: string
  province: string | null
  city: string | null
  subMunicipalities: string[]
  barangays: string[]
}

interface Barangay {
  name: string
  region: string
  province: string | null
  city: string | null
  municipality: string | null
}

export const PROVINCES: Province[] = provincesData as Province[]
export const CITIES: City[] = citiesData as City[]
export const MUNICIPALITIES: Municipality[] = municipalitiesData as Municipality[]
export const BARANGAYS: Barangay[] = barangaysData as Barangay[]
