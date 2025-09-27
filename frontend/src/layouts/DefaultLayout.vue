<script setup lang="ts">
import DefaultHeader from '@/components/common/DefaultHeader.vue'
import SnackBar from '@/components/common/SnackBar.vue'
import SearchModal from '@/components/common/SearchModal.vue'
import { useSnackbarStore } from '@/stores/snackbar'
import { useSearchModalStore } from '@/stores/searchModal'

const snackbarStore = useSnackbarStore()
const searchModalStore = useSearchModalStore()
</script>

<template>
  <default-header />
  <!-- left sidebar -->
  <main>
    <RouterView />
    <search-modal v-model:is-show="searchModalStore.isShow" />
    <snack-bar
      v-model:is-show="snackbarStore.isShow"
      :message-type="snackbarStore.messageType"
      :text="snackbarStore.text"
    />
  </main>
  <!-- footer -->
</template>
