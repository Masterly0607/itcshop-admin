<template>
  <div class="w-full bg-white rounded-lg shadow">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10 text-gray-500">Loading...</div>

    <!-- Table -->
    <div v-else>
      <table class="table w-full">
        <thead class="bg-gray-100 text-left text-gray-600 uppercase text-sm">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">Name</th>
            <th class="p-3">Slug</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="cat in categories"
            :key="cat.id"
            class="hover:bg-gray-50 transition duration-150"
          >
            <td class="p-3 border-t">{{ cat.id }}</td>
            <td class="p-3 border-t">{{ cat.name }}</td>
            <td class="p-3 border-t text-gray-500">{{ cat.slug }}</td>
            <td class="p-3 border-t">
              <div class="flex gap-2">
                <button class="btn btn-sm btn-info text-white" @click="$emit('edit', cat)">
                  Edit
                </button>
                <button class="btn btn-sm btn-error text-white" @click="$emit('delete', cat.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!categories.length">
            <td colspan="4" class="text-center p-6 text-gray-400">No categories found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps(['categories', 'loading'])
defineEmits(['edit', 'delete'])
</script>
