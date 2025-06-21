<template>
  <BaseModal ref="modalRef" :title="user.id ? 'Update User' : 'Create New User'">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <input
        v-model="user.name"
        type="text"
        placeholder="Name"
        class="input input-bordered w-full"
        required
      />
      <input
        v-model="user.email"
        type="email"
        placeholder="Email"
        class="input input-bordered w-full"
        required
      />
      <input
        v-if="!user.id"
        v-model="user.password"
        type="password"
        placeholder="Password"
        class="input input-bordered w-full"
        required
      />
      <input
        v-if="!user.id"
        v-model="user.password_confirmation"
        type="password"
        placeholder="Confirm Password"
        class="input input-bordered w-full"
        required
      />

      <div class="flex justify-end gap-2">
        <button type="button" class="btn" @click="closeModal">Cancel</button>
        <button type="submit" class="btn btn-primary text-white">
          {{ user.id ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseModal from '@/components/core/modal/BaseModal.vue'

const props = defineProps({ user: Object })
const emit = defineEmits(['refresh'])

const userStore = useUserStore()
const modalRef = ref(null)
const user = ref({ ...props.user })

watch(
  () => props.user,
  () => {
    user.value = { ...props.user }
  },
)

function openModal() {
  modalRef.value.openModal()
}

function closeModal() {
  modalRef.value.closeModal()
}

defineExpose({ openModal })

async function onSubmit() {
  try {
    if (user.value.id) {
      await userStore.updateUser(user.value.id, user.value)
    } else {
      await userStore.createUser({
        name: user.value.name,
        email: user.value.email,
        password: user.value.password,
        password_confirmation: user.value.password_confirmation, // include this
      })
    }

    emit('refresh')
    closeModal()
  } catch (err) {
    console.error('Submit error:', err)
  }
}
</script>
