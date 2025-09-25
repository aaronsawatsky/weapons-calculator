<script setup lang="ts">
import MaterialIcon from './MaterialIcon.vue'

interface Props {
  title: string
  isSelected: boolean
}

interface Emits {
  (e: 'click:remove-filter'): void
  (e: 'click:add-filter'): void
}

const emits = defineEmits<Emits>()

const props = defineProps<Props>()

const handleRemoveFilter = () => {
  emits('click:remove-filter')
}

const handleAddFilter = () => {
  emits('click:add-filter')
}

const handleToggleFilter = () => {
  props.isSelected ? handleRemoveFilter() : handleAddFilter()
}
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-full w-fit py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out"
    :class="isSelected ? 'bg-white !text-black' : 'bg-secondaryBg hover:bg-secondaryBg/70'"
    @click="handleToggleFilter"
  >
    <span class="leading-none">{{ title }}</span>
  </button>
</template>
