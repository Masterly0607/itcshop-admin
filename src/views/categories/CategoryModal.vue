<!-- src/views/admin/categories/CategoryModal.vue -->
<template>
  <BaseModal
    ref="modalRef"
    :title="category?.id ? `Update Category: ${category.name}` : 'Create New Category'"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <input
        type="text"
        class="input input-bordered w-full"
        placeholder="Category Name"
        v-model="form.name"
        required
      />

      <div class="flex justify-end gap-2">
        <button type="button" class="btn" @click="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary text-white">
          {{ category?.id ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import BaseModal from '@/components/core/modal/BaseModal.vue'

const props = defineProps({ category: Object })
const emit = defineEmits(['refresh'])
const modalRef = ref()
const form = ref({ name: '' })
const store = useCategoryStore()

watch(
  () => props.category,
  (val) => {
    form.value = val ? { name: val.name } : { name: '' }
  },
)

const openModal = () => modalRef.value.openModal()
const closeModal = () => modalRef.value.closeModal()

const onSubmit = async () => {
  if (props.category?.id) {
    await store.update(props.category.id, form.value)
  } else {
    await store.create(form.value)
  }
  closeModal()
  emit('refresh')
}

defineExpose({ openModal, closeModal })
</script>
