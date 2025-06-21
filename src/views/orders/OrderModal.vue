<template>
  <BaseModal ref="modalRef" :title="`Order #${order?.id ?? ''}`">
    <div v-if="order">
      <!-- Customer Info -->
      <p>
        <strong>Customer:</strong> {{ order.customer?.name || order.customer?.first_name || 'N/A' }}
      </p>
      <p><strong>Email:</strong> {{ order.customer?.email || 'N/A' }}</p>

      <!-- Status Select -->
      <p class="mt-4"><strong>Status:</strong></p>
      <select v-model="order.status" class="select select-bordered w-full">
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <!-- Items List -->
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Items:</h3>
        <table class="table w-full text-sm">
          <thead>
            <tr class="border-b">
              <th class="text-left">Product</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id" class="border-b">
              <td>{{ item.product?.title || 'Unnamed' }}</td>
              <td class="text-right">{{ item.quantity }}</td>
              <td class="text-right">${{ Number(item.unit_price).toFixed(2) }}</td>
              <td class="text-right">${{ Number(item.subtotal).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right font-semibold">Grand Total:</td>
              <td class="text-right font-bold text-primary">
                ${{ Number(order.total_price).toFixed(2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end gap-2">
        <button class="btn" @click="closeModal">Close</button>
        <button class="btn btn-primary text-white" @click="updateStatus">Update Status</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseModal from '@/components/core/modal/BaseModal.vue'
import { useOrderStore } from '@/stores/orderStore'

const props = defineProps({ order: Object })
const emit = defineEmits(['refresh'])

const modalRef = ref()
const orderStore = useOrderStore()

const order = ref(null)

// 👇 Fix structuredClone crash
watch(
  () => props.order,
  (newVal) => {
    if (newVal) {
      order.value = JSON.parse(JSON.stringify(newVal))
    }
  },
  { immediate: true },
)

function openModal() {
  modalRef.value.openModal()
}

function closeModal() {
  modalRef.value.closeModal()
}

async function updateStatus() {
  await orderStore.updateOrder(order.value.id, { status: order.value.status })
  closeModal()
  emit('refresh')
}

defineExpose({ openModal })
</script>
