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
    <weapon-card v-for="weapon in weapons" :weapon :is-loading="isLoading" />
  </div>
</template>
