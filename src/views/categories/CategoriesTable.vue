<template>
  <BaseTable title="Manage Categories" :loading="loading" :columns="4">
    <!-- Table Header -->
    <template #thead>
      <th class="px-4 py-2 text-left">#</th>
      <th class="px-4 py-2 text-left">Name</th>
      <th class="px-4 py-2 text-left">Slug</th>
      <th class="px-4 py-2 text-left">Actions</th>
    </template>

    <!-- Table Body -->
    <template #tbody>
      <tr v-if="!categories.length">
        <td colspan="4" class="text-center p-6 text-gray-400">No categories found.</td>
      </tr>

      <tr v-for="cat in categories" :key="cat.id" class="hover:bg-gray-50 transition">
        <td class="p-3 border-t">{{ cat.id }}</td>
        <td class="p-3 border-t font-medium">{{ cat.name }}</td>
        <td class="p-3 border-t text-gray-500">{{ cat.slug }}</td>
        <td class="p-3 border-t">
          <div class="flex gap-2">
            <button class="btn btn-sm btn-info text-white" @click="$emit('edit', cat)">Edit</button>
            <button class="btn btn-sm btn-error text-white" @click="$emit('delete', cat.id)">
              Delete
            </button>
          </div>
        </td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/core/table/BaseTable.vue'

defineProps(['categories', 'loading'])
defineEmits(['edit', 'delete'])
</script>
