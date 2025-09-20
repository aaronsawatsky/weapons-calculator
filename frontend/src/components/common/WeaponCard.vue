<script setup lang="ts">
import type { Weapon } from '@/types/types'

interface Props {
  weapon: Weapon
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div v-if="isLoading" class="border p-4 rounded border-white"></div>
  <button
    v-else
    class="border p-4 rounded border-white flex flex-col gap-4 hover:bg-white/10 cursor-pointer"
  >
    <div class="flex flex-col gap-2">
      <p class="text-left leading-none text-2xl font-bold truncate">{{ weapon.name }}</p>
      <div class="flex items-center gap-4 w-fit italic text-sm">
        <span class="leading-none">{{ weapon.weapon_type }}</span>
        <div class="self-stretch w-px bg-white" />
        <span class="leading-none">{{ weapon.attack_type }}</span>
      </div>
    </div>
    <div class="flex flex-col md:grid grid-cols-[1fr_auto]">
      <div class="size-fit mx-auto md:mr-auto md:ml-0">
        <img :src="weapon.image" class="object-cover" />
      </div>
      <div></div>
    </div>
  </button>
</template>
