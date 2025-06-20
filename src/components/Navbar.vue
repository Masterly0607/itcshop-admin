<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="navbar px-4 justify-between">
      <!-- Left: Sidebar toggle & Title -->
      <div class="flex items-center gap-2">
        <button class="btn btn-ghost btn-sm" @click="emit('toggle-sidebar')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="text-lg font-bold hidden sm:inline text-gray-700">Admin Panel</span>
      </div>

      <!-- Right: Avatar & Dropdown -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Admin avatar"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52"
        >
          <li class="text-gray-600 font-medium px-2 py-1">
            👋 Hello, {{ userStore.data?.name || 'Admin' }}
          </li>

          <li @click="logout"><a class="text-red-500 hover:text-red-600">🚪 Logout</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['toggle-sidebar'])

import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

function logout() {
  userStore.logout()
}
</script>
