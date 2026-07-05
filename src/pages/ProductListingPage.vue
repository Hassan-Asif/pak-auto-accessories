<template>
  <main class="container-page py-12">
    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 class="text-4xl font-black">Products</h1>
        <p class="mt-3 text-zinc-400">Availability is always confirmation-based unless physically held.</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        <select v-model="filters.category" class="field">
          <option value="">All Categories</option>
          <option v-for="category in productStore.categories" :key="category.id" :value="category.name">{{ category.name }}</option>
        </select>
        <input v-model="filters.brand" class="field" placeholder="Car brand" />
        <input v-model="filters.model" class="field" placeholder="Car model" />
      </div>
    </div>
    <div v-if="productStore.loading" class="py-20 text-center text-zinc-400">Loading products...</div>
    <div v-else class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/products/ProductCard.vue'
import { useProductStore } from '../stores/products'

const route = useRoute()
const productStore = useProductStore()
const filters = reactive({ category: route.query.category || '', brand: '', model: '' })

const filteredProducts = computed(() => productStore.activeProducts.filter((product) => {
  
  return (!filters.category || product.category === filters.category)
    && (!filters.brand || product.carBrand?.toLowerCase().includes(filters.brand.toLowerCase()))
    && (!filters.model || product.carModel?.toLowerCase().includes(filters.model.toLowerCase()))
}))

watch(() => filters.category, () => productStore.fetchProducts({ category: filters.category }))
onMounted(() => productStore.fetchProducts({ category: filters.category }))
</script>
