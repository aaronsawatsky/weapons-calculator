<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import { useWeapon } from '@/composables/weapon'
import WeaponsGrid from '@/components/common/WeaponsGrid.vue'
import PaginationButtons from '@/components/common/PaginationButtons.vue'
import SidePanel from '@/components/common/SidePanel.vue'
import CategoryButton from '@/components/common/CategoryButton.vue'
import MaterialIcon from '@/components/common/MaterialIcon.vue'

const {
  weaponsListReponse,
  weaponsListResponseState,
  weaponsFetchRequestPayload,
  fetchWeaponsList,
  weaponCategoriesListResponse,
  weaponCategriesListResponseState,
  fetchWeaponsCategoriesList,
} = useWeapon()

const isShowSidePanel = ref(true)

const selectedWeaponCategories = reactive({
  weapon_types: new Set<string>(),
  attack_types: new Set<string>(),
})

const handleSkipToPage = async (page: number | null) => {
  if (page) {
    weaponsFetchRequestPayload.value.page = page
    await fetchWeaponsList(weaponsFetchRequestPayload.value)
  }
}

const handleAddWeaponTypeFilter = (category: string) => {
  selectedWeaponCategories.weapon_types.add(category)
}

const handleRemoveWeaponTypeFilter = (category: string) => {
  selectedWeaponCategories.weapon_types.delete(category)
}

const handleAddAttackTypeFilter = (category: string) => {
  selectedWeaponCategories.attack_types.add(category)
}

const handleRemoveAttackTypeFilter = (category: string) => {
  selectedWeaponCategories.attack_types.delete(category)
}

watch(
  () => selectedWeaponCategories,
  async () => {
    weaponsFetchRequestPayload.value.weapon_type = [...selectedWeaponCategories.weapon_types]
    weaponsFetchRequestPayload.value.attack_type = [...selectedWeaponCategories.attack_types]
    await fetchWeaponsList(weaponsFetchRequestPayload.value)
  },
  { deep: true },
)

onMounted(async () => {
  await fetchWeaponsList()
  await fetchWeaponsCategoriesList()
})
</script>

<template>
  <side-panel v-model:is-show-side-panel="isShowSidePanel" class="fixed top-0 right-0">
    <template #header>
      <div class="border-b border-border-base p-4">
        <div class="flex items-center gap-2 leading-none">
          <button @click="isShowSidePanel = false">
            <material-icon icon-name="arrow_forward" class="!text-[24px]" />
          </button>
          <span class="font-bold text-2xl">Filters</span>
        </div>
      </div>
    </template>
    <template #content>
      <div class="p-4 flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="border-b border-border-base pb-2">Weapon Types</p>
          <div class="flex flex-wrap items-center gap-4 p-2">
            <category-button
              v-for="category in weaponCategoriesListResponse.weapon_types"
              :title="category"
              :is-selected="selectedWeaponCategories.weapon_types.has(category)"
              @click:add-filter="handleAddWeaponTypeFilter(category)"
              @click:remove-filter="handleRemoveWeaponTypeFilter(category)"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="border-b border-border-base pb-2">Attack Types</p>
          <div class="flex flex-wrap items-center gap-4 p-2">
            <category-button
              v-for="category in weaponCategoriesListResponse.attack_types"
              :title="category"
              :is-selected="selectedWeaponCategories.attack_types.has(category)"
              @click:add-filter="handleAddAttackTypeFilter(category)"
              @click:remove-filter="handleRemoveAttackTypeFilter(category)"
            />
          </div>
        </div>
      </div>
    </template>
  </side-panel>
  <div class="p-10 mx-auto max-w-[1000px] flex flex-col gap-4 w-full">
    <div class="flex flex-wrap gap-4">
      <category-button
        v-for="category in selectedWeaponCategories.weapon_types"
        :title="category"
        :is-selected="selectedWeaponCategories.weapon_types.has(category)"
        @click:add-filter="handleAddWeaponTypeFilter(category)"
        @click:remove-filter="handleRemoveWeaponTypeFilter(category)"
      />
      <category-button
        v-for="category in selectedWeaponCategories.attack_types"
        :title="category"
        :is-selected="selectedWeaponCategories.attack_types.has(category)"
        @click:add-filter="handleAddAttackTypeFilter(category)"
        @click:remove-filter="handleRemoveAttackTypeFilter(category)"
      />
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
