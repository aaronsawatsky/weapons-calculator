<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()

const isSelected = defineModel<boolean>('is-selected', { default: false })
</script>

<template>
  <label
    class="flex items-center gap-2 rounded-full w-fit py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out"
    :class="isSelected ? 'bg-white !text-black' : 'bg-secondaryBg hover:bg-secondaryBg/70'"
  >
    <input v-model="isSelected" type="checkbox" class="absolute opacity-0" />
    <span class="leading-none">{{ title }}</span>
  </label>
</template>
