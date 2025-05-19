<template>
  <div class="w-[200px] bg-yellow-600 text-white py-4 px-2 transition-all">
    <RouterLink
      :to="{ name: 'app.dashboard' }"
      class="flex items-center p-2 rounded hover:bg-black/30 transition-colors"
    >
      <span class="mr-2 text-gray-300">
        <HomeIcon class="w-5" />
      </span>
      <span class="text-xs"> Dashboard </span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.products' }"
      class="flex items-center p-2 rounded hover:bg-black/30 transition-colors"
    >
      <span class="mr-2 text-gray-300">
        <ShoppingBagIcon class="w-5" />
      </span>
      <span class="text-xs"> Product </span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.dashboard' }"
      class="flex items-center p-2 rounded hover:bg-black/30 transition-colors"
    >
      <span class="mr-2 text-gray-300">
        <UsersIcon class="w-5" />
      </span>
      <span class="text-xs"> Users </span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.dashboard' }"
      class="flex items-center p-2 rounded hover:bg-black/30 transition-colors"
    >
      <span class="mr-2 text-gray-300">
        <ChartBarIcon class="w-5" />
      </span>
      <span class="text-xs">Report</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { HomeIcon, UsersIcon, ChartBarIcon, ShoppingBagIcon } from '@heroicons/vue/24/solid'
</script>
