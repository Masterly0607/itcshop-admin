<template>
  <section>
    <div class="flex items-center justify-between">
      <div class="text-3xl font-semibold">Products</div>
      <input type="submit" value="Add new Product" class="btn btn-primary text-white" />
    </div>
    <ProductsTable />
  </section>
</template>

<script setup>
import ProductsTable from './ProductsTable.vue'
</script>
