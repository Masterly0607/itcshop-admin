<template>
  <div class="flex min-h-full">
    <!-- Sidebar -->
    <Sidebar :sidebarOpened="sidebarOpened" />

    <!-- Main content -->
    <div class="flex-1">
      <Navbar @toggle-sidebar="toggleSidebar" />
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
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
