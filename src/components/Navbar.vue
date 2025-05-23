<template>
  <header class="shadow-lg">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <button class="btn btn-square btn-ghost btn-sm" @click="emit('toggle-sidebar')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end flex items-center">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div class="ml-2 text-sm">{{ userStore.data?.name }}</div>

          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-30 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between"> Profile </a>
            </li>

            <li @click="logout"><a>Logout</a></li>
          </ul>
        </div>
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
