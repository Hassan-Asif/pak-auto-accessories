<template>
  <main class="min-h-screen bg-zinc-50">

    <!-- ========================================================= -->
    <!-- HEADER -->
    <!-- ========================================================= -->

    <section class="container-page py-10 sm:py-14 lg:py-16">

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

    </section>


    <!-- ========================================================= -->
    <!-- VEHICLE SELECTED -->
    <!-- ========================================================= -->

    <section
      v-if="selectedVehicle"
      class="container-page pb-6"
    >

      <div
        class="overflow-hidden rounded-2xl border border-green-200 bg-green-50"
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

    </section>


    <!-- ========================================================= -->
    <!-- FILTER SECTION -->
    <!-- ========================================================= -->

    <section class="container-page pb-10 sm:pb-14">

      <div
        class="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6"
      >

        <!-- Filter Heading -->

        <div
          class="mb-4 flex items-center justify-between gap-3 sm:mb-5"
        >

          <div>

            <h2
              class="text-base font-bold text-zinc-900 sm:text-lg"
            >
              Find Your Product
            </h2>

            <p
              class="mt-0.5 text-xs text-zinc-500 sm:text-sm"
            >
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


        <!-- ===================================================== -->
        <!-- FILTERS -->
        <!-- ===================================================== -->

        <div
          class="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.5fr]"
        >

          <!-- CATEGORY -->

          <div class="relative">

            <label
              class="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:text-xs"
            >
              Category
            </label>

            <select
              v-model="filters.category"
              class="h-12 w-full appearance-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 pr-10 text-sm text-black outline-none transition focus:border-black focus:bg-white"
              @change="handleCategoryChange"
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


          <!-- SUBCATEGORY -->

          <div class="relative">

            <label
              class="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500 sm:text-xs"
            >
              Subcategory
            </label>

            <select
              v-model="filters.subcategory"
              :disabled="!selectedCategoryObject?.subcategories?.length"
              class="h-12 w-full appearance-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 pr-10 text-sm text-black outline-none transition focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >

              <option value="">
                {{
                  selectedCategoryObject?.subcategories?.length
                    ? 'All Subcategories'
                    : 'Select Category First'
                }}
              </option>

              <option
                v-for="subcategory in selectedCategoryObject?.subcategories || []"
                :key="subcategory.id"
                :value="subcategory.name"
              >
                {{ subcategory.name }}
              </option>

            </select>

            <span
              class="pointer-events-none absolute bottom-3.5 right-4 text-zinc-400"
            >
              ▾
            </span>

          </div>


          <!-- SEARCH -->

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


        <!-- ===================================================== -->
        <!-- ACTIVE FILTERS -->
        <!-- ===================================================== -->

        <div
          v-if="
            filters.category ||
            filters.subcategory ||
            filters.search
          "
          class="mt-4 flex flex-wrap items-center gap-2"
        >

          <!-- Category Chip -->

          <span
            v-if="filters.category"
            class="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white"
          >

            {{ filters.category }}

            <button
              type="button"
              class="text-zinc-400 transition hover:text-white"
              @click="clearCategory"
            >
              ×
            </button>

          </span>


          <!-- Subcategory Chip -->

          <span
            v-if="filters.subcategory"
            class="inline-flex items-center gap-2 rounded-full bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-800"
          >

            {{ filters.subcategory }}

            <button
              type="button"
              class="text-zinc-500 transition hover:text-black"
              @click="filters.subcategory = ''"
            >
              ×
            </button>

          </span>


          <!-- Search Chip -->

          <span
            v-if="filters.search"
            class="inline-flex items-center gap-2 rounded-full bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-800"
          >

            "{{ filters.search }}"

            <button
              type="button"
              class="text-zinc-500 transition hover:text-black"
              @click="filters.search = ''"
            >
              ×
            </button>

          </span>


          <!-- Clear -->

          <button
            type="button"
            class="ml-1 text-xs font-semibold text-zinc-500 underline underline-offset-2 transition hover:text-black"
            @click="clearFilters"
          >
            Clear all
          </button>

        </div>

      </div>

    </section>


    <!-- ========================================================= -->
    <!-- PRODUCTS -->
    <!-- ========================================================= -->

    <section class="container-page pb-16 sm:pb-20">

      <!-- Product Count -->

      <div
        v-if="!productStore.loading && filteredProducts.length"
        class="mb-5 hidden items-center justify-between sm:flex"
      >

        <p class="text-sm font-semibold text-zinc-500">

          Showing

          <span class="font-bold text-zinc-900">
            {{ filteredProducts.length }}
          </span>

          {{
            filteredProducts.length === 1
              ? 'product'
              : 'products'
          }}

        </p>

      </div>


      <!-- ===================================================== -->
      <!-- LOADING -->
      <!-- ===================================================== -->

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


      <!-- ===================================================== -->
      <!-- PRODUCT GRID -->
      <!-- ===================================================== -->

      <div
        v-else-if="filteredProducts.length"
        class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      >

        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />

      </div>


      <!-- ===================================================== -->
      <!-- NO PRODUCTS -->
      <!-- ===================================================== -->

      <div
        v-else
        class="py-14 text-center sm:py-20"
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
          We couldn't find anything matching your selected
          filters. Try another category, subcategory or search
          term.
        </p>

        <button
          type="button"
          class="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
          @click="clearFilters"
        >
          Clear Filters
        </button>

      </div>

    </section>

  </main>
</template>


<script setup>
import { computed, onMounted, reactive } from 'vue'
import ProductCard from '../components/products/ProductCard.vue'
import { useProductStore } from '../stores/products'
import { useVehicleStore } from '../stores/vehicles'


/*
|--------------------------------------------------------------------------
| Stores
|--------------------------------------------------------------------------
*/

const productStore = useProductStore()
const vehicleStore = useVehicleStore()


/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

const filters = reactive({
  category: '',
  subcategory: '',
  search: ''
})


/*
|--------------------------------------------------------------------------
| Subcategories
|--------------------------------------------------------------------------
|
| These are the default subcategories.
|
| If your Firebase category document already contains a
| "subcategories" array, that will be used instead.
|
*/

const subcategoryMap = {

  'LED Lights': [
    {
      id: 'headlights',
      name: 'Headlights'
    },
    {
      id: 'fog-lights',
      name: 'Fog Lights'
    },
    {
      id: 'indicators',
      name: 'Indicators'
    },
    {
      id: 'interior-led',
      name: 'Interior LEDs'
    },
    // {
    //   id: 'ambient-lighting',
    //   name: 'Ambient Lighting'
    // }
  ],

  'Exterior Accessories': [
    {
      id: 'top-covers',
      name: 'Top Covers'
    },
    {
      id: 'air-press',
      name: 'Air Press'
    },
    {
      id: 'side-mirrors',
      name: 'Side Mirror Covers'
    },
    // {
    //   id: 'mud-flaps',
    //   name: 'Mud Flaps'
    // },
    // {
    //   id: 'door-visors',
    //   name: 'Door Visors'
    // },
    // {
    //   id: 'number-plates',
    //   name: 'Number Plates'
    // }
  ],

  'Interior Accessories': [
    {
      id: 'dashboard',
      name: 'Dashboard'
    },
    {
      id: 'floor-mats',
      name: 'Floor Mats'
    },
    {
      id: 'sun-shades',
      name: 'Sun Shades'
    },
    {
      id: 'android',
      name: 'Android / Multimedia'
    },
    {
      id: 'steering',
      name: 'Steering Accessories'
    },
    {
      id: 'interior-lighting',
      name: 'Interior Lighting'
    },
    // {
    //   id: 'organizers',
    //   name: 'Organizers'
    // }
  ],

  'Car Care': [
    {
      id: 'car-wash',
      name: 'Car Wash'
    },
    {
      id: 'interior-care',
      name: 'Interior Care'
    },
    {
      id: 'exterior-care',
      name: 'Exterior Care'
    },
    {
      id: 'polish',
      name: 'Polish & Wax'
    },
    {
      id: 'microfiber',
      name: 'Microfiber'
    },
    {
      id: 'tyre-care',
      name: 'Tyre Care'
    },
    {
      id: 'key-cover',
      name: 'Key Cover'
    }
  ],

  'Security & Utility': [
    {
      id: 'car-security',
      name: 'Car Security'
    },
    {
      id: 'dash-cams',
      name: 'Dash Cams'
    },
    {
      id: 'parking-sensors',
      name: 'Parking Sensors'
    },
    {
      id: 'phone-holders',
      name: 'Phone Holders'
    },
    {
      id: 'chargers',
      name: 'Chargers'
    },
    {
      id: 'emergency',
      name: 'Emergency & Utility'
    }
  ]

}


/*
|--------------------------------------------------------------------------
| Selected Category
|--------------------------------------------------------------------------
*/

const selectedCategoryObject = computed(() => {

  if (!filters.category) {
    return null
  }

  const category = productStore.categories.find(
    category => category.name === filters.category
  )

  if (!category) {
    return null
  }

  return {
    ...category,

    subcategories:
      Array.isArray(category.subcategories) &&
      category.subcategories.length
        ? category.subcategories
        : subcategoryMap[category.name] || []
  }

})


/*
|--------------------------------------------------------------------------
| Selected Vehicle
|--------------------------------------------------------------------------
|
| This supports the vehicle selector if your vehicle store keeps
| the selected vehicle there.
|
*/

const selectedVehicle = computed(() => {

  return (
    vehicleStore.selectedVehicle ||
    null
  )

})


/*
|--------------------------------------------------------------------------
| Filtered Products
|--------------------------------------------------------------------------
*/

const filteredProducts = computed(() => {

  const search =
    filters.search
      .trim()
      .toLowerCase()

  return productStore.activeProducts.filter(product => {

    /*
    |--------------------------------------------------------------------------
    | Category
    |--------------------------------------------------------------------------
    */

    const matchesCategory =
      !filters.category ||
      product.category === filters.category


    /*
    |--------------------------------------------------------------------------
    | Subcategory
    |--------------------------------------------------------------------------
    */

    const matchesSubcategory =
      !filters.subcategory ||
      product.subcategory === filters.subcategory


    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const matchesSearch =
      !search ||
      product.name
        ?.toLowerCase()
        .includes(search) ||

      product.description
        ?.toLowerCase()
        .includes(search) ||

      product.category
        ?.toLowerCase()
        .includes(search) ||

      product.subcategory
        ?.toLowerCase()
        .includes(search)


    /*
    |--------------------------------------------------------------------------
    | Vehicle Compatibility
    |--------------------------------------------------------------------------
    |
    | Only filter by vehicle when a vehicle is actually selected.
    |
    */

    const matchesVehicle =
      !selectedVehicle.value ||
      !Array.isArray(product.compatibleVehicles) ||
      product.compatibleVehicles.length === 0 ||
      product.compatibleVehicles.some(
        vehicle =>
          vehicle.id === selectedVehicle.value.id
      )


    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesSearch &&
      matchesVehicle
    )

  })

})


/*
|--------------------------------------------------------------------------
| Category Change
|--------------------------------------------------------------------------
*/

function handleCategoryChange() {

  /*
   * When category changes, the old subcategory
   * must be removed.
   */

  filters.subcategory = ''

}


/*
|--------------------------------------------------------------------------
| Clear Category
|--------------------------------------------------------------------------
*/

function clearCategory() {

  filters.category = ''
  filters.subcategory = ''

}


/*
|--------------------------------------------------------------------------
| Clear Filters
|--------------------------------------------------------------------------
*/

function clearFilters() {

  filters.category = ''
  filters.subcategory = ''
  filters.search = ''

}


/*
|--------------------------------------------------------------------------
| Load Products
|--------------------------------------------------------------------------
*/

onMounted(async () => {

  await productStore.fetchProducts()

})
</script>