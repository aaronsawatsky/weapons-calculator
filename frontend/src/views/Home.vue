<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeapon } from '@/composables/weapon'
import WeaponsGrid from '@/components/common/WeaponsGrid.vue'
import PaginationButtons from '@/components/common/PaginationButtons.vue'

const { weaponsListReponse, weaponsListResponseState, fetchWeaponsList } = useWeapon()

const handleSkipToPage = async (page: number | null) => {
  if (page) await fetchWeaponsList(page)
}

onMounted(async () => {
  await fetchWeaponsList()
})
</script>

<template>
  <div class="p-10 mx-auto max-w-[1000px] flex flex-col gap-4 w-full">
    <weapons-grid
      :weapons="weaponsListReponse.data"
      :is-loading="weaponsListResponseState.is_loading"
    />
    <pagination-buttons
      :current_page="weaponsListReponse.meta.current_page"
      :has_next_page="weaponsListReponse.meta.has_next_page"
      :has_prev_page="weaponsListReponse.meta.has_prev_page"
      :total_pages="weaponsListReponse.meta.total_pages"
      @click:skip-to-page="handleSkipToPage"
    />
  </div>
</template>
