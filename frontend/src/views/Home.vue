<script setup lang="ts">
import { onMounted, ref } from 'vue'

const URL = import.meta.env.VITE_API_BASE_URL

const weapons = ref([])

const fetchWeapons = async () => {
  const response = await window.fetch(`${URL}/weapons`)
  const data = await response.json()
  console.log(data)
  weapons.value = data
}

onMounted(() => {
  fetchWeapons()
})
</script>

<template></template>
