<!-- src/views/customers/Customers.vue -->
<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Manage Customers</h1>
    <CustomersTable @edit="openEditModal" @delete="openDeleteModal" />

    <!-- Modals -->
    <DeleteModal ref="deleteModalRef" itemType="customer" @confirm="handleDelete" />
    <CustomerModal ref="editModalRef" @updated="refresh" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import CustomersTable from './CustomersTable.vue'
import CustomerModal from './CustomerModal.vue'
import DeleteModal from '@/components/core/modal/DeleteModal.vue'

const customerStore = useCustomerStore()
const deleteModalRef = ref(null)
const editModalRef = ref(null)
const customerIdToDelete = ref(null)

const refresh = () => customerStore.fetchAll()

const openEditModal = (customer) => {
  editModalRef.value?.open(customer)
}

const openDeleteModal = (id) => {
  customerIdToDelete.value = id
  deleteModalRef.value?.openModal()
}

const handleDelete = async () => {
  if (customerIdToDelete.value) {
    await customerStore.destroy(customerIdToDelete.value)
  }
}

onMounted(refresh)
</script>
