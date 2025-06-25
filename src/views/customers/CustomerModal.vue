<!-- src/views/customers/CustomerModal.vue -->
<template>
  <BaseModal ref="modal" title="Update Customer">
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="label">First Name</label>
        <input v-model="form.first_name" class="input input-bordered w-full" />
      </div>
      <div>
        <label class="label">Last Name</label>
        <input v-model="form.last_name" class="input input-bordered w-full" />
      </div>
      <div>
        <label class="label">Email</label>
        <input v-model="form.email" class="input input-bordered w-full" />
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <button class="btn" type="button" @click="close">Cancel</button>
        <button class="btn btn-primary" type="submit">Update</button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import BaseModal from '@/components/core/modal/BaseModal.vue'

const modal = ref(null)
const customerStore = useCustomerStore()
const emit = defineEmits(['updated'])

const form = ref({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
})

function open(customer) {
  form.value = { ...customer }
  modal.value?.openModal()
}

function close() {
  modal.value?.closeModal()
}

async function submitForm() {
  await customerStore.update(form.value.id, form.value)
  emit('updated')
  close()
}

defineExpose({ open })
</script>
