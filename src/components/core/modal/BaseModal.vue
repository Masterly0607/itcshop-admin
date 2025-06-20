<template>
  <dialog ref="modalRef" class="modal">
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

const modalRef = ref(null)

function openModal() {
  modalRef.value?.showModal()
}
function closeModal() {
  modalRef.value?.close()
}

defineExpose({ openModal, closeModal })
</script>
