<template>
  <div class="bg-white p-4 rounded-lg shadow mt-6">
    <!-- Top Controls -->
    <div
      class="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-200 mb-4"
    >
      <div class="flex items-center gap-2 whitespace-nowrap">
        <span class="text-sm font-medium">Per Page</span>
        <select
          class="select select-sm select-bordered"
          :value="perPage"
          @change="$emit('update:perPage', +$event.target.value)"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>

      <input
        type="text"
        class="input input-sm input-bordered w-64"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Search..."
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50 text-sm text-gray-700 font-semibold">
          <slot name="thead" />
        </thead>

        <tbody v-if="loading">
          <tr>
            <td :colspan="columns" class="text-center py-4 text-sm text-gray-500">Loading...</td>
          </tr>
        </tbody>

        <tbody v-else>
          <slot name="tbody" />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="meta" class="flex flex-wrap justify-between items-center mt-4 gap-2">
      <span class="text-sm text-gray-500">
        Showing from {{ meta.from }} to {{ meta.to }} of {{ meta.total }}
      </span>
      <div class="join">
        <button
          v-for="(link, i) in meta.links"
          :key="i"
          class="join-item btn btn-sm transition"
          :class="{
            'btn-disabled': !link.url,
            'btn-active': link.active,
          }"
          v-html="link.label"
          @click.prevent="$emit('page', link.url)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  meta: Object,
  search: String,
  perPage: Number,
  columns: Number,
})
</script>
