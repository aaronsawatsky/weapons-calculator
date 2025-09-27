<script setup lang="ts">
import type { SnackbarType } from '@/types/types'
import MaterialIcon from './MaterialIcon.vue'
import { computed, watch } from 'vue'

interface Props {
  text: string
  messageType: SnackbarType
}

const props = defineProps<Props>()

const isShow = defineModel<boolean>('isShow', { default: false })

const icon = computed(() => {
  switch (props.messageType) {
    case 'alert':
      return 'error'
    case 'warning':
      return 'warning'
    default:
      return 'info'
  }
})

const backgroundColor = computed(() => {
  switch (props.messageType) {
    case 'alert':
      return 'bg-red-400'
    case 'warning':
      return 'bg-amber-400'
    default:
      return 'bg-blue-400'
  }
})

const close = () => {
  isShow.value = false
}

watch(
  () => isShow.value,
  (_, oldVal) => {
    if (!oldVal) {
      setTimeout(() => close(), 5000)
    }
  },
)
</script>

<template>
  <div
    class="w-full md:w-fit p-4 fixed bottom-0 transition-all duration-300 ease-in-out md:max-w-xs md:min-w-[400px]"
    :class="isShow ? '' : '-translate-x-[calc(100%+1rem)]'"
  >
    <div
      class="rounded px-4 py-2 flex items-center shadow/30 justify-between w-full gap-4"
      :class="backgroundColor"
    >
      <div class="flex gap-2 items-center">
        <material-icon :icon-name="icon" />
        <span class="leading-none">{{ text }}</span>
      </div>
      <button
        type="button"
        class="cursor-pointer flex hover:bg-white/20 p-1 rounded"
        @click="close"
      >
        <material-icon icon-name="close" />
      </button>
    </div>
  </div>
</template>
