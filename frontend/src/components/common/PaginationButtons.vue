<script setup lang="ts">
import { computed, ref } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import type { SnackbarState } from '@/types/types'
import { useSnackbarStore } from '@/stores/snackbar'

interface Props {
  has_next_page: boolean
  has_prev_page: boolean
  total_pages: number
  current_page: number
}

interface Emits {
  (e: 'click:skip-to-page', page: number | null): void
}

const emits = defineEmits<Emits>()

const props = defineProps<Props>()

const snackbarStore = useSnackbarStore()

const skipToPageValue = ref<number | null>(null)

const handleSkipToPage = (page: number | null) => {
  if (page && (page < 1 || page > props.total_pages)) {
    snackbarStore.isShow = true
    snackbarStore.text = 'Page not found'
    snackbarStore.messageType = 'warning'
    return
  }
  emits('click:skip-to-page', page)
  skipToPageValue.value = null
}

type PaginationItem = number | 'ellipsis'

const paginationButtons = computed<PaginationItem[]>(() => {
  if (props.total_pages <= 0) return []

  const total = props.total_pages
  const current = Math.min(Math.max(props.current_page, 1), total)

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages: PaginationItem[] = [1]

  const append = (value: PaginationItem) => {
    if (pages[pages.length - 1] === value) return
    pages.push(value)
  }

  if (current <= 5) {
    for (let page = 2; page <= 5; page += 1) {
      if (page < total) append(page)
    }
    append('ellipsis')
  } else if (current >= total - 4) {
    append('ellipsis')
    for (let page = total - 4; page < total; page += 1) {
      if (page > 1) append(page)
    }
  } else {
    append('ellipsis')
    append(current - 1)
    append(current)
    append(current + 1)
    append('ellipsis')
  }

  append(total)

  return pages
})
</script>

<template>
  <div class="w-full flex items-center gap-4 justify-end">
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="flex cursor-pointer"
        :disabled="!has_prev_page"
        @click="handleSkipToPage(current_page - 1)"
      >
        <material-icon icon-name="keyboard_arrow_left" />
      </button>

      <template v-for="(item, index) in paginationButtons" :key="`${item}-${index}`">
        <div
          v-if="item === 'ellipsis'"
          class="flex p-2 size-full max-h-6 max-w-6 items-center justify-center"
        >
          <material-icon icon-name="more_horiz" />
        </div>
        <button
          v-else
          type="button"
          class="text p-2 leading-none flex rounded-sm size-full items-center justify-center max-h-6 max-w-6 cursor-pointer"
          :class="item === current_page ? ' bg-accent' : 'hover:bg-accent/20'"
          @click="handleSkipToPage(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        type="button"
        class="flex cursor-pointer"
        :disabled="!has_next_page"
        @click="handleSkipToPage(current_page + 1)"
      >
        <material-icon icon-name="keyboard_arrow_right" />
      </button>
    </div>
    <form class="flex items-center gap-4" @submit.prevent="handleSkipToPage(skipToPageValue)">
      <span>Page</span>
      <input
        type="number"
        v-model="skipToPageValue"
        class="border border-border-base rounded py-1 px-2 leading-none text-xs focus:outline-none max-w-10 appearance-none"
      />
      <span>of</span>
      <span class="font-bold underline">{{ total_pages }}</span>
    </form>
  </div>
</template>
