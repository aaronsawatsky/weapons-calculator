<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useWeapon } from '@/composables/weapon'
import { useSearchModalStore } from '@/stores/searchModal'
import { storeToRefs } from 'pinia'
import WeaponsGrid from '@/components/common/WeaponsGrid.vue'
import PaginationButtons from '@/components/common/PaginationButtons.vue'
import CategoryButton from '@/components/common/CategoryButton.vue'
import FilterSidePanel from '@/components/common/FilterSidePanel.vue'

const {
  weaponsListReponse,
  weaponsListResponseState,
  weaponsFetchRequestPayload,
  fetchWeaponsList,
  weaponCategoriesListResponse,
  weaponCategriesListResponseState,
  fetchWeaponsCategoriesList,
} = useWeapon()

const searchModalStore = useSearchModalStore()

const { keyword, searchModalWeaponsListResponse } = storeToRefs(searchModalStore)

const isShowSidePanel = ref<boolean>(false)

const handleSkipToPage = async (page: number | null) => {
  if (page) {
    weaponsFetchRequestPayload.value.page = page
    await fetchWeaponsList(weaponsFetchRequestPayload.value)
  }
}

watch(
  () => weaponCategoriesListResponse.value,
  async () => {
    const attackTypes = weaponCategoriesListResponse.value.find(
      (item) => item.key === 'attack_types',
    )
    const weaponTypes = weaponCategoriesListResponse.value.find(
      (item) => item.key === 'weapon_types',
    )
    if (attackTypes)
      weaponsFetchRequestPayload.value.attack_type = attackTypes?.categories
        .filter((item) => item.is_selected)
        .map((item) => item.type)
    if (weaponTypes)
      weaponsFetchRequestPayload.value.weapon_type = weaponTypes?.categories
        .filter((item) => item.is_selected)
        .map((item) => item.type)
    await fetchWeaponsList(weaponsFetchRequestPayload.value)
  },
  { deep: true },
)

watch(keyword, async () => {
  if (keyword.value.length) {
    weaponsFetchRequestPayload.value.keyword = keyword.value
    await fetchWeaponsList(weaponsFetchRequestPayload.value)
    searchModalWeaponsListResponse.value = weaponsListReponse.value
  }
})

onMounted(async () => {
  await fetchWeaponsCategoriesList()
})
</script>

<template>
  <filter-side-panel
    v-model:is-show-side-panel="isShowSidePanel"
    :weapon-categories-list="weaponCategoriesListResponse"
  />
  <div class="mx-auto max-w-[1000px] flex flex-col gap-4 w-full">
    <div class="flex flex-wrap gap-4">
      <template v-for="category in weaponCategoriesListResponse">
        <template v-for="item in category.categories">
          <category-button
            v-if="item.is_selected"
            v-model:is-selected="item.is_selected"
            :title="item.type"
          />
        </template>
      </template>
    </div>
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
  <button @click="isShowSidePanel = !isShowSidePanel">show</button>
</template>
