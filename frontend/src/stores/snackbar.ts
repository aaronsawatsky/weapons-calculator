import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SnackbarType } from '@/types/types'

export const useSnackbarStore = defineStore('snackbar', () => {
  const isShow = ref<boolean>(false)
  const text = ref<string>('')
  const messageType = ref<SnackbarType>('normal')

  return { isShow, text, messageType }
})
