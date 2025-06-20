<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg">{{ title }}</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="closeModal">✕</button>
      </div>
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Modal Title',
  },
})

const modal = ref(null)

function openModal() {
  modal.value?.showModal()
}
function closeModal() {
  modal.value?.close()
}

defineExpose({ openModal, closeModal })
</script>
