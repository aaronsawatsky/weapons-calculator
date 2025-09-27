<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSearchModalStore } from '@/stores/searchModal'
import { useWeapon } from '@/composables/weapon'
import { storeToRefs } from 'pinia'
import MaterialIcon from './MaterialIcon.vue'
import Modal from './Modal.vue'

const { weaponsListReponse } = useWeapon()

const searchModalStore = useSearchModalStore()

const { keyword, searchModalWeaponsListResponse } = storeToRefs(searchModalStore)

const isShow = defineModel<boolean>('isShow', { default: false })

watchEffect(() => console.log(weaponsListReponse.value))
</script>

<template>
  <modal v-model:is-show="isShow">
    <div class="flex items-center justify-center flex-col gap-6 w-[800px]">
      <div class="overflow-hidden bg-white rounded flex items-center px-2 w-full">
        <material-icon icon-name="search" class="!text-[24px]" />
        <input
          v-model="keyword"
          type="text"
          class="focus:ring-0 focus:outline-none px-1 py-3 w-full"
        />
      </div>

      <div
        class="bg-white rounded p-4 w-full"
        :class="searchModalStore.keyword.length ? 'opacity-100' : 'opacity-0'"
      >
        <template v-for="weapon in searchModalWeaponsListResponse.data">
          {{ weapon.name }}
        </template>
      </div>
    </div>
  </modal>
</template>
