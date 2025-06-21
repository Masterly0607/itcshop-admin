<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Are you sure you want to delete this {{ itemType }}?</h3>
      <p class="py-4">This will permanently remove the {{ itemType }} from your system.</p>
      <div class="modal-action">
        <button class="btn" @click="closeModal">Cancel</button>
        <button class="btn btn-error text-white" @click="confirmDelete">Yes, Delete</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  itemType: {
    type: String,
    default: 'item', // fallback
  },
})

const modalRef = ref(null)
const emit = defineEmits(['confirm'])

function openModal() {
  modalRef.value?.showModal()
}
function closeModal() {
  modalRef.value?.close()
}
function confirmDelete() {
  emit('confirm')
  closeModal()
}

defineExpose({ openModal, closeModal })
</script>
