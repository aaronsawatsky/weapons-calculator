<script setup lang="ts">
import WeaponCard from './WeaponCard.vue'
import type { Weapon } from '@/types/types'

interface Props {
  weapons: Weapon[]
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <template v-if="isLoading">
      <div v-for="i in 12" class="border p-4 rounded border-border-base flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="size-6 rounded w-full animate-pulse bg-secondaryBg/70" />
          <div class="size-[14px] rounded w-1/2 animate-pulse bg-secondaryBg/70" />
        </div>
        <div class="bg-secondaryBg/70 h-[90px] rounded w-full animate-pulse" />
      </div>
    </template>
    <template v-else>
      <weapon-card v-for="weapon in weapons" :weapon />
    </template>
  </div>
</template>
