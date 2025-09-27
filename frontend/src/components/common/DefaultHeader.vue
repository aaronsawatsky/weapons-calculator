<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { useSearchModalStore } from '@/stores/searchModal'

const searchModalStore = useSearchModalStore()

const header = useTemplateRef('header')

const setHeaderHeight = () => {
  const height = header.value?.clientHeight
  document.documentElement.style.setProperty('--header-height', `${height}px`)
}

const handleToggleSearchModal = () => {
  searchModalStore.isShow = !searchModalStore.isShow
}

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    handleToggleSearchModal()
  }
}

onMounted(() => {
  setHeaderHeight()
  window.addEventListener('resize', setHeaderHeight)
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', setHeaderHeight)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header
    ref="header"
    class="py-2 px-4 fixed top-0 left-0 border-b border-border-base drop-shadow-2xl w-full bg-secondaryBg"
  >
    <button
      class="flex rounded-full bg-secondaryBg/70 px-2 py-1 border border-border-base items-center justify-center gap-1 ml-auto"
      @click="handleToggleSearchModal"
    >
      <material-icon icon-name="search" class="flex !text-xl" />
      <div class="flex items-center gap-0.5">
        <material-icon icon-name="keyboard_command_key" class="flex !text-xl" />
        <p class="pt-0.5 !leading-none">K</p>
      </div>
    </button>
  </header>
</template>
