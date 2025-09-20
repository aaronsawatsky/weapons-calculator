import { ref } from 'vue'
import type { WeaponsListResponse, FetchState, WeaponFilteringConditions } from '@/types/types'
import { BASE_URL } from '@/const/url/url'

export function useWeapon() {
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
    page: number = 1,
    per_page: number = 12,
    filtering_conditions: WeaponFilteringConditions = { weapon_type: '', attack_type: '' },
  ) => {
    try {
      resetWeaponsListResponseState()
      weaponsListResponseState.value.is_loading = true
      const requestUrl = new URL(`${BASE_URL}/weapons`)
      requestUrl.searchParams.set('page', String(page))
      requestUrl.searchParams.set('per_page', String(per_page))
      requestUrl.searchParams.set('weapon_type', filtering_conditions.weapon_type)
      requestUrl.searchParams.set('attack_type', filtering_conditions.attack_type)

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

  return {
    // Fetch Weapons List
    weaponsListReponse,
    weaponsListResponseState,
    fetchWeaponsList,
  }
}
