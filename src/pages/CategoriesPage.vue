<template>
  <main class="container-page py-12">
    <h1 class="text-4xl font-black">Categories</h1>
    <p class="mt-3 max-w-2xl text-zinc-400">Explore accessories by use case. Every product is confirmed with vendors before payment is requested.</p>
    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <CategoryCard v-for="category in productStore.categories" :key="category.id" :category="category" />
    </div>
  </main>
</template>

<script setup>
import CategoryCard from '../components/products/CategoryCard.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
</script>
