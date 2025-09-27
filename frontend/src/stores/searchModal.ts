import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { WeaponsListResponse } from '@/types/weapon'

export const useSearchModalStore = defineStore('searchModal', () => {
  const isShow = ref<boolean>(false)
  const keyword = ref<string>('')
  const searchModalWeaponsListResponse = ref<WeaponsListResponse>({
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

  return { isShow, keyword, searchModalWeaponsListResponse }
})
