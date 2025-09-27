<script setup lang="ts">
import SidePanel from './SidePanel.vue'
import CategoryButton from './CategoryButton.vue'
import MaterialIcon from './MaterialIcon.vue'
import type { WeaponCategory } from '@/types/types'

interface Props {
  weaponCategoriesList: WeaponCategory[]
}

defineProps<Props>()

const isShowSidePanel = defineModel<boolean>('isShowSidePanel', { default: false })
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
        <div v-for="category in weaponCategoriesList" class="flex flex-col gap-2">
          <p class="border-b border-border-base pb-2">
            {{ category.label }}
          </p>
          <div class="flex flex-wrap items-center gap-4 p-2">
            <category-button
              v-for="item in category.categories"
              v-model:is-selected="item.is_selected"
              :title="item.type"
            />
          </div>
        </div>
      </div>
    </template>
  </side-panel>
</template>
