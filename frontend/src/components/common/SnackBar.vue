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
  <Teleport to="#snackbar-block">
    <div
      class="rounded px-4 py-2 flex items-center shadow/30 justify-between w-full md:max-w-xs transition-all duration-300 ease-in-out gap-4"
      :class="[backgroundColor, isShow ? '' : '-translate-x-[calc(100%+1rem)]']"
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
  </Teleport>
</template>
