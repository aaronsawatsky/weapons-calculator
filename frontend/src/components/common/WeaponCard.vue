<script setup lang="ts">
import type { Weapon } from '@/types/types'

interface Props {
  weapon: Weapon
}

defineProps<Props>()
</script>

<template>
  <button
    class="bg-secondaryBg hover:bg-secondaryBg/70 p-4 rounded flex flex-col gap-4 cursor-pointer shadow border border-border-base transition-all duration-300 ease-in-out"
  >
    <div class="flex flex-col gap-2">
      <p class="text-left leading-none text-2xl font-bold truncate">{{ weapon.name }}</p>
      <div class="flex items-center gap-4 w-fit italic text-sm">
        <span class="leading-none">{{ weapon.weapon_type.replace('-', ' ') }}</span>
        <div class="self-stretch w-px bg-white" />
        <span class="leading-none">{{ weapon.attack_type }}</span>
      </div>
    </div>
    <div class="flex flex-col md:grid grid-cols-[1fr_auto]">
      <div class="size-fit mx-auto md:mr-auto md:ml-0">
        <img :src="weapon.image" class="object-cover" />
      </div>
      <div>
        <div v-for="requirement in Object.keys(weapon.requirements)">
          {{ requirement }}
        </div>
      </div>
    </div>
  </button>
</template>
