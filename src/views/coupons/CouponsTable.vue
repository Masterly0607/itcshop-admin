<template>
  <BaseTable title="Coupons" :loading="loading" :columns="6">
    <!-- Header -->
    <template #thead>
      <th class="px-4 py-2 text-left">Code</th>
      <th class="px-4 py-2 text-left">Type</th>
      <th class="px-4 py-2 text-left">Value</th>
      <th class="px-4 py-2 text-left">Min Order</th>
      <th class="px-4 py-2 text-left">Expires At</th>
      <th class="px-4 py-2 text-left">Actions</th>
    </template>

    <!-- Body -->
    <template #tbody>
      <tr v-if="!coupons.length">
        <td colspan="6" class="text-center py-4 text-gray-500">No coupons found.</td>
      </tr>

      <tr v-for="coupon in coupons" :key="coupon.id" class="hover:bg-gray-50 transition border-t">
        <td class="p-3 font-medium">{{ coupon.code }}</td>
        <td class="p-3 capitalize">{{ coupon.discount_type }}</td>
        <td class="p-3">{{ coupon.discount_value }}</td>
        <td class="p-3">{{ coupon.min_order_amount }}</td>
        <td class="p-3">
          {{ coupon.expires_at ? new Date(coupon.expires_at).toLocaleString() : 'N/A' }}
        </td>
        <td class="p-3">
          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-sm btn-ghost">⋮</button>
            <ul
              tabindex="0"
              class="dropdown-content z-[999] menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <button @click="$emit('edit', coupon)">Edit</button>
              </li>
              <li>
                <button class="text-red-500" @click="$emit('delete', coupon.id)">Delete</button>
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

defineProps({
  coupons: Array,
  loading: Boolean,
})

defineEmits(['edit', 'delete'])
</script>
