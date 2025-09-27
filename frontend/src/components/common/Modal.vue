<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'

const dialogRef = useTemplateRef('dialog')

const isShow = defineModel<boolean>('isShow', { default: false })

const handleToggleModal = () => {
  if (isShow.value) dialogRef.value?.showModal()
  else dialogRef.value?.close()
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) isShow.value = false
}

const handleEscapeKeyClick = (event: KeyboardEvent) => {
  if (event.key === 'Escape') isShow.value = false
}

watch(isShow, handleToggleModal)

onMounted(() => {
  window.addEventListener('keydown', handleEscapeKeyClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscapeKeyClick)
})
</script>

<template>
  <dialog
    ref="dialog"
    @click="handleBackdropClick"
    class="backdrop:bg-black/20 transition-all backdrop:transition-all backdrop:ease-in-out backdrop:backdrop-blur-md mx-auto my-auto bg-transparent drop-shadow-xl"
  >
    <form method="dialog">
      <slot />
    </form>
  </dialog>
</template>
