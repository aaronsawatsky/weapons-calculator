import type { PaginatedMetaData } from '@/types/types'

export type ScalingType = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | null

export interface WeaponsListResponse {
  data: Weapon[]
  meta: PaginatedMetaData
}

export interface Weapon {
  name: string
  image: string
  weapon_type: string
  attack_type: string
  requirements: Requirements
  damage: DamageTypes
  damage_reduction: DamageTypes
  bonus: BonusParameters
  weight: number
  durability: number
  enchantable: boolean
  special: boolean
  upgrade_paths: string[]
}

export interface Requirements {
  faith: number
  strength: number
  dexterity: number
  intelligence: number
}

export interface DamageTypes {
  fire: number
  magic: number
  physical: number
  lightning: number
}

export interface BonusParameters {
  faith: ScalingType
  strength: ScalingType
  dexterity: ScalingType
  intelligence: ScalingType
}

export interface WeaponFilteringConditions {
  weapon_type: string
  attack_type: string
}
