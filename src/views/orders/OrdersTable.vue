<template>
  <BaseTable title="Orders" :loading="orderStore.loading" :columns="6">
    <!-- Header -->
    <template #thead>
      <th class="px-4 py-2 text-left">ID</th>
      <th class="px-4 py-2 text-left">Customer</th>
      <th class="px-4 py-2 text-left">Total</th>
      <th class="px-4 py-2 text-left">Status</th>
      <th class="px-4 py-2 text-left">Date</th>
      <th class="px-4 py-2 text-left">Action</th>
    </template>

    <!-- Body -->
    <template #tbody>
      <tr v-if="!orderStore.orders.length">
        <td colspan="6" class="text-center py-4 text-gray-500">No orders found.</td>
      </tr>

      <tr v-for="order in orderStore.orders" :key="order.id" class="hover:bg-gray-50 transition">
        <td class="p-3 border-t">{{ order.id }}</td>
        <td class="p-3 border-t">{{ order.customer?.name || order.customer?.first_name }}</td>
        <td class="p-3 border-t text-green-700 font-medium">
          ${{ Number(order.total_price).toFixed(2) }}
        </td>
        <td class="p-3 border-t">
          <span
            class="badge capitalize"
            :class="{
              'badge-warning': order.status === 'pending',
              'badge-info': order.status === 'processing',
              'badge-primary': order.status === 'shipped',
              'badge-success': order.status === 'completed',
              'badge-error': order.status === 'cancelled',
            }"
          >
            {{ order.status }}
          </span>
        </td>
        <td class="p-3 border-t text-sm text-gray-500">
          {{
            new Date(order.updated_at).toLocaleString('en-US', {
              dateStyle: 'short',
              timeStyle: 'short',
              timeZone: 'Asia/Phnom_Penh',
            })
          }}
        </td>
        <td class="p-3 border-t">
          <button class="btn btn-sm btn-outline btn-primary" @click="onView(order)">View</button>
        </td>
      </tr>
    </template>
  </BaseTable>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'
import BaseTable from '@/components/core/table/BaseTable.vue'

defineProps({ onView: Function })
const orderStore = useOrderStore()
</script>
