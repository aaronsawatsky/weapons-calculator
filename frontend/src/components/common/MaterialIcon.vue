<script setup lang="ts">
interface Props {
  iconName: string
}

defineProps<Props>()
</script>

<template>
  <span class="material-icons-outlined !text-base !leading-none">{{ iconName }}</span>
</template>
