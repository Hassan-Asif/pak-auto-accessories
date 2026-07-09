<template>
  <main class="min-h-screen bg-zinc-50 py-16">

    <div class="container-page">

      <!-- Header -->

      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <span class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
            Shop
          </span>

          <h1 class="mt-5 text-5xl font-black text-zinc-900">
            Premium Car Accessories
          </h1>

          <p class="mt-4 max-w-2xl text-lg text-zinc-600">
            Browse premium automotive accessories, lighting, styling, interior,
            exterior and detailing products.
          </p>

        </div>

      </div>

      <!-- Vehicle Banner -->

      <div
        v-if="filters.vehicle"
        class="mt-10 rounded-3xl border border-green-200 bg-green-50 p-6"
      >

        <div class="flex items-center gap-4">

          <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
            🚗
          </div>

          <div>

            <h2 class="font-bold text-green-800">
              Showing Compatible Products
            </h2>

            <p class="text-green-700">
              {{ selectedVehicle?.displayName }}
            </p>

          </div>

        </div>

      </div>

      <!-- Filters -->

      <div
        class="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
      >

        <div class="grid gap-4 lg:grid-cols-3">

          <select
            v-model="filters.category"
            class="rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-black"
          >
            <option value="">
              All Categories
            </option>

            <option
              v-for="category in productStore.categories"
              :key="category.id"
              :value="category.name"
            >
              {{ category.name }}
            </option>

          </select>

          <input
            v-model="filters.search"
            placeholder="Search products..."
            class="rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3"
          >

          <!-- <div
            class="flex items-center justify-center rounded-xl bg-black text-white"
          >
            {{ filteredProducts.length }}
            Product{{ filteredProducts.length === 1 ? '' : 's' }}
          </div> -->

        </div>

      </div>

      <!-- Loading -->

      <div
        v-if="productStore.loading"
        class="py-32 text-center"
      >

        <div
          class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-black"
        />

        <p class="mt-5 text-zinc-500">
          Loading products...
        </p>

      </div>

      <!-- Products -->

      <div
        v-else-if="filteredProducts.length"
        class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >

        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />

      </div>

      <!-- Empty State -->

      <div
        v-else
        class="py-32 text-center"
      >

        <div class="text-6xl">
          🔍
        </div>

        <h2 class="mt-6 text-3xl font-black">
          No Products Found
        </h2>

        <p class="mt-4 text-zinc-500">
          Try selecting another category or searching for something else.
        </p>

      </div>

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

const filters = reactive({
  category: route.query.category || '',
  search: route.query.search || '',
  vehicle: route.query.vehicle || ''
})

// Keep filters synced with URL
watch(
  () => route.query,
  (query) => {
    filters.category = query.category || ''
    filters.search = query.search || ''
    filters.vehicle = query.vehicle || ''
  },
  { immediate: true }
)

// Get selected vehicle info
const selectedVehicle = computed(() => {
  for (const product of productStore.products) {
    const vehicle = product.compatibleVehicles?.find(
      v => v.id === filters.vehicle
    )

    if (vehicle) return vehicle
  }

  return null
})

// Filter products
const filteredProducts = computed(() => {
  return productStore.activeProducts.filter(product => {

    const matchesCategory =
      !filters.category ||
      product.category === filters.category

    const matchesSearch =
      !filters.search ||
      product.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesVehicle =
      !filters.vehicle ||
      product.compatibleVehicles?.some(
        vehicle => vehicle.id === filters.vehicle
      )

    return (
      matchesCategory &&
      matchesSearch &&
      matchesVehicle
    )
  })
})

// Reload when category changes
watch(
  () => filters.category,
  async () => {
    await productStore.fetchProducts({
      category: filters.category
    })
  }
)

onMounted(async () => {
  await productStore.fetchProducts({
    category: filters.category
  })
})
</script>