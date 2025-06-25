<!-- src/views/customers/CustomersTable.vue -->
<template>
  <div class="overflow-auto bg-white rounded-lg shadow">
    <table class="w-full table-auto text-sm">
      <thead class="bg-gray-100 text-left font-semibold">
        <tr>
          <th class="p-3">#</th>
          <th class="p-3">First Name</th>
          <th class="p-3">Last Name</th>
          <th class="p-3">Email</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(customer, index) in customerStore.customers"
          :key="customer.id"
          class="border-t hover:bg-gray-50"
        >
          <td class="p-3">{{ index + 1 }}</td>
          <td class="p-3">{{ customer.first_name }}</td>
          <td class="p-3">{{ customer.last_name }}</td>
          <td class="p-3">{{ customer.email }}</td>
          <td class="p-3 text-right space-x-2">
            <button class="btn btn-sm btn-info text-white" @click="$emit('edit', customer)">
              Edit
            </button>
            <button class="btn btn-sm btn-error text-white" @click="$emit('delete', customer.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCustomerStore } from '@/stores/customerStore'
const customerStore = useCustomerStore()
</script>
