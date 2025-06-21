<template>
  <BaseTable title="Users" :loading="loading" :columns="4">
    <!-- Header -->
    <template #thead>
      <th class="px-4 py-2 text-left">ID</th>
      <th class="px-4 py-2 text-left">Name</th>
      <th class="px-4 py-2 text-left">Email</th>
      <th class="px-4 py-2 text-left">Actions</th>
    </template>

    <!-- Body -->
    <template #tbody>
      <tr v-if="!users.length">
        <td colspan="4" class="text-center py-4 text-gray-500">No users found.</td>
      </tr>

      <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition border-t">
        <td class="p-3">{{ user.id }}</td>
        <td class="p-3">{{ user.name }}</td>
        <td class="p-3">{{ user.email }}</td>
        <td class="p-3">
          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-sm btn-ghost">⋮</button>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <button @click="$emit('edit', user)">Edit</button>
              </li>
              <li>
                <button class="text-red-500" @click="$emit('delete', user.id)">Delete</button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/core/table/BaseTable.vue'

defineEmits(['edit', 'delete'])

const props = defineProps({
  users: {
    type: Array,
    default: () => [], // ✅ Safe fallback to avoid .length error
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
