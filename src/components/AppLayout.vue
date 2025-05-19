<template>
  <div class="min-h-full flex bg-gray-200">
    <!-- Sidebar -->
    <Sidebar :class="{ '-ml-[200px]': !sidebarOpened }" />
    <div class="flex-1">
      <Navbar @toggle-sidebar="toggleSidebar" />
      <main class="p-6">
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
const sidebarOpened = ref(true)
function toggleSidebar() {
  sidebarOpened.value = !sidebarOpened.value
}

// Make responsive
function handleSidebarOpened() {
  sidebarOpened.value = window.outerWidth > 768 // if > 768, handleSidebarOpened.value is true.
}

// onMounted = When the component appears on the screen, run this function.
onMounted(() => {
  handleSidebarOpened() // checks the current screen size:  If screen is bigger than 768px, sidebarOpened.value = true,  If smaller (like a phone), sidebarOpened.value = false
  window.addEventListener('resize', handleSidebarOpened) // Every time the user resizes the screen, run handleSidebarOpened() again. the same as click, when click it does something. "Hey browser! Please tell me when screen size changes, and I will check it!"
})

// onUnmounted = When the component is removed from the screen, stop listening to window resize.
onUnmounted(() => {
  window.removeEventListener('resize', handleSidebarOpened) // When my sidebar is gone, stop listening to screen changes.
})
</script>
