import { ref } from 'vue'
import type {
  WeaponsListResponse,
  FetchState,
  WeaponsFetchRequest,
  WeaponCategory,
} from '@/types/types'
import { BASE_URL } from '@/const/url/url'

export function useWeapon() {
  // ===========================
  // Fetch weapons List
  // ===========================
  const weaponsFetchRequestPayload = ref<WeaponsFetchRequest>({
    page: 1,
    per_page: 12,
    weapon_type: [],
    attack_type: [],
  })

  const weaponsListReponse = ref<WeaponsListResponse>({
    data: [],
    meta: {
      current_page: 1,
      has_next_page: false,
      has_prev_page: false,
      per_page: 0,
      total: 0,
      total_pages: 0,
    },
  })

  const weaponsListResponseState = ref<FetchState>({
    is_loading: false,
    has_error: false,
    error_message: '',
  })

  const resetWeaponsListResponseState = () => {
    weaponsListResponseState.value = {
      is_loading: false,
      has_error: false,
      error_message: '',
    }
  }

  const fetchWeaponsList = async (
    payload: Partial<WeaponsFetchRequest> = {
      ...weaponsFetchRequestPayload.value,
    },
  ) => {
    try {
      resetWeaponsListResponseState()
      weaponsListResponseState.value.is_loading = true
      const requestUrl = new URL(`${BASE_URL}/weapons`)

      const appendParam = (key: string, value?: string | string[]) => {
        if (!value) return
        const values = Array.isArray(value) ? value : [value]
        const paramName = values.length > 1 ? `${key}[]` : key
        values.forEach((item) => requestUrl.searchParams.append(paramName, item))
      }

      requestUrl.searchParams.set('page', String(payload.page))
      requestUrl.searchParams.set('per_page', String(payload.per_page))
      appendParam('weapon_type', payload.weapon_type)
      appendParam('attack_type', payload.attack_type)

      const response = await fetch(requestUrl)

      if (!response.ok) {
        throw new Error(`Unable to fetch weapons. (${response.status} ${response.statusText})`)
      }
      weaponsListReponse.value = await response.json()
    } catch (error) {
      weaponsListResponseState.value.has_error = true
      weaponsListResponseState.value.error_message =
        error instanceof Error ? error.message : 'Unknown error occurred while fetching weapons.'
      throw error
    } finally {
      weaponsListResponseState.value.is_loading = false
    }
  }

  // ===========================
  // Fetch categories list
  // ===========================
  const weaponCategoriesListResponse = ref<WeaponCategory[]>([
    { key: 'weapon_types', label: 'Weapon Types', categories: [] },
    { key: 'attack_types', label: 'Attack Types', categories: [] },
  ])

  const weaponCategriesListResponseState = ref<FetchState>({
    is_loading: false,
    has_error: false,
    error_message: '',
  })

  const resetWeaponsCategoriesListResponseState = () => {
    weaponCategriesListResponseState.value = {
      is_loading: false,
      has_error: false,
      error_message: '',
    }
  }

  const fetchWeaponsCategoriesList = async () => {
    try {
      resetWeaponsCategoriesListResponseState()
      weaponCategriesListResponseState.value.is_loading = true
      const requestUrl = new URL(`${BASE_URL}/categories`)

      const response = await fetch(requestUrl)

      if (!response.ok) {
        throw new Error(
          `Unable to fetch weapon categories. (${response.status} ${response.statusText})`,
        )
      }
      const data = await response.json()
      weaponCategoriesListResponse.value = [
        {
          key: 'weapon_types',
          label: 'Weapon Types',
          categories: data.weapon_types.map((name: string) => ({
            type: name,
            is_selected: false,
          })),
        },
        {
          key: 'attack_types',
          label: 'Attack Types',
          categories: data.attack_types.map((name: string) => ({
            type: name,
            is_selected: false,
          })),
        },
      ]
    } catch (error) {
      weaponCategriesListResponseState.value.has_error = true
      weaponCategriesListResponseState.value.error_message =
        error instanceof Error
          ? error.message
          : 'Unknown error occurred while fetching weapon categories.'
      throw error
    } finally {
      weaponCategriesListResponseState.value.is_loading = false
    }
  }

  return {
    // Fetch Weapons List
    weaponsListReponse,
    weaponsListResponseState,
    weaponsFetchRequestPayload,
    fetchWeaponsList,

    // Fetch weapons categories list
    weaponCategoriesListResponse,
    weaponCategriesListResponseState,
    resetWeaponsCategoriesListResponseState,
    fetchWeaponsCategoriesList,
  }
}
