<template>
  <aside
    class="w-[220px] min-h-screen bg-yellow-600 text-white p-4 space-y-1 transition-all duration-200"
    :class="{ '-ml-[220px]': !sidebarOpened }"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.name"
      :to="item.to"
      class="flex items-center p-2 rounded transition"
      :class="[
        $route.name === item.name
          ? 'bg-white text-yellow-600 font-semibold shadow cursor-default'
          : 'hover:bg-black/20 cursor-pointer',
      ]"
    >
      <component
        :is="item.icon"
        class="w-5 mr-2"
        :class="$route.name === item.name ? 'text-yellow-600' : 'text-white'"
      />
      <span class="text-sm">{{ item.label }}</span>
    </RouterLink>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TruckIcon,
  UsersIcon,
  TagIcon,
} from '@heroicons/vue/24/solid'
defineProps({ sidebarOpened: Boolean })
const $route = useRoute()

const navItems = [
  { name: 'app.dashboard', to: { name: 'app.dashboard' }, icon: HomeIcon, label: 'Dashboard' },
  { name: 'app.products', to: { name: 'app.products' }, icon: ShoppingBagIcon, label: 'Products' },
  {
    name: 'app.categories',
    to: { name: 'app.categories' },
    icon: Squares2X2Icon,
    label: 'Categories',
  },
  { name: 'app.orders', to: { name: 'app.orders' }, icon: TruckIcon, label: 'Orders' },
  {
    name: 'app.customers',
    to: { name: 'app.customers' },
    icon: UsersIcon,
    label: 'Customers',
  },

  { name: 'app.users', to: { name: 'app.users' }, icon: UsersIcon, label: 'Users' },
  { name: 'app.coupons', to: { name: 'app.coupons' }, icon: TagIcon, label: 'Coupons' },
]
</script>
