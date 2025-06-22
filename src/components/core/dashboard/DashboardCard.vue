<template>
  <div class="bg-white rounded-lg shadow-md p-4 text-center">
    <h2 class="text-sm text-gray-500 mb-1">{{ label }}</h2>
    <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
})
</script>
