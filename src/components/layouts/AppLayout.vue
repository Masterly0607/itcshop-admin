<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <Sidebar :sidebarOpened="sidebarOpened" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <Navbar @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '../Sidebar.vue'
import Navbar from '../Navbar.vue'
import { useUserStore } from '@/stores/userStore'

const sidebarOpened = ref(true)
function toggleSidebar() {
  sidebarOpened.value = !sidebarOpened.value
}

function handleSidebarOpened() {
  sidebarOpened.value = window.innerWidth > 768
}

onMounted(() => {
  useUserStore().getUser()
  handleSidebarOpened()
  window.addEventListener('resize', handleSidebarOpened)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleSidebarOpened)
})
</script>
