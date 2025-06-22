<template>
  <section class="flex flex-col gap-6">
    <h1 class="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h1>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <DashboardCard label="Total Orders" :value="dashboard.total_orders" />
      <DashboardCard label="Total Sales" :value="`$ ${Number(dashboard.total_sales).toFixed(2)}`" />
      <DashboardCard label="Total Customers" :value="dashboard.total_customers" />
      <DashboardCard label="Total Products" :value="dashboard.total_products" />
    </div>

    <!-- Recent Orders -->
    <div class="bg-white shadow-md rounded-lg p-5">
      <h2 class="text-xl font-semibold mb-4">🧾 Recent Orders</h2>
      <div class="overflow-auto">
        <table class="min-w-full text-left">
          <thead>
            <tr class="text-sm text-gray-600 border-b">
              <th class="py-2 px-3">ID</th>
              <th class="py-2 px-3">Customer</th>
              <th class="py-2 px-3">Total</th>
              <th class="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in dashboard.recent_orders"
              :key="order.id"
              class="border-t hover:bg-gray-50 text-sm"
            >
              <td class="py-2 px-3">{{ order.id }}</td>
              <td class="py-2 px-3">
                {{
                  order.customer
                    ? order.customer.first_name + ' ' + order.customer.last_name
                    : 'N/A'
                }}
              </td>
              <td class="py-2 px-3">$ {{ Number(order.total_price).toFixed(2) }}</td>
              <td class="py-2 px-3 capitalize text-green-600 font-medium">
                {{ order.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Products -->
    <div class="bg-white shadow-md rounded-lg p-5">
      <h2 class="text-xl font-semibold mb-4">🔥 Top Selling Products</h2>
      <ul class="divide-y">
        <li
          v-for="product in dashboard.top_products"
          :key="product.id"
          class="flex justify-between items-center py-2 text-sm"
        >
          <span class="text-gray-700">{{ product.title }}</span>
          <span class="text-gray-500">{{ product.total_sold }} sold</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axiosClient from '@/axios'

import DashboardCard from '@/components/core/dashboard/DashboardCard.vue'

const dashboard = ref({
  total_orders: 0,
  total_sales: 0,
  total_customers: 0,
  total_products: 0,
  recent_orders: [],
  top_products: [],
})

async function fetchDashboardData() {
  const res = await axiosClient.get('/dashboard')
  dashboard.value = res.data
}

onMounted(fetchDashboardData)
</script>
