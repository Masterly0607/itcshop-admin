<template>
  <section class="flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-semibold">Manage Users</div>
      <button class="btn btn-primary text-white" @click="showAddModal">Add New User</button>
    </div>

    <!-- User Form Modal -->
    <UserModal ref="modalRef" :user="currentUser" @refresh="getUsers" />

    <!-- Delete Confirmation Modal -->
    <DeleteModal ref="deleteModalRef" item-type="user" @confirm="confirmDeleteUser" />

    <!-- User Table -->
    <UsersTable
      :users="userStore.users"
      :loading="userStore.loading"
      @edit="editUser"
      @delete="askToDeleteUser"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserModal from './UserModal.vue'
import UsersTable from './UsersTable.vue'
import DeleteModal from '@/components/core/modal/DeleteModal.vue'

const modalRef = ref(null)
const deleteModalRef = ref(null)

const userStore = useUserStore()
const currentUser = ref({ id: null, name: '', email: '' })
const userIdToDelete = ref(null)

onMounted(getUsers)

function getUsers() {
  userStore.getUsers()
}

function showAddModal() {
  currentUser.value = { id: null, name: '', email: '' }
  modalRef.value.openModal()
}

function editUser(user) {
  currentUser.value = { ...user }
  modalRef.value.openModal()
}

function askToDeleteUser(id) {
  userIdToDelete.value = id
  deleteModalRef.value.openModal()
}

function confirmDeleteUser() {
  userStore.deleteUser(userIdToDelete.value).then(getUsers)
}
</script>
