<template>
  <section class="flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-semibold">Orders</h1>
    </div>

    <OrderModal ref="modalRef" :order="currentOrder" @refresh="orderStore.getOrders" />

    <div class="flex-1 overflow-auto">
      <OrdersTable :onView="viewOrder" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import OrderModal from '/src/views/orders/OrderModal.vue'
import OrdersTable from '/src/views/orders/OrdersTable.vue'
import { useOrderStore } from '@/stores/orderStore'

const modalRef = ref(null)
const orderStore = useOrderStore()
const currentOrder = ref(null)

onMounted(() => {
  orderStore.getOrders()
})

async function viewOrder(order) {
  const fullOrder = await orderStore.getOrderById(order.id)
  currentOrder.value = fullOrder
  nextTick(() => {
    modalRef.value.openModal()
  })
}
</script>
