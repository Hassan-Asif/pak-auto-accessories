<template>
  <main class="min-h-screen bg-zinc-50 py-16">

    <div class="container-page">

  <!-- ================= HEADER ================= -->

  <div
    class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
  >

    <div class="max-w-3xl">

      <!-- Badge -->
      <span
        class="inline-flex rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:px-4 sm:py-2 sm:text-xs"
      >
        Shop
      </span>

      <!-- Heading -->
      <h1
        class="mt-4 text-3xl font-black leading-tight tracking-tight text-zinc-900 sm:mt-5 sm:text-4xl lg:text-5xl"
      >
        Premium Car Accessories
      </h1>

      <p
        class="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:mt-4 sm:text-base sm:leading-8 lg:text-lg"
      >
        Browse premium automotive accessories, lighting, styling,
        interior, exterior and detailing products.
      </p>

    </div>


    <!-- Product Count -->
    <!-- <div
      v-if="!productStore.loading"
      class="hidden shrink-0 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-600 shadow-sm sm:block"
    >
      {{ filteredProducts.length }}
      {{ filteredProducts.length === 1 ? 'Product' : 'Products' }}
    </div> -->

  </div>


  <!-- ================= VEHICLE BANNER ================= -->

  <div
    v-if="filters.vehicle"
    class="mt-8 overflow-hidden rounded-2xl border border-green-200 bg-green-50 sm:mt-10 sm:rounded-3xl"
  >

    <div
      class="flex items-center gap-3 p-4 sm:gap-4 sm:p-6"
    >

      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl"
      >
        🚗
      </div>

      <div class="min-w-0">

        <p
          class="text-[10px] font-bold uppercase tracking-wider text-green-600 sm:text-xs"
        >
          Vehicle Selected
        </p>

        <h2
          class="mt-0.5 break-words text-sm font-bold text-green-900 sm:text-base"
        >
          {{ selectedVehicle?.displayName }}
        </h2>

        <p
          class="mt-0.5 text-xs text-green-700 sm:text-sm"
        >
          Showing products compatible with your vehicle.
        </p>

      </div>

    </div>

  </div>


  <!-- ================= FILTERS ================= -->

  <div
    class="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:mt-8 sm:rounded-3xl sm:p-5 lg:p-6"
  >

    <div
      class="mb-4 flex items-center justify-between gap-3 sm:mb-5"
    >

      <div>

        <h2 class="text-base font-bold text-zinc-900 sm:text-lg">
          Find Your Product
        </h2>

        <p class="mt-0.5 text-xs text-zinc-500 sm:text-sm">
          Filter the collection to find what you need.
        </p>

      </div>

      <!-- Mobile Count -->
      <span
        v-if="!productStore.loading"
        class="shrink-0 rounded-full bg-zinc-100 px-3 py-1.5 text-[10px] font-bold text-zinc-600 sm:hidden"
      >
        {{ filteredProducts.length }}
      </span>

    </div>


    <div
      class="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr]"
    >

      <!-- Category -->
      <div class="relative">

        <label
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:text-xs"
        >
          Category
        </label>

        <select
          v-model="filters.category"
          class="h-12 w-full appearance-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 pr-10 text-sm text-black outline-none transition focus:border-black focus:bg-white"
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

        <span
          class="pointer-events-none absolute bottom-3.5 right-4 text-zinc-400"
        >
          ▾
        </span>

      </div>


      <!-- Search -->
      <div>

        <label
          class="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:text-xs"
        >
          Search
        </label>

        <div class="relative">

          <input
            v-model="filters.search"
            type="text"
            placeholder="Search products..."
            class="h-12 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 pl-11 text-sm text-black outline-none transition placeholder:text-zinc-400 focus:border-black focus:bg-white"
          />

          <span
            class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          >
            🔍
          </span>

        </div>

      </div>

    </div>

  </div>


  <!-- ================= LOADING ================= -->

  <div
    v-if="productStore.loading"
    class="py-20 text-center sm:py-28"
  >

    <div
      class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black sm:h-12 sm:w-12"
    ></div>

    <p
      class="mt-4 text-sm font-medium text-zinc-500 sm:mt-5"
    >
      Loading products...
    </p>

  </div>


  <!-- ================= PRODUCTS ================= -->

  <div
    v-else-if="filteredProducts.length"
    class="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
  >

    <ProductCard
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    />

  </div>


  <!-- ================= EMPTY STATE ================= -->

  <div
    v-else
    class="mt-8 rounded-2xl border border-zinc-200 bg-white px-5 py-16 text-center shadow-sm sm:mt-10 sm:rounded-3xl sm:px-10 sm:py-24"
  >

    <div
      class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl sm:h-20 sm:w-20 sm:text-3xl"
    >
      🔍
    </div>

    <h2
      class="mt-5 text-2xl font-black text-zinc-900 sm:mt-6 sm:text-3xl"
    >
      No Products Found
    </h2>

    <p
      class="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 sm:mt-4 sm:text-base"
    >
      We couldn't find anything matching your search.
      Try another category or search term.
    </p>

    <button
      type="button"
      class="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
      @click="filters.category = ''; filters.search = ''"
    >
      Clear Filters
    </button>

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