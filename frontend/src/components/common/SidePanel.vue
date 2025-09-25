<script setup lang="ts">
import { ref } from 'vue'

const isShow = defineModel<boolean>('isShowSidePanel', { default: false })
</script>

<template>
  <div
    class="h-screen min-w-[680px] max-w-[680px] bg-darkBg z-50 ml-auto transition-all duration-300 ease-in-out border-l border-border-base"
    :class="isShow ? 'shadow-2xl/40' : 'translate-x-full '"
  >
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot name="content" />
    </main>
  </div>
</template>
