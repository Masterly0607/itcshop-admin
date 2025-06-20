<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="text-center font-bold text-2xl text-primary">ITC SHOP</div>
      <div class="shadow-lg p-5 bg-white mt-3">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {{ title }}
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const { title } = defineProps({
  title: String,
})
</script>
